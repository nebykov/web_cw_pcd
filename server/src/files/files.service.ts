import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { User } from 'src/users/models/users.model';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './models/files.model';
import { Op } from 'sequelize';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File)
    private fileModel: typeof File,
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}


  async createDir(dto: CreateFileDto, userId: number) {
    const t = await this.sequelize.transaction();
  
    try {
      const user = await this.userModel.findByPk(userId);
  
      if (!user) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
  
      let file: File;
      let parent: File | null = null;
  
      if (dto.parent_id) {
        parent = await this.fileModel.findByPk(dto.parent_id);
  
        if (!parent) {
          throw new HttpException('Parent Not Found', HttpStatus.NOT_FOUND);
        }
      }
  
      file = await this.fileModel.create(
        {
          ...dto,
          user_id: userId,
          type: 'dir',
          path: parent
            ? path.resolve(__dirname, '..', 'static', String(userId), parent.path, dto.name)
            : path.resolve(__dirname, '..', 'static', String(userId), dto.name),
          parent,
          parent_id: dto.parent_id
        },
        { transaction: t },
      );
  
      await this.fsCreateDir(file)
  
      await t.commit();
  
      return file;
    } catch (e) {
      await t.rollback();
      throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async uploadFile(userId: number, parentId: number, file: Express.Multer.File) {
    const t = await this.sequelize.transaction();

    try {
      const user = await this.userModel.findByPk(userId);
      const parent = parentId ? await this.fileModel.findByPk(parentId) : null;

      if (!user || (parentId && !parent)) {
        throw new HttpException('User or Parent Not Found', HttpStatus.NOT_FOUND);
      }

      if (user.used_space + file.size > user.disk_space) {
        console.log(userId)
        throw new HttpException('Storage is full', HttpStatus.BAD_REQUEST);
      }

      user.used_space += file.size;
      await user.save({ transaction: t });

      const filePath = parent
        ? path.resolve(__dirname, '..', 'static', String(user.id), parent.path)
        : path.resolve(__dirname, '..', 'static', String(user.id));

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, file.originalname), file.buffer);

      const type = file.originalname.split('.').pop();

      const dbFile = await this.fileModel.create({
        name: file.originalname,
        type,
        size: file.size,
        parent_id: parentId,
        path: path.resolve(filePath, file.originalname),
        user_id: userId,
      }, { transaction: t });

      await t.commit();

      return dbFile;
    } catch (e) {
      await t.rollback();
      throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async downloadFile(userId: string, fileId: string, res: any) {
    try {
      const file = await this.fileModel.findOne({ where: { user_id: userId, id: fileId } });

      if (!file) {
        throw new HttpException('File Not Found', HttpStatus.NOT_FOUND);
      }

      const filePath = path.resolve(__dirname, '..', 'static', file.path);

      if (fs.existsSync(filePath)) {
        res.download(filePath, file.name);
      } else {
        throw new HttpException('File Not Found on Disk', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(userId: string, fileId: string) {
    const t = await this.sequelize.transaction();

    try {
      const file = await this.fileModel.findOne({ where: { user_id: userId, id: fileId } });

      if (!file) {
        throw new HttpException('File Not Found', HttpStatus.NOT_FOUND);
      }

      const filePath = path.resolve(__dirname, '..', 'static', file.path);

   try {
    if (file.type === 'dir' && filePath) {
      fs.rmdirSync(filePath, { recursive: true });
    } else {
      fs.unlinkSync(filePath);
    }
   } catch(e) {
        console.log("file delete error " + e)
   }

      await file.destroy({ transaction: t });

      await t.commit();

      return file;
    } catch (e) {
      await t.rollback();
      throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getFiles(userId: number, parentId: number, sortBy: string) {
    try {
      const condition: any = { user_id: userId };

      if (parentId) {
        condition.parent_id = parentId;
      } else {
        condition.parent_id = null;
      }

      const order: any = [];
      if (sortBy) {
        switch (sortBy) {
          case 'name':
            order.push(['name', 'ASC']);
            break;
          case 'size':
            order.push(['size', 'ASC']);
            break;
          case 'type':
            order.push(['type', 'ASC']);
            break;
          default:
            // За замовчуванням сортування відсутнє
        }
      }

      const folders = await this.fileModel.findAll({
        where: condition,
        order,
      });

      // if (!folders || folders.length === 0) {
      //   throw new HttpException('Folders not found', HttpStatus.NOT_FOUND);
      // }

      return folders;
    } catch (e) {
      console.log(e)
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchFiles(userId: string, query: string) {
    try {
      const files = await this.fileModel.findAll({
        where: {
          user_id: userId,
          name: {
            [Op.like]: `%${query}%`,
          },
        },
      });

      return files;
    } catch (e) {
      throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async setAvatar(userId: number, avatar: Express.Multer.File) {
    const t = await this.sequelize.transaction();

    try {
      const user = await this.userModel.findByPk(userId);

      if (!user) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }

      const avatarName = uuid.v4() + '.' + avatar.originalname.split('.').pop();
      const avatarPath = path.resolve(__dirname, '..', 'public');

      if (!fs.existsSync(avatarPath)) {
        fs.mkdirSync(avatarPath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(avatarPath, avatarName), avatar.buffer);
      user.avatar = avatarName;

      await user.save({ transaction: t });

      await t.commit();

      return user;
    } catch (e) {
      await t.rollback();
      throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fsCreateDir(file: File) {
    try {
        if (!fs.existsSync(file.path)) {
            await fs.promises.mkdir(file.path, { recursive: true });
            return { message: 'File was created!' }
        } else {
            throw new HttpException(`File already exists`, HttpStatus.BAD_REQUEST)
        }
    } catch (e) {
        throw new HttpException(`${e} file saving error`, HttpStatus.BAD_REQUEST)
    }
}
}

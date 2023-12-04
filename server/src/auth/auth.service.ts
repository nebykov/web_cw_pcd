import { JwtService } from "@nestjs/jwt"
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from 'src/users/users.service';
import { InjectModel } from "@nestjs/sequelize";
import { File } from "src/files/models/files.model";
import { User } from "src/users/models/users.model";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import { FilesService } from "src/files/files.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private fileService: FilesService,
        @InjectModel(File) private fileModel: typeof File,
        @InjectModel(User) private userModel: typeof User
        ) {}

        async registration(dto: CreateUserDto) {
            try {
               const candidate = await this.userModel.findOne({where: {email: dto.email}})
               if (candidate) {
                  throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
               }
               const hashedPassword = await bcrypt.hash(dto.password, 8)
               const user = await this.userService.createUser(dto.email, hashedPassword )
      
               if (user) {
                await this.fileService.createDir({name: "Home"}, user.id)
               }
               const token = await this.generateToken(user)
               return {
                  token,
                  user
               }
            } catch (e) {
               console.log(e)
               throw new HttpException('Registration error', HttpStatus.BAD_REQUEST)
            }
         }

         async login(dto: CreateUserDto) {
            try {
                const user = await this.userModel.findOne({ where: { email: dto.email } });
                if (!user) {
                   throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
                }
                const isValidPassword = await bcrypt.compare(dto.password, user.password)
                if (!isValidPassword) {
                   throw new HttpException('Password is not Valid', HttpStatus.BAD_REQUEST)
                }
          
                const token = await this.generateToken(user)
          
                return {
                   token,
                   user
                }
            }  catch (e) {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
              }
         }


         async auth(userId: number) {
            const user = await this.userService.getById(userId)
            const token = await this.generateToken(user)
      
            return {
               token,
               user
            }
         }

         private generateToken(user: User) {
            const payload = { id: user.id }
            const token = this.jwtService.signAsync(payload)
            return token
         }
}

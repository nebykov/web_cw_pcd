import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
      @InjectModel(User) private userModel: typeof User,
      private roleService: RolesService
      ) {}

    async createUser(email: string, password: string) {
        const user = await this.userModel.create({email, password})
        const role = await this.roleService.getRoleByValue("USER")
        user.$set('roles', [role.id])
        return user
   }

   async getByEmail (email: string): Promise<User> {
         const user = await this.userModel.findOne({where: {email}})
         if (!user) {
           throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
         }
         return user
   }

   async getById (id: number) {
          const user = await this.userModel.findByPk(id)
          if (!user) {
           throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
         }
         return user
   }
}

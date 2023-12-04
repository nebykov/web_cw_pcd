import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule
  ],
  exports: [UsersService, SequelizeModule]
})
export class UsersModule {}

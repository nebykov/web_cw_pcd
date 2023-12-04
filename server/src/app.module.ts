import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/users.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { File } from './files/models/files.model';
import { RolesModule } from './roles/roles.module';
import * as path from 'path'
import { Role } from './roles/models/roles.model';
import { UserRoles } from './roles/models/user-roles.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'cyberDodik2077',
      database: 'prince_cloud_db',
      models: [User, File, Role, UserRoles],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'public'),

    }),
    UsersModule,
    AuthModule,
    FilesModule,
    RolesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module, forwardRef } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './models/files.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
    SequelizeModule.forFeature([File]),
    UsersModule,
    forwardRef(() => AuthModule)
  ],
  exports: [FilesService, SequelizeModule]
})
export class FilesModule {}

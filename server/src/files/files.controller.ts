import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('files')
export class FilesController {
    constructor(private fileService: FilesService) {}

    @UseGuards(AuthGuard)
    @Post('avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    setAvatar(@Req() req, @UploadedFile() avatar: Express.Multer.File) {
         return this.fileService.setAvatar(req.user.id, avatar)
    }

    @UseGuards(AuthGuard)
    @Post('create')
    createDir(@Body() dto: CreateFileDto, @Req() req) {
        return this.fileService.createDir(dto, req.user.id)
    }

    @UseGuards(AuthGuard)
    @Get('search')
    searchFiles(@Req() req, @Query('query') query: string) {
        return this.fileService.searchFiles(req.user.id, query)
    }

    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@Req() req, @Body('parent_id') parentId, @UploadedFile() file: Express.Multer.File) {
        return this.fileService.uploadFile(req.user.id, parentId, file)
    }

    @UseGuards(AuthGuard)
    @Get('download/:fileId')
    dowloadFiles(@Param('fileId') fileId: string, @Req() req: any, @Res() res: any) {
             return this.fileService.downloadFile(req.user.id, fileId, res)
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:fileId')
    deleteFile(@Param('fileId') fileId: string, @Req() req: any) {
        return this.fileService.deleteFile(req.user.id, fileId)
    }

    @UseGuards(AuthGuard)
    @Get()
    getFiles(@Req() req, @Query('parent') parent: number, @Query('sort') sortBy: string) {
        try {
            return this.fileService.getFiles(req.user.id, parent, sortBy)
        } catch (e) {
            throw new HttpException('Token error', HttpStatus.BAD_REQUEST)
        }
    }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ShareService } from './share.service';
import { CreateShareDto } from './dto/create-share.dto';
import { AuthGuard } from 'src/auth/auth.gard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateShareDto) {
    return this.shareService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.shareService.findAll(id);
  }

  // @UseGuards(AuthGuard)
  @Post('/upload/:id')
  @UseInterceptors(
    FileInterceptor('sharePhoto', {
      storage: diskStorage({
        destination: './api/uploads/share',
        filename: (
          _,
          file: Express.Multer.File,
          callback: (error: Error, filename: string) => void,
        ) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException(
              'Only JPG, JPEG, and PNG files are allowed',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }
}

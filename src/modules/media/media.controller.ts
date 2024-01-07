import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  ServiceUnavailableException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { StorageFile } from 'src/modules/storage/storage-file';
import { StorageService } from 'src/modules/storage/storage.service';

@Controller('media')
export class MediaController {
  constructor(private storageService: StorageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body('mediaId') mediaId: string,
  ) {

    const objetcID = await this.storageService.save(
      "media/" + file.originalname,
      "image/jpeg",
      file.buffer,
      [{ mediaId: mediaId }],
    );
    console.log(objetcID)
  }

  @Get('/:mediaId')
  async downloadMedia(@Param('mediaId') mediaId: string, @Res() res: Response) {
    let storageFile: StorageFile;
    try {
      storageFile = await this.storageService.get('media/' + mediaId);
    } catch (e) {
      if (e.message.toString().includes('No such object')) {
        throw new NotFoundException('image not found');
      } else {
        throw new ServiceUnavailableException('internal error');
      }
    }
    res.setHeader('Content-Type', storageFile.contentType);
    res.setHeader('Cache-Control', 'max-age=60d');
    res.end(storageFile.buffer);
  }
}


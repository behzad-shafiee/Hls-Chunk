import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { join } from 'path';
import { TestService } from './test.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../multer/multerOption';

@ApiTags('test')
@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    return await this.testService.uploadFile(file);
  }

  @Get('showFilm')
  async getFileCustomizedResponse(@Res() res) {
    const pathFile = join(process.cwd(), '/client/index.html');
    return res.sendFile(pathFile);
  }
  // @Response({ passthrough: true }) res
  @Get('VideoToStream')
  csvStream(@Req() req: Request, @Res() res: Response) {
    console.log('befor  return this.testService.csvStream();');
    this.testService.csvStream();
    res.send('finish');

    console.log('after  return this.testService.csvStream();');
    return;
  }
}

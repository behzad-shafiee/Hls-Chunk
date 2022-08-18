import { Controller, Get, Req, Res } from '@nestjs/common';
import { join } from 'path';
import { TestService } from './test.service';
import { ApiTags } from '@nestjs/swagger';
import {} from 'express';
import { Request, Response } from 'express';

@ApiTags('test')
@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('file')
  async getFileCustomizedResponse(@Res() res) {
    const pathFile = join(process.cwd(), '/output/client.html');
    return res.sendFile(pathFile);
  }
  // @Response({ passthrough: true }) res
  @Get('fileStr')
  csvStream(@Req() req: Request, @Res() res: Response) {
    console.log('befor  return this.testService.csvStream();');
    this.testService.csvStream();
    res.send('finish');

    console.log('after  return this.testService.csvStream();');
    return;
  }
}

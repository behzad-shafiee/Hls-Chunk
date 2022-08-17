import { Controller, Get, Req, Res, StreamableFile } from '@nestjs/common';
import { join } from 'path';
import { TestService } from './test.service';
// import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import {} from 'express';


@ApiTags('test')
@Controller()
export class TestController {
  constructor(
   
    private readonly testService: TestService,
  ) {}

  @Get('file')
  async getFileCustomizedResponse(@Res() res) {
    const pathFile = join(process.cwd(), '/output/client.html');
    return res.sendFile(pathFile);
  }
  // @Response({ passthrough: true }) res
  @Get('file/str')
  csvStream(@Req() req, @Res() res): any {
    return this.testService.csvStream();
    // res.set({
    //   'Content-Type': 'text/plain',
    // });
    // const file = join(process.cwd(), 'src/test/video.mp4');
    // const readStream = fs.createReadStream(file);
    // readStream.on('data', (chunk) => console.log(chunk.length));
    // readStream.on('end', () => console.log('done'));
    // readStream.on('error', (err) => {
    //   console.error(err);
    // });
    // return new StreamableFile(readStream, { type: 'buffer' });
  }
}

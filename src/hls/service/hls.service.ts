import { Ffmpeg, InjectFluentFfmpeg } from '@mrkwskiti/fluent-ffmpeg-nestjs';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { join } from 'path';
const ffmprobeInstaller = require('@ffprobe-installer/ffprobe');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
@Injectable()
export class TestService {
  constructor(@InjectFluentFfmpeg() private readonly ffmpeg: Ffmpeg) {}
  logger = new Logger();
  async hlsFunc() {
    try {
      console.log('befor hls');
      const pathFile = join(process.cwd(), '/master/video.mp4');
      console.log(`pathFile===>${pathFile}`);
      this.ffmpeg.setFfmpegPath(ffmpegInstaller.path);
      this.ffmpeg()
        .input(pathFile)
        .addOptions([
          '-profile:v baseline',
          '-level 3.0',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output('output.m3u8')
        .on('error', (err, suberr, superr) => {
          console.log(`err===>${err}`);
          console.log(`suberr===>${suberr}`);
          console.log(`superr===>${superr}`);
          return;
        })
        .on('end', () => {
          console.log('end');
        })
        .run();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async csvStream() {
    try {
      const pathFile = join(process.cwd(), 'master/1661068929453WhatsApp Video 2022-08-21 at 12.18.56.mp4');
      console.log(`pathFile===>${pathFile}`);
      this.ffmpeg.setFfmpegPath(ffmpegInstaller.path);
      this.ffmpeg()
        .input(pathFile)
        .addOptions([
          '-profile:v baseline',
          '-level 3.0',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output(join(process.cwd(), '/master/output.m3u8'))
        .on('error', (err, suberr, superr) => {
          console.log(`err===>${err}`);
          console.log(`suberr===>${suberr}`);
          console.log(`superr===>${superr}`);
          return;
        })
        .on('end', () => {
          console.log('end');
        })
        .run();
      console.log('after calling  this.hlsFunc();');
      return 'end';
    } catch (e) {
      console.log(`e===>${e}`);
      return e;
    }
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      console.log(file);

      if (!file) {
        throw new BadRequestException();
      }

      return 'uploaded';
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Cron('30 * * * * *')
  handleCron() {
    this.logger.debug('this CronJob deleted upload file after 30 s');
  }
}

import { Ffmpeg, InjectFluentFfmpeg } from '@mrkwskiti/fluent-ffmpeg-nestjs';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
const ffmprobeInstaller = require('@ffprobe-installer/ffprobe');

// const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
// import ffmpeg from 'fluent-ffmpeg';
const hls = require('hls-server');
const fs = require('fs');

@Injectable()
export class TestService {
  constructor(@InjectFluentFfmpeg() private readonly ffmpeg: Ffmpeg) {}

  async csvStream() {
    try {
      console.log('befor calling  this.hlsFunc();');

      await this.hlsFunc();
      console.log('after calling  this.hlsFunc();');
      return 'end';
    } catch (e) {
      console.log(`e===>${e}`);
    }

    return 'finish';
  }

  async hlsFunc() {
    console.log('befor hls');
    var pathFile = join(process.cwd(), '/src/test/videos/video.mp4');
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
      .output('fileoutput.m3u8')
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
    console.log(join(__dirname + 'output.m3u8'));
    console.log('after hls');

    console.log(`process.cwd()===>${process.cwd()}`);

    // const pathFile = join(__dirname, '../../../src/test/client.html');
  }
}

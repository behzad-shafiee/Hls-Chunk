// const ffmpeg = require("fluent-ffmpeg");
// const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
// const path = require('path');
// // import ffmpeg from 'fluent-ffmpeg';
// ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// const fs=require('fs')
// var stream  = fs.createWriteStream('outputfile.divx');
// const pathFile = path.join(__dirname, '/videos/video.mp4');
// console.log(pathFile);
// // const obj={}
// export class Hls {
//   constructor() {}

//    async  hlsFunc() {
//     const pathFile = path.join(__dirname, '/videos/video.mp4');
//     console.log(pathFile);
//     ffmpeg()
//       .input(pathFile)

//       .addOptions([
//         '-profile:v baseline',
//         '-level 3.0',
//         '-start_number 0',
//         '-hls_time 10',
//         '-hls_list_size 0',
//         '-f hls',
//       ]) 
//       // .output('outputfile.mp4')
//       // .output(stream)
//       .output(__dirname + '/output.m3u8')
//       .on('error', (err, suberr, superr) => {
//         console.log(err);
//         console.log(suberr);
//         console.log(superr);
//         return 
//       })
//       .on('end', () => {
//         console.log('end');
//       })
//       .run();
//   }
// }
// const hls = new Hls();
// hls.hlsFunc();
// obj.hlsFunc=hlsFunc;

// module.exports=obj;
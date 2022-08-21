const hls = require('hls-server');
const fs = require('fs');
import { join } from 'path';

export async function sendDataStreamly(server) {
  try {
    new hls(server, {
      provider: {
        exists: (req, cb) => {
          const ext = req.url.split('.').pop();

          if (ext !== 'm3u8' && ext !== 'ts') {
            return cb(null, true);
          }
          const pathFile = join(process.cwd(), '/master');
          console.log(`pathFile1 ===>${pathFile}`);

          fs.access(pathFile, fs.constants.F_OK, function (err) {
            if (err) {
              console.log(`pathFile2====>${pathFile}`);
              console.log(`err===>${err}`);
              console.log('File not exist');
              return cb(null, false);
            }
            cb(null, true);
          });
        },
        getManifestStream: (req, cb) => {
          console.log('in getManifestStream');
          const pathFile = join(process.cwd(), req.url);
          const stream = fs.createReadStream(pathFile);
          cb(null, stream);
        },
        getSegmentStream: async (req, cb) => {
          try {
            console.log('in getSegmentStream');
            const pathFile = join(process.cwd(), req.url);
            const stream = fs.createReadStream(pathFile);
            cb(null, stream);
          } catch (e) {
            console.log(e);
          }
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
}

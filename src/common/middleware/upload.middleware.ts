import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
const fs = require('fs');
const busboy = require('busboy');

@Injectable()
export class UplaodChunkMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log(`req.busboy===>${req.busboy}`);

    if (req.busboy) {
      console.log(req.headers);
      const bb = busboy({ headers: req.headers });
      console.log(bb);

      console.log(11);

      req.busboy.on('file', (name, file, info) => {
        console.log(22);
        console.log(`name===>${name}`);
        console.log(`file===>${JSON.stringify(file)}`);
        console.log(`info===>${JSON.stringify(info)}`);

        const { filename, encoding, mimeType } = info;
        console.log(
          `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
          filename,
          encoding,
          mimeType,
        );
        file
          .on('data', (data) => {
            console.log(`File [${name}] got ${data.length} bytes`);
          })
          .on('close', () => {
            console.log(`File [${name}] done`);
          });
      });
      req.busboy.on('field', (name, val, info) => {
        console.log(33);
        console.log(`Field [${name}]: value: %j`, val);
      });
      req.busboy.on('close', () => {
        console.log(44);
        console.log('Done parsing form!');
        // res.writeHead(303, { Connection: 'close', Location: '/' });
        // res.end();
      });
      next();
      console.log(55);
    }
  }
}

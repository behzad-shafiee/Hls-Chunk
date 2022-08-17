import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
const hls = require('hls-server');
const fs = require('fs');

async function bootstrap() {
  const express = require('express');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const port = 4000;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const server: any = await app.listen(port, () => {
    Logger.log(`server is run on port:${port}`);
  });
  new hls(server, {
    provider: {
      exists: (req, cb) => {
        const ext = req.url.split('.').pop();

        if (ext !== 'm3u8' && ext !== 'ts') {
          return cb(null, true);
        }
        const pathFile = join(process.cwd(), 'dist/test/fileoutput.m3u8');
     

        fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
          if (err) {
            console.log(__dirname + req.url);
            console.log(`err===>${err}`);
            console.log('File not exist');
            return cb(null, false);
          }
          cb(null, true);
        });
      },
      getManifestStream: (req, cb) => {
        const stream = fs.createReadStream(__dirname + req.url);
        cb(null, stream);
      },
      getSegmentStream: (req, cb) => {
        const stream = fs.createReadStream(__dirname + req.url);
        cb(null, stream);
      },
    },
  });
}
bootstrap();

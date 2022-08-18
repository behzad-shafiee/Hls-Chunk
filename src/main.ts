import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
const hls = require('hls-server');
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const port = 4000;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const server = await app.listen(port, () => {
    Logger.log(`server is run on port:${port}`);
  });
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
        const pathFile = join(process.cwd(), '/master/output.m3u8');
        console.log(pathFile);

        const stream = fs.createReadStream(pathFile);
        cb(null, stream);
      },
      getSegmentStream: (req, cb) => {
        console.log('in getSegmentStream');
        // const pathFile = join(process.cwd(), '/master/output.m3u8');
        const pathFile = join(process.cwd(), req.url);

        console.log(req.url);

        console.log(pathFile);

        const stream = fs.createReadStream(pathFile);
        cb(null, stream);
      },
    },
  });
}
bootstrap();

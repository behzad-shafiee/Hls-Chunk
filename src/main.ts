import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { sendDataStreamly } from './common/function/general.tools';
import { AppModule } from './app.module';
const busboy = require('connect-busboy');
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    busboy({
      immediate: true,
      highWaterMark: 2 * 1024 * 1024,
      limits: {
        fileSize:  1* 1024 * 1024,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const port = 4000;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const server = await app.listen(port, () => {
    Logger.log(`server is run on port:${port}`);
  });
  sendDataStreamly(server);
}
bootstrap();

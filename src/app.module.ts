import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UplaodChunkMiddleware } from './common/middleware/upload.middleware';
import { TestModule } from './hls/hls.module';

@Module({
  imports: [TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UplaodChunkMiddleware).forRoutes('file/upload');
  }
}

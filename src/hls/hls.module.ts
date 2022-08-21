import { Module } from '@nestjs/common';
import { TestService } from './service/hls.service';
import { TestController } from './controller/hls.controller';
import { FluentFfmpegModule } from '@mrkwskiti/fluent-ffmpeg-nestjs';

@Module({
  imports: [FluentFfmpegModule.forRoot()],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}

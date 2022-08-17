import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { FluentFfmpegModule } from '@mrkwskiti/fluent-ffmpeg-nestjs';

@Module({
  imports: [FluentFfmpegModule.forRoot()],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}

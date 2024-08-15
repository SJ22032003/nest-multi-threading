import { Module } from '@nestjs/common';
import { ImgProcessingController } from './imgp.controller';
import { ImgProcessingService } from './imgp.service';

@Module({
  controllers: [ImgProcessingController],
  providers: [ImgProcessingService],
})
export class ImgProcessingModule {}

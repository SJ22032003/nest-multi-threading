import { Module } from '@nestjs/common';
import { ImgProcessingController } from './controller/imgp.controller';
import { ImgProcessingService } from './service/imgp.service';
import { ImgProcessingHelper } from './helper/imgp.helper';

@Module({
  controllers: [ImgProcessingController],
  providers: [ImgProcessingService, ImgProcessingHelper],
})
export class ImgProcessingModule {}

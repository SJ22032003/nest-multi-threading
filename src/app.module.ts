import { Module } from '@nestjs/common';
import { ImgProcessingModule } from './image_processing/imgp.module';

@Module({
  imports: [ImgProcessingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

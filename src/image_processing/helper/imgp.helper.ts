import { Injectable } from '@nestjs/common';
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImgProcessingHelper {
  chunkifyImagesBasedOnCors(
    images: Express.Multer.File[],
    cors: number,
  ): Express.Multer.File[][] {
    const totalImages = images.length;
    const imagesPerCors = Math.ceil(totalImages / cors);

    const chunkedImages = [];
    for (let i = 0; i < totalImages; i += imagesPerCors) {
      chunkedImages.push(images.slice(i, i + imagesPerCors));
    }

    return chunkedImages;
  }

  saveImagesBufferToDisk(image: Buffer, fileExt: 'png' | 'jpeg') {
    // Save image buffer to disk
    const destination = join(__dirname, '..', '..', 'images');
    if (!existsSync(destination)) {
      mkdirSync(destination);
    }
    const fileName = `image-${Date.now()}.${fileExt}`;
    writeFileSync(join(destination, fileName), image);
  }
}

import { parentPort } from 'worker_threads';
import * as sharp from 'sharp';
import { IImageChunk } from '../interface/imgp.interface';

parentPort?.on('message', async ({ images, options }: IImageChunk) => {
  try {
    console.log('Received images for processing');

    const processedImages = await Promise.all(
      images.map(async (image) => {
        console.log('Processing image:', image.originalname);
        const { buffer } = image;
        const { width, height, 'blur-level': blur, format } = options;
        const mySharp: sharp.Sharp = sharp(buffer);

        if (width && height) {
          mySharp.resize(parseInt(width), parseInt(height));
        }

        if (format) {
          mySharp.toFormat(format);
        }

        if (blur) {
          mySharp.blur(parseInt(blur));
        }

        return await mySharp.toBuffer();
      }),
    );

    parentPort?.postMessage(processedImages);
  } catch (error) {
    console.error('Error processing images:', error);
    parentPort?.postMessage({ error: error.message });
  }
});

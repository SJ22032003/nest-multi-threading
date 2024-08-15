import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Render,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImgProcessingService } from '../service/imgp.service';
import { cpus } from 'os';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesAreImagesPipe } from '../pipe/uploadFile.pipe';
import { IDataToReturn, IImgProcessingData } from '../interface/imgp.interface';
import { ImgProcessingHelper } from '../helper/imgp.helper';
import { isMainThread, Worker } from 'worker_threads';
import { join } from 'path';
import { EventEmitter } from 'events';

@Controller('')
export class ImgProcessingController {
  constructor(
    private readonly imgPService: ImgProcessingService,
    private readonly helper: ImgProcessingHelper,
  ) {}

  @Get()
  @Render('index')
  async mainLandingPage() {
    const total_available_cors = cpus().length;
    return { total_available_cors };
  }

  @Post('process')
  @UseInterceptors(FilesInterceptor('images'))
  async processImage(
    @UploadedFiles(FilesAreImagesPipe)
    images: Express.Multer.File[],
    @Body() processingData: IImgProcessingData,
  ) {
    if (!images || images.length === 0) {
      console.log('No images found');
      return new HttpException('no images found', HttpStatus.BAD_REQUEST);
    }

    const { 'cors-level': corsLevel } = processingData;

    const chunkedImages = this.helper.chunkifyImagesBasedOnCors(
      images,
      parseInt(corsLevel),
    );

    const dataToReturn: IDataToReturn = {
      time_taken: 0,
      cors_used: Number(corsLevel),
    };

    let completedWorkers = 0;
    const tick = performance.now();

    if (!isMainThread)
      return new HttpException(
        'this is not the main thread',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const eventEmitter = new EventEmitter();

    chunkedImages.forEach((chunk) => {
      const worker = new Worker(join(__dirname, '../worker/w.js'));
      worker.postMessage({ images: chunk, options: processingData });
      worker.on('message', (processedImage: Buffer[]) => {
        completedWorkers++;

        processedImage.forEach((image) => {
          this.helper.saveImagesBufferToDisk(image, processingData.format);
        });

        if (completedWorkers === chunkedImages.length) {
          dataToReturn.time_taken = performance.now() - tick;
          eventEmitter.emit('done');
        }
      });
      worker.on('error', (err) => {
        eventEmitter.emit('error', err);
      });
    });

    return new Promise((resolve, reject) => {
      eventEmitter.on('done', () => {
        resolve(dataToReturn);
      });
      eventEmitter.on('error', (err) => {
        reject(
          new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR),
        );
      });
    });
  }
}

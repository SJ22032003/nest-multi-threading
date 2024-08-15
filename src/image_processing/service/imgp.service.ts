import { Injectable } from '@nestjs/common';

@Injectable()
export class ImgProcessingService {
  getHello(): string {
    return 'Hello World!';
  }
}

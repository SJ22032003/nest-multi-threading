import { Controller, Get, Render } from '@nestjs/common';
import { ImgProcessingService } from './imgp.service';
import { cpus } from 'os';

@Controller('')
export class ImgProcessingController {
  constructor(private readonly imgPService: ImgProcessingService) {}

  @Get()
  @Render('index')
  async mainLandingPage() {
    const total_available_cors = cpus().length;
    return { total_available_cors };
  }
}

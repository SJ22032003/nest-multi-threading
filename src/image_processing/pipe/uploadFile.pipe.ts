import { PipeTransform, Injectable } from '@nestjs/common';

// pipe to ensure that the files are an image
@Injectable()
export class FilesAreImagesPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return null;
    }

    const files = value;
    if (!files) {
      return null;
    }

    const isImage = files.every((file: Express.Multer.File) => {
      return file.mimetype.startsWith('image');
    });

    if (!isImage) {
      return null;
    }

    return value;
  }
}

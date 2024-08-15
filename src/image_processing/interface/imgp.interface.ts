export interface IImgProcessingData {
  'cors-level': string;
  'blur-level': string;
  width: string | null;
  height: string | null;
  format: 'png' | 'jpeg';
}

export interface IDataToReturn {
  time_taken: number;
  cors_used: number;
}

export interface IImageChunk extends IImgProcessingData {
  images: Express.Multer.File[];
  options: IImgProcessingData;
}

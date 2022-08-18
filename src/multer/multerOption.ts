import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeDropBoxFileEnum } from './type.file.enum';

// Multer configuration

const dest = join(process.cwd(), '/upload');
export const multerConfig = {
  dest,
};

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: 100000000000,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    console.log(file);
    
    const mimetypes = file.mimetype.split('/')[1];
    console.log(mimetypes);
    const checkType = Object.values(TypeDropBoxFileEnum).find((type) => {
      return type == mimetypes;
    });
    console.log(checkType);
    
    if (!checkType) {
      console.log(0);
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
      return;
    }
    console.log(1);
    
    return cb(null, true);
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = `${multerConfig.dest}`;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      const uniqStr = Date.now();
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uniqStr}${file.originalname}`);
    },
  }),
};

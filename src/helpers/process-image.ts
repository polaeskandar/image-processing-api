import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

import { IMAGES_PATH } from '../constants';
import { getProcessedFileDir, getProcessedFilePath } from './file-name';

export const processImage = async (filename: string, width: number, height: number): Promise<void> => {
  const filepath: string = path.join(IMAGES_PATH, filename);
  const processedFileDir: string = getProcessedFileDir(filename);
  const processedFilePath: string = getProcessedFilePath(filename, width, height);

  if (!fs.existsSync(processedFileDir)) fs.mkdirSync(processedFileDir);

  await sharp(filepath)
    .resize(+width, +height)
    .toFile(processedFilePath);
};

import path from 'path';

import { PROCESSED_IMAGES_PATH } from '../constants';

export const getFilenameWithoutExtension = (filename: string): string => {
  const filenameArray: string[] = filename.split('.');
  const filenameWithoutExtension: string = filenameArray[0];
  return filenameWithoutExtension;
};

export const getFileExtension = (filename: string): string => {
  const filenameArray: string[] = filename.split('.');
  return filenameArray[filenameArray.length - 1];
};

export const getProcessedFileDir = (filename: string): string => {
  return path.join(PROCESSED_IMAGES_PATH, getFilenameWithoutExtension(filename));
};

export const getProcessedFilePath = (filename: string, width: number, height: number): string => {
  return path.join(getProcessedFileDir(filename), `${getFilenameWithoutExtension(filename)}-${width}x${height}.${getFileExtension(filename)}`);
};

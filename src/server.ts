// Packages
import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import dotenv from 'dotenv';

// Project files
import filenameMiddleware from './middlewares/filenameMiddleware';
import dimensionsMiddleware from './middlewares/dimensionsMiddleware';

// Init ENV file
dotenv.config();

// Init server
const server: Application = express();
const ENV_PORT: number = process.env.PORT as unknown as number;
const PORT: number = ENV_PORT ?? 5000;

// Init images' paths
const ENV_IMAGES_ROOT: string = process.env.IMAGES_ROOT as string;
const IMAGES_PATH: string = path.join(__dirname, ENV_IMAGES_ROOT ?? './images');
const ENV_PROCESSED_IMAGES_ROOT: string = process.env.PROCESSED_IMAGES_ROOT as string;
const PROCESSED_IMAGES_PATH: string = path.join(__dirname, ENV_PROCESSED_IMAGES_ROOT ?? './processed_images');

// Check for processed images directory
if (!fs.existsSync(PROCESSED_IMAGES_PATH)) fs.mkdirSync(PROCESSED_IMAGES_PATH);

server.get('/', filenameMiddleware, dimensionsMiddleware, async (req: Request, res: Response): Promise<void> => {
  const filename: string = req.query.filename as string;
  const filenameArray: string[] = filename.split('.');
  const filenameWithoutExtension: string = filenameArray[0];
  const filenameExtension: string = filenameArray[filenameArray.length - 1];

  const width: string = req.query.width as string;
  const height: string = req.query.height as string;

  const processedFileDir: string = path.join(PROCESSED_IMAGES_PATH, filenameWithoutExtension);
  const processedFilePath: string = path.join(processedFileDir, `${filenameWithoutExtension}-${width}x${height}.${filenameExtension}`);

  if (fs.existsSync(processedFileDir) && fs.existsSync(processedFilePath)) {
    res.status(200).sendFile(processedFilePath);
    return;
  }

  const filepath: string = path.join(IMAGES_PATH, filename);
  if (!fs.existsSync(processedFileDir)) fs.mkdirSync(processedFileDir);
  await sharp(filepath).resize(parseInt(width), parseInt(height)).toFile(processedFilePath);
  res.status(201).sendFile(processedFilePath);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;

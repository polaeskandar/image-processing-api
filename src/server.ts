// Packages
import express, { Application, Request, Response } from 'express';
import fs from 'fs';
import dotenv from 'dotenv';

// Project files
import filenameMiddleware from './middlewares/filenameMiddleware';
import dimensionsMiddleware from './middlewares/dimensionsMiddleware';
import { PORT } from './constants';
import { processImage } from './helpers/process-image';
import { getProcessedFileDir, getProcessedFilePath } from './helpers/file-name';

// Init ENV file
dotenv.config();

// Init server
const server: Application = express();

server.get('/', filenameMiddleware, dimensionsMiddleware, async (req: Request, res: Response): Promise<void> => {
  const filename: string = req.query.filename as string;
  const width: number = req.query.width as unknown as number;
  const height: number = req.query.height as unknown as number;
  const processedFileDir: string = getProcessedFileDir(filename);
  const processedFilePath: string = getProcessedFilePath(filename, width, height);

  if (!fs.existsSync(processedFileDir) || !fs.existsSync(processedFilePath)) {
    await processImage(filename, width, height);
  }

  res.status(201).sendFile(processedFilePath);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;

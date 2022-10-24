import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const filenameMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const filename: string = req.query.filename as string;

  if (typeof filename === 'undefined' || !filename.includes('.')) {
    res.status(400).send('Please provide a valid filename.');
    return;
  }

  const ENV_IMAGES_ROOT: string = process.env.IMAGES_ROOT as string;
  const IMAGES_PATH: string = path.join(__dirname, '..', ENV_IMAGES_ROOT ?? './images');
  const filepath: string = path.join(IMAGES_PATH, filename);

  if (!fs.existsSync(filepath)) {
    res.status(400).send("This file does't exist on the server.");
    return;
  }

  next();
};

export default filenameMiddleware;

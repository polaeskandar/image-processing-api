import { NextFunction, Request, Response } from 'express';

const dimensionsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const width: string = req.query.width as string;
  const height: string = req.query.height as string;

  if (typeof width === 'undefined' || typeof height === 'undefined') {
    res.status(400).send('Please provide proper dimensions');
    return;
  }

  if (isNaN(+width) || isNaN(+height)) {
    res.status(400).send('Please provide proper dimensions');
    return;
  }

  if (parseInt(width) > 3000 || parseInt(width) < 10) {
    res.status(400).send('Please provide a width dimension between 10 and 3000');
    return;
  }

  if (parseInt(height) > 3000 || parseInt(height) < 10) {
    res.status(400).send('Please provide a height dimension between 10 and 3000');
    return;
  }

  next();
};

export default dimensionsMiddleware;

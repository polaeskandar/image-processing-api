import { NextFunction, Request, Response } from "express";

const dimensionsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const width = req.query.width as string;
  const height = req.query.height as string;

  if (width && height) next();
  else res.status(400).send("Please provide proper dimensions");
};

export default dimensionsMiddleware;

import { Application, Request, Response } from "express";
const express = require("express");
const server: Application = express();
const path = require("path");
const dotenv = require("dotenv");

import ImageController from "./Controllers/ImageController";
import { validateFileName } from "./helpers";
import dimensionsMiddleware from "./dimensionsMiddleware";

dotenv.config();
const PORT: number = (process.env.PORT as unknown as number) || 5000;
const IMAGES_PATH: string = path.join(__dirname, process.env.IMAGES_ROOT);
const PROCESSED_IMAGES_PATH = path.join(__dirname, process.env.PROCESSED_IMAGES_ROOT);

server.get("/", dimensionsMiddleware, async (req: Request, res: Response) => {
  const filename: string = req.query.filename as unknown as string;

  if (!validateFileName(filename)) {
    res.status(400).send("Please provide a vaild file name");
    return;
  }

  const processedFilepath = path.join(PROCESSED_IMAGES_PATH, `${filename}`);

  if (ImageController.checkExistence(processedFilepath)) {
    res.sendFile(processedFilepath);
    return;
  }

  const filePath = path.join(IMAGES_PATH, filename);
  await ImageController.processImage(req, filePath, processedFilepath);
  res.sendFile(processedFilepath);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;

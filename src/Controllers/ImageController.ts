import { Request } from "express";
const fs = require("fs");
const sharp = require("sharp");

export default class ImageController {
  public static checkExistence(path: string): boolean {
    return fs.existsSync(path);
  }

  public static async processImage(req: Request, path: string, output: string) {
    const width = req.query.width as string;
    const height = req.query.height as string;
    await sharp(path).resize(parseInt(width), parseInt(height)).toFile(output);
  }
}

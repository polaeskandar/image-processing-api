"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server = express();
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const ImageController_1 = __importDefault(require("./Controllers/ImageController"));
const helpers_1 = require("./helpers");
const dimensionsMiddleware_1 = __importDefault(require("./dimensionsMiddleware"));
dotenv.config();
const PORT = process.env.PORT || 5000;
const IMAGES_PATH = path.join(__dirname, process.env.IMAGES_ROOT);
const PROCESSED_IMAGES_PATH = path.join(__dirname, process.env.PROCESSED_IMAGES_ROOT);
// TODO: Add middleware to check for width or height
// TODO: Add prettier and lint scripts
server.get("/", dimensionsMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    if (!(0, helpers_1.validateFileName)(filename)) {
        res.status(400).send("Please provide a vaild file name");
        return;
    }
    const processedFilepath = path.join(PROCESSED_IMAGES_PATH, `${filename}`);
    if (ImageController_1.default.checkExistence(processedFilepath)) {
        console.log("found");
        res.sendFile(processedFilepath);
        return;
    }
    console.log("processing");
    const filePath = path.join(IMAGES_PATH, filename);
    yield ImageController_1.default.processImage(req, filePath, processedFilepath);
    res.sendFile(processedFilepath);
}));
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = server;

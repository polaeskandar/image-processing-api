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
// Packages
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
// Project files
const filenameMiddleware_1 = __importDefault(require("./middlewares/filenameMiddleware"));
const dimensionsMiddleware_1 = __importDefault(require("./middlewares/dimensionsMiddleware"));
const constants_1 = require("./constants");
const process_image_1 = require("./helpers/process-image");
const file_name_1 = require("./helpers/file-name");
// Init ENV file
dotenv_1.default.config();
// Init server
const server = (0, express_1.default)();
server.get('/', filenameMiddleware_1.default, dimensionsMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    const processedFileDir = (0, file_name_1.getProcessedFileDir)(filename);
    const processedFilePath = (0, file_name_1.getProcessedFilePath)(filename, width, height);
    if (!fs_1.default.existsSync(processedFileDir) || !fs_1.default.existsSync(processedFilePath)) {
        yield (0, process_image_1.processImage)(filename, width, height);
    }
    res.status(201).sendFile(processedFilePath);
}));
server.listen(constants_1.PORT, () => {
    console.log(`Server is running on port ${constants_1.PORT}`);
});
exports.default = server;

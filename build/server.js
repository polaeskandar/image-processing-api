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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const dotenv_1 = __importDefault(require("dotenv"));
// Project files
const filenameMiddleware_1 = __importDefault(require("./middlewares/filenameMiddleware"));
const dimensionsMiddleware_1 = __importDefault(require("./middlewares/dimensionsMiddleware"));
// Init ENV file
dotenv_1.default.config();
// Init server
const server = (0, express_1.default)();
const ENV_PORT = process.env.PORT;
const PORT = ENV_PORT !== null && ENV_PORT !== void 0 ? ENV_PORT : 5000;
// Init images' paths
const ENV_IMAGES_ROOT = process.env.IMAGES_ROOT;
const IMAGES_PATH = path_1.default.join(__dirname, ENV_IMAGES_ROOT !== null && ENV_IMAGES_ROOT !== void 0 ? ENV_IMAGES_ROOT : './images');
const ENV_PROCESSED_IMAGES_ROOT = process.env.PROCESSED_IMAGES_ROOT;
const PROCESSED_IMAGES_PATH = path_1.default.join(__dirname, ENV_PROCESSED_IMAGES_ROOT !== null && ENV_PROCESSED_IMAGES_ROOT !== void 0 ? ENV_PROCESSED_IMAGES_ROOT : './processed_images');
// Check for processed images directory
if (!fs_1.default.existsSync(PROCESSED_IMAGES_PATH))
    fs_1.default.mkdirSync(PROCESSED_IMAGES_PATH);
server.get('/', filenameMiddleware_1.default, dimensionsMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const filenameArray = filename.split('.');
    const filenameWithoutExtension = filenameArray[0];
    const filenameExtension = filenameArray[filenameArray.length - 1];
    const width = req.query.width;
    const height = req.query.height;
    const processedFileDir = path_1.default.join(PROCESSED_IMAGES_PATH, filenameWithoutExtension);
    const processedFilePath = path_1.default.join(processedFileDir, `${filenameWithoutExtension}-${width}x${height}.${filenameExtension}`);
    if (fs_1.default.existsSync(processedFileDir) && fs_1.default.existsSync(processedFilePath)) {
        res.status(200).sendFile(processedFilePath);
        return;
    }
    const filepath = path_1.default.join(IMAGES_PATH, filename);
    if (!fs_1.default.existsSync(processedFileDir))
        fs_1.default.mkdirSync(processedFileDir);
    yield (0, sharp_1.default)(filepath).resize(parseInt(width), parseInt(height)).toFile(processedFilePath);
    res.status(201).sendFile(processedFilePath);
}));
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = server;

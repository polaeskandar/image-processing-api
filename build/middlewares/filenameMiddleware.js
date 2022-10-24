"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filenameMiddleware = (req, res, next) => {
    const filename = req.query.filename;
    if (typeof filename === 'undefined' || !filename.includes('.')) {
        res.status(400).send('Please provide a valid filename.');
        return;
    }
    const ENV_IMAGES_ROOT = process.env.IMAGES_ROOT;
    const IMAGES_PATH = path_1.default.join(__dirname, '..', ENV_IMAGES_ROOT !== null && ENV_IMAGES_ROOT !== void 0 ? ENV_IMAGES_ROOT : './images');
    const filepath = path_1.default.join(IMAGES_PATH, filename);
    if (!fs_1.default.existsSync(filepath)) {
        res.status(400).send("This file does't exist on the server.");
        return;
    }
    next();
};
exports.default = filenameMiddleware;

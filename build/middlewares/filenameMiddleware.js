"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const filenameMiddleware = (req, res, next) => {
    const filename = req.query.filename;
    if (typeof filename === 'undefined' || !filename.includes('.')) {
        res.status(400).send('Please provide a valid filename.');
        return;
    }
    const filepath = path_1.default.join(constants_1.IMAGES_PATH, filename);
    if (!fs_1.default.existsSync(filepath)) {
        res.status(400).send("This file does't exist on the server.");
        return;
    }
    next();
};
exports.default = filenameMiddleware;

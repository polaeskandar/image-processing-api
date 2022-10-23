"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileName = void 0;
const validateFileName = (filename) => {
    return !!filename && filename.includes(".");
};
exports.validateFileName = validateFileName;

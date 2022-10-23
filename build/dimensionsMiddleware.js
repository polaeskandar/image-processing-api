"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dimensionsMiddleware = (req, res, next) => {
    const width = req.query.width;
    const height = req.query.height;
    if (width && height)
        next();
    else
        res.status(400).send("Please provide proper dimensions");
};
exports.default = dimensionsMiddleware;

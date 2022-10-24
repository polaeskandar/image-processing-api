"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dimensionsMiddleware = (req, res, next) => {
    const width = req.query.width;
    const height = req.query.height;
    if (typeof width === 'undefined' || typeof height === 'undefined') {
        res.status(400).send('Please provide proper dimensions');
        return;
    }
    if (isNaN(+width) || isNaN(+height)) {
        res.status(400).send('Please provide proper dimensions');
        return;
    }
    if (parseInt(width) > 3000 || parseInt(width) < 10) {
        res.status(400).send('Please provide a width dimension between 10 and 3000');
        return;
    }
    if (parseInt(height) > 3000 || parseInt(height) < 10) {
        res.status(400).send('Please provide a height dimension between 10 and 3000');
        return;
    }
    next();
};
exports.default = dimensionsMiddleware;

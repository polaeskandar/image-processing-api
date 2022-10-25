import fs from 'fs';
import path from 'path';
import { PROCESSED_IMAGES_PATH } from './constants';

const buildFilePath = path.join(__dirname, './build.js');

if (!fs.existsSync(PROCESSED_IMAGES_PATH)) fs.mkdirSync(PROCESSED_IMAGES_PATH);
if (fs.existsSync(buildFilePath)) fs.rmSync(buildFilePath);

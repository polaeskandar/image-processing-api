import path from 'path';

const ENV_PORT: number = process.env.PORT as unknown as number;
const ENV_IMAGES_ROOT: string = process.env.IMAGES_ROOT as string;
const ENV_PROCESSED_IMAGES_ROOT: string = process.env.PROCESSED_IMAGES_ROOT as string;

export const PORT: number = ENV_PORT ?? 5000;
export const IMAGES_PATH: string = path.join(__dirname, ENV_IMAGES_ROOT ?? '../storage/images');
export const PROCESSED_IMAGES_PATH: string = path.join(__dirname, ENV_PROCESSED_IMAGES_ROOT ?? '../storage/processed_images');

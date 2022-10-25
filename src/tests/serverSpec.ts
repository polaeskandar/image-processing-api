// Packages
import path from 'path';
import fs from 'fs';
import supertest, { Response } from 'supertest';

// Project files
import serverApp from '../server';
import { IMAGES_PATH } from '../constants';
import { processImage } from '../helpers/process-image';
import { getFileExtension, getFilenameWithoutExtension } from '../helpers/file-name';

const server = supertest(serverApp);

describe('Server suite', (): void => {
  it('can get server primary endpoint', async (): Promise<void> => {
    const response: Response = await server.get('/');
    expect(response.status).toBe(400); // Please refer to 'Running the project' section in readme.md file.
  });

  it('can check existence of files', (): void => {
    const file1: string = path.join(IMAGES_PATH, 'image_001.jpg');
    const file2: string = path.join(IMAGES_PATH, 'image_00s');

    expect(fs.existsSync(file1)).toBe(true);
    expect(fs.existsSync(file2)).toBe(false);
  });

  it('can get filenames without extensions', (): void => {
    expect(getFilenameWithoutExtension('image_001.jpg')).toBe('image_001');
    expect(getFilenameWithoutExtension('image_002.jpg')).toBe('image_002');
    expect(getFilenameWithoutExtension('image_003.jpg')).toBe('image_003');
  });

  it('can get file extensions', (): void => {
    expect(getFileExtension('image_001.jpg')).toBe('jpg');
    expect(getFileExtension('image_002.png')).toBe('png');
    expect(getFileExtension('image_003.gif')).toBe('gif');
  });

  it('can process images correctly', async (): Promise<void> => {
    expect(async () => await processImage('image_001.jpg', 300, 300)).not.toThrow();
    expect(async () => await processImage('image_002.jpg', 300, 300)).not.toThrow();
    expect(async () => await processImage('image_003.jpg', 300, 300)).not.toThrow();
  });

  it('can process requests correctly', async (): Promise<void> => {
    const allowedStatusCodes: number[] = [200, 201];

    const successfulResponse: Response = await server.get('?filename=image_001.jpg&width=300&height=300');
    expect(allowedStatusCodes).toContain(successfulResponse.status);

    let badRequest: Response;

    badRequest = await server.get('?filename=image_001&width=300&height=300');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=300&height=a');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=a&height=300');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=5&height=5');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=300&height=5');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=5&height=300');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=3001&height=3001');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=3001&height=300');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=300&height=3001');
    expect(badRequest.status).toBe(400);
  });
});

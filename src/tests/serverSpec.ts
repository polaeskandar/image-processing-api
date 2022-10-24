// Packages
import path from 'path';
import fs from 'fs';
import supertest, { Response } from 'supertest';

// Project files
import serverApp from '../server';

const server = supertest(serverApp);

describe('App suite', (): void => {
  it('can get server primary endpoint', async (): Promise<void> => {
    const response: Response = await server.get('/');
    expect(response.status).toBe(400);
    // Bad request, because we didn't specify the filename, width and height parameters - please refer to 'Running the project' section in readme.md
  });

  it('can check existence of files', (): void => {
    const ENV_IMAGES_ROOT: string = process.env.IMAGES_ROOT as string;
    const IMAGES_PATH: string = path.join(__dirname, '..', ENV_IMAGES_ROOT ?? './images');

    const file1: string = path.join(IMAGES_PATH, 'image_001.jpg');
    const file2: string = path.join(IMAGES_PATH, 'image_00s');

    expect(fs.existsSync(file1)).toBe(true);
    expect(fs.existsSync(file2)).toBe(false);
  });

  it('can process images correctly', async (): Promise<void> => {
    const allowedStatusCodes: number[] = [200, 201];
    const successfulResponse: Response = await server.get('?filename=image_001.jpg&width=300&height=300');
    expect(allowedStatusCodes).toContain(successfulResponse.status);

    let badRequest: Response;

    badRequest = await server.get('?filename=image_001&width=300&height=300');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=a&height=300');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=a&height=300');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=500&height=9');
    expect(badRequest.status).toBe(400);

    badRequest = await server.get('?filename=image_001.jpg&width=3001&height=50');
    expect(badRequest.status).toBe(400);
  });
});

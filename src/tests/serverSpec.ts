import supertest from "supertest";
import ImageController from "../Controllers/ImageController";
import serverApp from "../server";
const path = require("path");

import { validateFileName } from "../helpers";

const server = supertest(serverApp);

describe("App suite", () => {
  it("can get server endpoint", async () => {
    const response = await server.get("/");
    expect(response.status).toBe(400); // Bad request, because we didn't specify the filename, width and height
  });

  it("can check existence of files", () => {
    const IMAGES_PATH = path.resolve(__dirname, "..", process.env.IMAGES_ROOT);
    const filepath = path.join(IMAGES_PATH, "image_001.jpg");
    expect(ImageController.checkExistence(filepath)).toBe(true);
  });

  it("can validate filenames", () => {
    expect(validateFileName("image_001.jpg")).toBe(true);
    expect(validateFileName("image_001")).toBe(false);
    expect(validateFileName("")).toBe(false);
  });
});

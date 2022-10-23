"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const ImageController_1 = __importDefault(require("../Controllers/ImageController"));
const server_1 = __importDefault(require("../server"));
const path = require("path");
const helpers_1 = require("../helpers");
const server = (0, supertest_1.default)(server_1.default);
describe("App suite", () => {
    it("can get server endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield server.get("/");
        expect(response.status).toBe(400); // Bad request, because we didn't specify the filename, width and height
    }));
    it("can check existence of files", () => {
        const IMAGES_PATH = path.resolve(__dirname, "..", process.env.IMAGES_ROOT);
        const filepath = path.join(IMAGES_PATH, "image_001.jpg");
        expect(ImageController_1.default.checkExistence(filepath)).toBe(true);
    });
    it("can validate filenames", () => {
        expect((0, helpers_1.validateFileName)("image_001.jpg")).toBe(true);
        expect((0, helpers_1.validateFileName)("image_001")).toBe(false);
        expect((0, helpers_1.validateFileName)("")).toBe(false);
    });
});

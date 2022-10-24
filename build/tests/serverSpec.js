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
// Packages
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const supertest_1 = __importDefault(require("supertest"));
// Project files
const server_1 = __importDefault(require("../server"));
const server = (0, supertest_1.default)(server_1.default);
describe('App suite', () => {
    it('can get server primary endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield server.get('/');
        expect(response.status).toBe(400);
        // Bad request, because we didn't specify the filename, width and height parameters - please refer to 'Running the project' section in readme.md
    }));
    it('can check existence of files', () => {
        const ENV_IMAGES_ROOT = process.env.IMAGES_ROOT;
        const IMAGES_PATH = path_1.default.join(__dirname, '..', ENV_IMAGES_ROOT !== null && ENV_IMAGES_ROOT !== void 0 ? ENV_IMAGES_ROOT : './images');
        const file1 = path_1.default.join(IMAGES_PATH, 'image_001.jpg');
        const file2 = path_1.default.join(IMAGES_PATH, 'image_00s');
        expect(fs_1.default.existsSync(file1)).toBe(true);
        expect(fs_1.default.existsSync(file2)).toBe(false);
    });
    it('can process images correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const allowedStatusCodes = [200, 201];
        const successfulResponse = yield server.get('?filename=image_001.jpg&width=300&height=300');
        expect(allowedStatusCodes).toContain(successfulResponse.status);
        let badRequest;
        badRequest = yield server.get('?filename=image_001&width=300&height=300');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=a&height=300');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=a&height=300');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=500&height=9');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=3001&height=50');
        expect(badRequest.status).toBe(400);
    }));
});

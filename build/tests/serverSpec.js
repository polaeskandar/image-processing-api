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
const constants_1 = require("../constants");
const process_image_1 = require("../helpers/process-image");
const file_name_1 = require("../helpers/file-name");
const server = (0, supertest_1.default)(server_1.default);
describe('Server suite', () => {
    it('can get server primary endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield server.get('/');
        expect(response.status).toBe(400); // Please refer to 'Running the project' section in readme.md file.
    }));
    it('can check existence of files', () => {
        const file1 = path_1.default.join(constants_1.IMAGES_PATH, 'image_001.jpg');
        const file2 = path_1.default.join(constants_1.IMAGES_PATH, 'image_00s');
        expect(fs_1.default.existsSync(file1)).toBe(true);
        expect(fs_1.default.existsSync(file2)).toBe(false);
    });
    it('can get filenames without extensions', () => {
        expect((0, file_name_1.getFilenameWithoutExtension)('image_001.jpg')).toBe('image_001');
        expect((0, file_name_1.getFilenameWithoutExtension)('image_002.jpg')).toBe('image_002');
        expect((0, file_name_1.getFilenameWithoutExtension)('image_003.jpg')).toBe('image_003');
    });
    it('can get file extensions', () => {
        expect((0, file_name_1.getFileExtension)('image_001.jpg')).toBe('jpg');
        expect((0, file_name_1.getFileExtension)('image_002.png')).toBe('png');
        expect((0, file_name_1.getFileExtension)('image_003.gif')).toBe('gif');
    });
    it('can process images correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, process_image_1.processImage)('image_001.jpg', 300, 300); })).not.toThrow();
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, process_image_1.processImage)('image_002.jpg', 300, 300); })).not.toThrow();
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, process_image_1.processImage)('image_003.jpg', 300, 300); })).not.toThrow();
    }));
    it('can process requests correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const allowedStatusCodes = [200, 201];
        const successfulResponse = yield server.get('?filename=image_001.jpg&width=300&height=300');
        expect(allowedStatusCodes).toContain(successfulResponse.status);
        let badRequest;
        badRequest = yield server.get('?filename=image_001&width=300&height=300');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=300&height=a');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=a&height=300');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=5&height=5');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=300&height=5');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=5&height=300');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=3001&height=3001');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=3001&height=300');
        expect(badRequest.status).toBe(400);
        badRequest = yield server.get('?filename=image_001.jpg&width=300&height=3001');
        expect(badRequest.status).toBe(400);
    }));
});

# Image Processing API

made by [polaeskandar](https://github.com/polaeskandar)

- This API edit the dimensions of the images.
- Each processed image is placed in a stand alone folder in the `processed_images` folder.
- The `processed_images` folder can be found in the `storage` folder in the root directory.
- The `processed_images` folder is created once the project is built and compiled.
- Each image can have multiple sizes and dimensions.

---

## Running the project

1. Run `npm run start`: this will compile and run the project.
2. Navigate to http://localhost:5000/ to preview the project.
3. In order to process any images put your images in the images folder in the storage folder in the root directory of the project.

> Please notice that the above URL will result in a request with status code 400. To fix this: provide the following query parameters: `filename`, `width`, `height`.

3. Run `npm run test`: this will test the core functionalities of the project.

---

## scripts

- build: `npm run build`
- dev: `npm run dev` (TypeScript compiler + watch changes to project using nodemon)
- start: `npm run start` (TypeScript compiler + run server.js)
- test: `npm run test`
- prettier: `npm run prettier`
- eslint: `npm run eslint`
- format:` npm run format` (prettier + eslint)

---

## Endpoints

- `GET` '/' accepts 3 main query parameters: "filename", "width" and "height"

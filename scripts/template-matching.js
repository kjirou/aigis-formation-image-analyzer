#!/usr/bin/env node

const fs = require('fs-extra');
const jimp = require('jimp');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SAMPLE_DATA_ROOT = path.join(PROJECT_ROOT, 'sample-data');
const SAMPLE_DATA_FORMATION_IMAGES_ROOT = path.join(SAMPLE_DATA_ROOT, 'formation-images');
const SAMPLE_DATA_TEMPLATE_IMAGES_ROOT = path.join(SAMPLE_DATA_ROOT, 'template-images');
const TMP_ROOT = path.join(PROJECT_ROOT, 'tmp');
const TMP_BUILT_IMAGES_ROOT = path.join(TMP_ROOT, 'built-images');
const TMP_BUILT_IMAGES_TEMPLATES_ROOT = path.join(TMP_BUILT_IMAGES_ROOT, 'templates');

function convertPngToGrayscale(fromFilePath, toFilePath) {
  return Promise.resolve()
    .then(() => {
      return jimp.read(fromFilePath);
    })
    .then(image => {
      return image
        .resize(Math.ceil(image.bitmap.width / 2), jimp.AUTO)
        .greyscale()
        .write(toFilePath);
    })
  ;
}

function bitmapDataToMatrix(jimpImage) {
  const {width, height, data} = jimpImage;
  const matrix = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(data[y * width * 4 + x * 4]);
    }
    matrix.push(row);
  }
  return matrix;
}

/**
 * SAD (Sum of Absolute Differences)
 * https://en.wikipedia.org/wiki/Sum_of_absolute_differences
 * @param templateImageData {width, height, pixels}
 * @param searchImageData {width, height, pixels}
 */
function searchBySad(templateImageData, searchImageData) {
}

const conversions = [
  [
    path.join(SAMPLE_DATA_FORMATION_IMAGES_ROOT, 'formation-1--cropped.png'),
    path.join(TMP_BUILT_IMAGES_ROOT, 'formation-1--cropped.png'),
  ],
  [
    path.join(SAMPLE_DATA_TEMPLATE_IMAGES_ROOT, 'dina.png'),
    path.join(TMP_BUILT_IMAGES_TEMPLATES_ROOT, 'dina.png'),
  ],
  [
    path.join(SAMPLE_DATA_TEMPLATE_IMAGES_ROOT, 'leda.png'),
    path.join(TMP_BUILT_IMAGES_TEMPLATES_ROOT, 'leda.png'),
  ],
  [
    path.join(SAMPLE_DATA_TEMPLATE_IMAGES_ROOT, 'mikoto.png'),
    path.join(TMP_BUILT_IMAGES_TEMPLATES_ROOT, 'mikoto.png'),
  ],
  [
    path.join(SAMPLE_DATA_TEMPLATE_IMAGES_ROOT, 'ramy.png'),
    path.join(TMP_BUILT_IMAGES_TEMPLATES_ROOT, 'ramy.png'),
  ],
  [
    path.join(SAMPLE_DATA_TEMPLATE_IMAGES_ROOT, 'tenma.png'),
    path.join(TMP_BUILT_IMAGES_TEMPLATES_ROOT, 'tenma.png'),
  ],
];


//
// main
//

fs.removeSync(TMP_ROOT);
fs.ensureDirSync(TMP_BUILT_IMAGES_TEMPLATES_ROOT);

Promise.resolve()
  .then(() => {
    return Promise.all(conversions.map(([from, to]) => convertPngToGrayscale(from, to)));
  })
  .then(() => {
    return jimp.read(path.join(TMP_BUILT_IMAGES_TEMPLATES_ROOT, 'tenma.png'))
      .then(image => {
        // RGBA で 1 ピクセル(画素)辺り 4 バイト割り当てられている
        // 実際はグレースケールしたので、[x, x, x, 255] になっていて x は同じ値
        console.log(image.bitmap.width);
        console.log(image.bitmap.height);
        console.log(image.bitmap.data.length);
        const matrix = bitmapDataToMatrix(image.bitmap);
        console.log(matrix.length);
        console.log(matrix[0].length);
        console.log(matrix[matrix.length - 1].length);
      })
    ;
  })
;

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
        .greyscale()
        .write(toFilePath);
    })
  ;
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
;

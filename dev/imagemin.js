const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

imagemin(['./dist/assets/img/**/*.{jpg,png,gif,svg}'], './dist/assets/img', {
  use: [
    imageminMozjpeg({ quality: 75, progressive: true }),
    imageminPngquant({quality: '65-80'}),
    imageminGifsicle({ optimizationLevel: 3 }),
    imageminSvgo({
      removeUnknownsAndDefaults: false,
      cleanupIDs: false,
      plugins: [
        { removeViewBox: false }
      ]
    })
  ]
}).then(files => {
  console.log('images compiled');
  // console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});
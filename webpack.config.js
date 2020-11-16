const path = require(`path`);

module.exports = {
  entry: [
    `./js/utils.js`,
    `./js/backend.js`,
    `./js/move.js`,
    `./js/debounce.js`,
    `./js/gallery.js`,
    `./js/big-picture.js`,
    `./js/comments-loader.js`,
    `./js/upload-form.js`,
    `./js/dialog-upload.js`,
    `./js/photo-edit.js`,
    `./js/upload-validation.js`,
    `./js/check-focus.js`,
    `./js/set-preview.js`,
    `./js/photo-upload.js`,
    `./js/add-filtration.js`,
  ],
  output: {
    filename: `./bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false,
};

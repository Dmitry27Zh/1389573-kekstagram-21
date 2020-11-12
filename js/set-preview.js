'use strict';

(function () {
  const FILE_TYPES = [`jpg`, `jpeg`, `png`];

  window.setPreview = (input, imageElement, action) => {
    const file = input.files[0];
    const reader = new FileReader();
    const matches = FILE_TYPES.some((type) => {
      return file.type.endsWith(type);
    });
    if (matches) {
      reader.addEventListener(`load`, () => {
        imageElement.src = reader.result;
        action();
      });
      reader.readAsDataURL(file);
    }
  };
})();

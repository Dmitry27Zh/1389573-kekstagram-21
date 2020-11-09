'use strict';

(function () {
  const imageElement = window.photoEdit.imageElement;
  const uploadElement = document.querySelector(`#upload-file`);

  const onUpload = (evt) => {
    evt.preventDefault();
    window.modalUpload.show();
  };

  uploadElement.addEventListener(`click`, onUpload);
})();

'use strict';

(function () {
  const imageElement = window.photoEdit.imageElement;
  const uploadElement = window.uploadForm.element.querySelector(`#upload-file`);

  const activatePhotoUpload = () => {
    window.uploadForm.addRequest();
    window.photoEdit.activate();
    window.uploadValidation.add();
    window.dialogUpload.show();
  };

  const deactivatePhotoUpload = () => {
    window.uploadForm.removeRequest();
    window.photoEdit.deactivate();
    window.uploadValidation.remove();
    window.dialogUpload.close();
  };

  const onUpload = () => {
    window.setPreview(uploadElement, imageElement, activatePhotoUpload);
  };

  uploadElement.addEventListener(`change`, onUpload);

  window.photoUpload = {
    deactivate: deactivatePhotoUpload,
  };
})();

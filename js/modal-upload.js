'use strict';

(function () {
  const modal = document.querySelector(`.img-upload__overlay`);

  const showModal = () => {
    modal.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
  };

  const closeModal = () => {
    modal.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
  };

  showModal();

  window.modalUpload = {
    element: modal,
  };
})();

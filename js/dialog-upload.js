'use strict';

(function () {
  const modalElement = window.uploadForm.element.querySelector(`.img-upload__overlay`);
  const modalCloseElement = modalElement.querySelector(`.img-upload__cancel`);

  const modalCloseClickHandler = () => {
    closeModal();
    window.photoUpload.deactivate();
  };

  const modalCloseKeydownHandler = (evt) => {
    window.utils.isEscEvent(evt, () => {
      closeModal();
      window.uploadForm.element.reset();
    });
  };

  const showModal = () => {
    modalElement.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    modalCloseElement.addEventListener(`click`, modalCloseClickHandler);
    document.addEventListener(`keydown`, modalCloseKeydownHandler);
  };

  const closeModal = () => {
    modalElement.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    modalCloseElement.removeEventListener(`click`, modalCloseClickHandler);
    document.removeEventListener(`keydown`, modalCloseKeydownHandler);
  };

  window.dialogUpload = {
    element: modalElement,
    show: showModal,
    close: closeModal,
  };
})();

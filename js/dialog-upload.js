'use strict';

(function () {
  const modal = window.uploadForm.element.querySelector(`.img-upload__overlay`);
  const modalClose = modal.querySelector(`.img-upload__cancel`);

  const modalCloseClickHandler = () => {
    closeModal();
    window.photoUpload.deactivate();
    modalClose.removeEventListener(`click`, modalCloseClickHandler);
    document.removeEventListener(`keydown`, modalCloseKeydownHandler);
  };

  const modalCloseKeydownHandler = (evt) => {
    window.utils.isEscEvent(evt, closeModal);
    window.uploadForm.element.reset();
    modalClose.removeEventListener(`click`, modalCloseClickHandler);
    document.removeEventListener(`keydown`, modalCloseKeydownHandler);
  };

  const showModal = () => {
    modal.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    modalClose.addEventListener(`click`, modalCloseClickHandler);
    document.addEventListener(`keydown`, modalCloseKeydownHandler);
  };

  const closeModal = () => {
    modal.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
  };

  window.dialogUpload = {
    element: modal,
    show: showModal,
    close: closeModal,
  };
})();

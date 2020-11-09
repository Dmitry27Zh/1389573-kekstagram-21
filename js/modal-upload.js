'use strict';

(function () {
  const modal = document.querySelector(`.img-upload__overlay`);
  const modalClose = modal.querySelector(`.img-upload__cancel`);

  const modalCloseClickHandler = () => {
    closeModal();
    modalClose.removeEventListener(`click`, modalCloseClickHandler);
  };

  const showModal = () => {
    window.photoEdit.activate();
    modal.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    modalClose.addEventListener(`click`, modalCloseClickHandler);
  };

  const closeModal = () => {
    modal.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    window.photoEdit.deactivate();
  };

  window.modalUpload = {
    element: modal,
    show: showModal,
  };
})();

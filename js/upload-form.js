'use strict';

(function () {
  const mainElement = document.body.querySelector(`main`);
  const uploadFormElement = document.querySelector(`.img-upload__form`);
  const messageTemplate = {
    success: document.querySelector(`#success`).content.querySelector(`.success`),
    error: document.querySelector(`#error`).content.querySelector(`.error`),
  };

  const showMessage = (type) => {
    const node = messageTemplate[type].cloneNode(`true`);
    mainElement.insertAdjacentElement(`afterbegin`, node);

    const closeMessage = () => {
      mainElement.removeChild(mainElement.children[0]);
      document.removeEventListener(`click`, closeMessageEventHandler);
      document.removeEventListener(`keydown`, closeMessageEventHandler);
    };

    const closeMessageEventHandler = (evt) => {
      if (!evt.target.matches(`.success *`) || evt.target.matches(`.success__button`)) {
        closeMessage();
      }
      window.utils.isEscEvent(evt, closeMessage);
    };

    document.addEventListener(`click`, closeMessageEventHandler);
    document.addEventListener(`keydown`, closeMessageEventHandler);
  };

  const uploadFormSubmitHandler = (evt) => {
    evt.preventDefault();
    window.backend.send(new FormData(uploadFormElement), () => {
      window.photoUpload.deactivate();
      showMessage(`success`);
    }, () => {
      showMessage(`error`);
    });
  };

  const addRequest = () => {
    uploadFormElement.addEventListener(`submit`, uploadFormSubmitHandler);
  };

  const removeRequest = () => {
    uploadFormElement.removeEventListener(`submit`, uploadFormSubmitHandler);
  };

  window.uploadForm = {
    element: uploadFormElement,
    addRequest,
    removeRequest,
  };
})();

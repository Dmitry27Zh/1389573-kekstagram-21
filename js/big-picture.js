'use strict';

(function () {
  const bigPictureElement = document.querySelector(`.big-picture`);
  const pictureElement = bigPictureElement.querySelector(`.big-picture__img img`);
  const captionElement = bigPictureElement.querySelector(`.social__caption`);
  const likesElement = bigPictureElement.querySelector(`.likes-count`);
  const closeButtonElement = bigPictureElement.querySelector(`#picture-cancel`);

  const closeButtonClickHandler = () => {
    closeBigPicture();
  };

  const bigPictureKeydownHandler = (evt) => {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  const showBigPicture = (item) => {
    pictureElement.src = item.url;
    captionElement.textContent = item.description;
    likesElement.textContent = item.likes;
    window.commentsLoader.activate(item);
    bigPictureElement.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    closeButtonElement.addEventListener(`click`, closeButtonClickHandler);
    document.addEventListener(`keydown`, bigPictureKeydownHandler);
  };

  const closeBigPicture = () => {
    bigPictureElement.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    window.commentsLoader.deactivate();
    closeButtonElement.removeEventListener(`click`, closeButtonClickHandler);
    document.removeEventListener(`keydown`, bigPictureKeydownHandler);
  };

  window.bigPicture = {
    element: bigPictureElement,
    show: showBigPicture,
    close: closeBigPicture,
  };
})();

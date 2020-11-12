'use strict';

(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const picture = bigPicture.querySelector(`.big-picture__img img`);
  const caption = bigPicture.querySelector(`.social__caption`);
  const likes = bigPicture.querySelector(`.likes-count`);
  const commentsContainer = bigPicture.querySelector(`.social__comments`);
  const commentElement = commentsContainer.querySelector(`.social__comment`);
  const closeButton = bigPicture.querySelector(`#picture-cancel`);
  const COMMENTS_MAX_QUANTITY = 5;

  const createComment = (comment) => {
    const newCommentElement = commentElement.cloneNode(`true`);
    newCommentElement.querySelector(`.social__picture`).src = comment.avatar;
    newCommentElement.querySelector(`.social__text`).textContent = comment.message;
    return newCommentElement;
  };

  const addComments = (comments) => {
    commentsContainer.innerHTML = ``;
    const commentsQuantity = comments.length > COMMENTS_MAX_QUANTITY ? COMMENTS_MAX_QUANTITY : comments.length;
    for (let i = 0; i < commentsQuantity; i++) {
      commentsContainer.appendChild(createComment(comments[i]));
    }
  };

  const closeButtonClickHandler = () => {
    closeBigPicture();
  };

  const bigPictureKeydownHandler = (evt) => {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  const showBigPicture = (item) => {
    picture.src = item.url;
    caption.textContent = item.description;
    likes.textContent = item.likes;
    addComments(item.comments);
    bigPicture.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    closeButton.addEventListener(`click`, closeButtonClickHandler);
    document.addEventListener(`keydown`, bigPictureKeydownHandler);
  };

  const closeBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    closeButton.removeEventListener(`click`, closeButtonClickHandler);
    document.removeEventListener(`keydown`, bigPictureKeydownHandler);
  };

  window.bigPicture = {
    show: showBigPicture,
    close: closeBigPicture,
  };
})();

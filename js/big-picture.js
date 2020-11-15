'use strict';

(function () {
  const bigPictureElement = document.querySelector(`.big-picture`);
  const pictureElement = bigPictureElement.querySelector(`.big-picture__img img`);
  const captionElement = bigPictureElement.querySelector(`.social__caption`);
  const likesElement = bigPictureElement.querySelector(`.likes-count`);
  const commentsContainerElement = bigPictureElement.querySelector(`.social__comments`);
  const commentElement = commentsContainerElement.querySelector(`.social__comment`);
  const closeButtonElement = bigPictureElement.querySelector(`#picture-cancel`);
  const commentLoaderElement = bigPictureElement.querySelector(`.comments-loader`);
  const COMMENTS_MAX_QUANTITY = 5;

  const createComment = (comment) => {
    const newCommentElement = commentElement.cloneNode(`true`);
    newCommentElement.querySelector(`.social__picture`).src = comment.avatar;
    newCommentElement.querySelector(`.social__text`).textContent = comment.message;
    return newCommentElement;
  };

  const addComments = (comments) => {
    commentsContainerElement.innerHTML = ``;
    const commentsQuantity = comments.length > COMMENTS_MAX_QUANTITY ? COMMENTS_MAX_QUANTITY : comments.length;
    for (let i = 0; i < commentsQuantity; i++) {
      commentsContainerElement.appendChild(createComment(comments[i]));
    }
    if (commentsQuantity === comments.length) {
      commentLoaderElement.classList.add(`hidden`);
    } else {
      commentLoaderElement.classList.remove(`hidden`);
    }
  };

  const commentsLoader = (loadedCommentsQuantity) => {
    return (comments) => {
      console.log(loadedCommentsQuantity)
      const remainingComments = comments.length - loadedCommentsQuantity;
      const commentsQuantity = remainingComments > COMMENTS_MAX_QUANTITY ? COMMENTS_MAX_QUANTITY : remainingComments;
      if (commentsQuantity) {
        for (let i = loadedCommentsQuantity; i < loadedCommentsQuantity + commentsQuantity; i++) {
          commentsContainerElement.appendChild(createComment(comments[i]));
        }
      }
      loadedCommentsQuantity += commentsQuantity;
      console.log(loadedCommentsQuantity, comments.length)
      if (loadedCommentsQuantity === comments.length) {
        commentLoaderElement.classList.add(`hidden`);
      }
    };
  };

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
    addComments(item.comments);
    bigPictureElement.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    const loadMoreComments = commentsLoader(commentsContainerElement.children.length);
    commentLoaderElement.addEventListener(`click`, () => {
      loadMoreComments(item.comments);
    });
    closeButtonElement.addEventListener(`click`, closeButtonClickHandler);
    document.addEventListener(`keydown`, bigPictureKeydownHandler);
  };

  const closeBigPicture = () => {
    bigPictureElement.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    closeButtonElement.removeEventListener(`click`, closeButtonClickHandler);
    document.removeEventListener(`keydown`, bigPictureKeydownHandler);
  };

  window.bigPicture = {
    show: showBigPicture,
    close: closeBigPicture,
  };
})();

'use strict';

(function () {
  const bigPictureElement = window.bigPicture.element;
  const commentsContainerElement = bigPictureElement.querySelector(`.social__comments`);
  const commentElement = commentsContainerElement.querySelector(`.social__comment`);
  const commentLoaderElement = bigPictureElement.querySelector(`.comments-loader`);
  const commentCountElement = bigPictureElement.querySelector(`.social__comment-count`);
  const COMMENTS_MAX_QUANTITY = 5;

  const editCommentCountElement = (loadedComments, totalComments) => {
    commentCountElement.innerHTML = `${loadedComments} из <span class="comments-count">${totalComments}</span> комментариев`;
  };

  const createComment = (comment) => {
    const newCommentElement = commentElement.cloneNode(true);
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
    editCommentCountElement(commentsQuantity, comments.length);
  };

  const commentsLoader = (loadedCommentsQuantity) => {
    return (comments) => {
      const remainingComments = comments.length - loadedCommentsQuantity;
      const commentsQuantity = remainingComments > COMMENTS_MAX_QUANTITY ? COMMENTS_MAX_QUANTITY : remainingComments;
      if (commentsQuantity) {
        for (let i = loadedCommentsQuantity; i < loadedCommentsQuantity + commentsQuantity; i++) {
          commentsContainerElement.appendChild(createComment(comments[i]));
        }
      }
      loadedCommentsQuantity += commentsQuantity;
      if (loadedCommentsQuantity === comments.length) {
        commentLoaderElement.classList.add(`hidden`);
      }
      editCommentCountElement(loadedCommentsQuantity, comments.length);
    };
  };

  let commentLoaderElementClickHandler;

  const activateCommentsLoader = (item) => {
    addComments(item.comments);
    const loadMoreComments = commentsLoader(commentsContainerElement.children.length);
    commentLoaderElementClickHandler = () => {
      loadMoreComments(item.comments);
    };
    commentLoaderElement.addEventListener(`click`, commentLoaderElementClickHandler);
  };

  const deactivateCommentsLoader = () => {
    commentLoaderElement.removeEventListener(`click`, commentLoaderElementClickHandler);
  };

  window.commentsLoader = {
    activate: activateCommentsLoader,
    deactivate: deactivateCommentsLoader,
  };
})();

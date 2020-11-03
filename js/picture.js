'use strict';

(function () {
  const template = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picturesContainer = document.querySelector(`.pictures`);

  const createPicture = (item) => {
    const node = template.cloneNode(true);
    node.querySelector(`.picture__img`).src = item.url;
    node.querySelector(`.picture__likes`).textContent = item.likes;
    node.querySelector(`.picture__comments`).textContent = item.comments.length;
    return node;
  };

  const addPictures = (data) => {
    const fragment = document.createDocumentFragment();
    data.forEach((item) => {
      fragment.appendChild(createPicture(item));
    })
    picturesContainer.appendChild(fragment);
  }

  window.load(addPictures);
})();

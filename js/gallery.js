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

  let pictureData = [];

  const addPictures = (data) => {
    pictureData = data;
    const fragment = document.createDocumentFragment();
    data.forEach((item) => {
      fragment.appendChild(createPicture(item));
    });
    picturesContainer.appendChild(fragment);
  };

  window.load(addPictures);

  picturesContainer.addEventListener(`click`, (evt) => {
    if (evt.target.matches(`.picture img`)) {
      const pictureElements = picturesContainer.querySelectorAll(`.picture`);
      const index = Array.from(pictureElements).indexOf(evt.target.parentElement);
      window.bigPicture.show(pictureData[index]);
    }
  });

  window.picture = {
    pictureData,
  };
})();

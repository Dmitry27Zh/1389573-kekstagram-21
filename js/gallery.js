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

  const addPictures = (picturesData) => {
    const fragment = document.createDocumentFragment();
    picturesData.forEach((item) => {
      fragment.appendChild(createPicture(item));
    });
    picturesContainer.appendChild(fragment);
  };

  const onSuccessLoad = (data) => {
    pictureData = data;
    addPictures(data);
    window.addFiltration();
  };

  window.backend.load(onSuccessLoad);

  const picturesContainerClickHandler = (evt) => {
    if (evt.target.matches(`.picture img`)) {
      const pictureElements = picturesContainer.querySelectorAll(`.picture`);
      const index = Array.from(pictureElements).indexOf(evt.target.parentElement);
      window.bigPicture.show(pictureData[index]);
    }
  };

  picturesContainer.addEventListener(`click`, picturesContainerClickHandler);

  window.gallery = {
    pictureData,
    picturesContainer,
  };
})();

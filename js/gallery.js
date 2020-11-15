'use strict';

(function () {
  const templateElement = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picturesContainerElement = document.querySelector(`.pictures`);

  const createPicture = (item) => {
    const node = templateElement.cloneNode(true);
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
    picturesContainerElement.appendChild(fragment);
  };

  const onSuccessLoad = (data) => {
    pictureData = data;
    addPictures(data);
    window.addFiltration();
  };

  window.backend.load(onSuccessLoad);

  const picturesContainerClickHandler = (evt) => {
    if (evt.target.matches(`.picture img`)) {
      const pictureElements = picturesContainerElement.querySelectorAll(`.picture`);
      const index = Array.from(pictureElements).indexOf(evt.target.parentElement);
      window.bigPicture.show(pictureData[index]);
    }
  };

  picturesContainerElement.addEventListener(`click`, picturesContainerClickHandler);

  window.gallery = {
    pictureData,
    picturesContainerElement,
  };
})();

'use strict';

(function () {
  const templateElement = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picturesContainerElement = document.querySelector(`.pictures`);

  const createPicture = (item, index) => {
    const node = templateElement.cloneNode(true);
    node.setAttribute(`data-index`, index);
    node.querySelector(`.picture__img`).src = item.url;
    node.querySelector(`.picture__likes`).textContent = item.likes;
    node.querySelector(`.picture__comments`).textContent = item.comments.length;
    return node;
  };

  let pictureData = [];

  const addPictures = (picturesData) => {
    const fragment = document.createDocumentFragment();
    picturesData.forEach((item, index) => {
      fragment.appendChild(createPicture(item, index));
    });
    picturesContainerElement.appendChild(fragment);
  };

  const onSuccessLoad = (data) => {
    pictureData = data;
    addPictures(data);
    window.addFiltration();
  };

  const showLoadErrorMessage = (message) => {
    const errorElement = document.createElement(`div`);
    errorElement.style = `z-index: 1000; padding: 20px; border: 2px dashed red; color: red; font-weight: bold`;
    errorElement.style.position = `absolute`;
    errorElement.style.fontSize = `50px`;
    errorElement.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, errorElement);
  };

  window.backend.load(onSuccessLoad, showLoadErrorMessage);

  const picturesContainerClickHandler = (evt) => {
    if (evt.target.matches(`.picture img`)) {
      const index = evt.target.parentElement.getAttribute(`data-index`);
      window.bigPicture.show(pictureData[index]);
    }
  };

  picturesContainerElement.addEventListener(`click`, picturesContainerClickHandler);

  window.gallery = {
    picturesContainerElement,
  };
})();

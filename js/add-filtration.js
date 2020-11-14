'use strict';

(function () {
  const filtersContainerElement = document.querySelector(`.img-filters`);
  const filtersFormElement = filtersContainerElement.querySelector(`.img-filters__form`);
  const RANDOM_PICTURES_QUANTITY = 10;

  const showRandomPictures = (pictureElements) => {
    pictureElements = Array.from(pictureElements);
    let randomIndexList = window.utils.getRandomIndexList(pictureElements, RANDOM_PICTURES_QUANTITY);
    pictureElements.forEach((picture, pictureIndex) => {
      if (!randomIndexList.some((index) => {
        return index === pictureIndex;
      })) {
        picture.classList.add(`visually-hidden`);
      }
    });
  };

  window.addFiltration = () => {
    filtersContainerElement.classList.remove(`img-filters--inactive`);
    const pictureElements = document.querySelectorAll(`.picture`);

    filtersFormElement.addEventListener(`click`, (evt) => {
      if (evt.target.id.includes(`random`)) {
        showRandomPictures(pictureElements);
      }
    });
  };
})();

'use strict';

(function () {
  const filtersContainerElement = document.querySelector(`.img-filters`);
  const filtersFormElement = filtersContainerElement.querySelector(`.img-filters__form`);
  const RANDOM_PICTURES_QUANTITY = 10;
  const picturesContainerElement = window.gallery.picturesContainerElement;

  const showHiddenPicture = (picture) => {
    if (picture.classList.contains(`visually-hidden`)) {
      picture.classList.remove(`visually-hidden`);
    }
  };

  const showRandomPictures = (pictureElements) => {
    let randomIndexList = window.utils.getRandomIndexList(pictureElements, RANDOM_PICTURES_QUANTITY);
    pictureElements.forEach((picture, pictureIndex) => {
      if (!randomIndexList.some((index) => {
        return index === pictureIndex;
      })) {
        picture.classList.add(`visually-hidden`);
      }
    });
  };

  const showDiscussedPictures = (pictureElements) => {
    let sortedPicturesByComments = pictureElements.slice().sort((a, b) => {
      return b.querySelector(`.picture__comments`).textContent - a.querySelector(`.picture__comments`).textContent;
    });
    sortedPicturesByComments.forEach((picture) => {
      showHiddenPicture(picture);
      picturesContainerElement.appendChild(picture);
    });
  };

  const showDefaultPictures = (pictureElements) => {
    pictureElements.forEach((picture) => {
      showHiddenPicture(picture);
      picturesContainerElement.appendChild(picture);
    });
  };

  const filters = {
    default: showDefaultPictures,
    random: showRandomPictures,
    discussed: showDiscussedPictures,
  };

  const filtrate = window.debounce();

  window.addFiltration = () => {
    filtersContainerElement.classList.remove(`img-filters--inactive`);
    let activatedFilterElement = filtersContainerElement.querySelector(`.img-filters__button--active`);
    let pictureElements = document.querySelectorAll(`.picture`);
    pictureElements = Array.from(pictureElements);

    filtersFormElement.addEventListener(`click`, (evt) => {
      if (!evt.target.classList.contains(`img-filters__button--active`)) {
        filtrate(() => {
          filters[evt.target.id.slice(7)](pictureElements);
          activatedFilterElement.classList.remove(`img-filters__button--active`);
          activatedFilterElement = evt.target;
          activatedFilterElement.classList.add(`img-filters__button--active`);
        });
      }
    });
  };
})();

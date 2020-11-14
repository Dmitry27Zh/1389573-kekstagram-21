'use strict';

(function () {
  const ESC_KEY = `Escape`;

  const getRandomNumber = (max, min = 0) => {
    return min + Math.floor((max - min) * Math.random());
  };

  const getRandomIndexList = (array, listLength) => {
    let randomIndexList = [];
    for (let i = 0; i <= listLength - 1; i++) {
      let index = getRandomNumber(array.length);
      while (randomIndexList.includes(index)) {
        index = getRandomNumber(array.length);
      }
      randomIndexList.push(index);
    }
    return randomIndexList;
  };

  const isEscEvent = (evt, action) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      action();
    }
  };

  window.utils = {
    isEscEvent,
    getRandomNumber,
    getRandomIndexList,
  };
})();

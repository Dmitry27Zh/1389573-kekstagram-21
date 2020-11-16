'use strict';

(function () {
  const textInputElements = window.uploadForm.element.querySelector(`.img-upload__text`).children;

  const textInputElementFocusHandler = (evt) => {
    evt.target.focused = true;
  };

  const textInputElementBlurHandler = (evt) => {
    evt.target.focused = false;
  };

  const checkFocusOn = () => {
    for (let textInputElement of textInputElements) {
      textInputElement.addEventListener(`focus`, textInputElementFocusHandler);
      textInputElement.addEventListener(`blur`, textInputElementBlurHandler);
    }
  };

  const checkFocusOff = () => {
    for (let textInputElement of textInputElements) {
      textInputElement.removeEventListener(`focus`, textInputElementFocusHandler);
      textInputElement.removeEventListener(`blur`, textInputElementBlurHandler);
    }
  };

  const isInputFocused = () => {
    return Array.from(textInputElements).some((input) => {
      return input.focused;
    });
  };

  window.checkFocus = {
    on: checkFocusOn,
    off: checkFocusOff,
    isInputFocused,
  };
})();

'use strict';

(function () {
  const ESC_KEY = `Escape`;

  const isEscEvent = (evt, action) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      action();
    }
  };

  window.utils = {
    isEscEvent,
  };
})();

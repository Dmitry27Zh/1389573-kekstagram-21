'use strict';

(function () {
  const ESC_KEY = `Escape`;

  const isEscEvent = (evt, action) => {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  window.utils = {
    isEscEvent,
  };
})();

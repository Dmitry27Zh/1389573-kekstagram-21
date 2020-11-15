'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = () => {
    let lastTimeout = null;
    return (cb) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  };
})();

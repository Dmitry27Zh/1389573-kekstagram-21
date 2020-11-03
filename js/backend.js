'use strict';

(function () {
  const LOAD_URL = `https://21.javascript.pages.academy/kekstagram/data`;

  const load = (onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.open(`get`, LOAD_URL);
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      console.log(xhr.response);
      onSuccess(xhr.response);
    });
    xhr.send();
  }

  window.load = load;
})();

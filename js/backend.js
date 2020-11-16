'use strict';

(function () {
  const LOAD_URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const SEND_URL = `https://21.javascript.pages.academy/kekstagram `;

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.open(`get`, LOAD_URL);
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });
    xhr.addEventListener(`error`, () => {
      onError(`Ошибка загрузки данных`);
    });
    xhr.send();
  };

  const send = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.open(`POST`, SEND_URL);
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      onSuccess();
    });
    xhr.addEventListener(`error`, () => {
      onError();
    });
    xhr.send(data);
  };

  window.backend = {
    load,
    send,
  };
})();

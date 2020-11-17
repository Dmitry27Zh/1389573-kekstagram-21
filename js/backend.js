'use strict';

(function () {
  const URL = {
    get: `https://21.javascript.pages.academy/kekstagram/data`,
    POST: `https://21.javascript.pages.academy/kekstagram `,
  };

  const createRequest = (method) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, URL[method]);
    xhr.responseType = `json`;
    return xhr;
  };

  const load = (onSuccess, onError) => {
    const xhr = createRequest(`get`);
    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });
    xhr.addEventListener(`error`, () => {
      onError(`Ошибка загрузки данных`);
    });
    xhr.send();
  };

  const send = (data, onSuccess, onError) => {
    const xhr = createRequest(`POST`);
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

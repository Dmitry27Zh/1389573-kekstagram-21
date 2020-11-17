'use strict';

(function () {
  const hashtagsInput = window.uploadForm.element.querySelector(`.text__hashtags`);
  const re = /^#[\w]*$/;
  const HASHTAGS_MAX_QUANTITY = 5;
  const ONLY_HASH_SYMBOL_LENGTH = 1;
  const HASHTAG_MAX_LENGTH = 20;

  const hashtagsInputHandler = () => {
    const hashtags = hashtagsInput.value.split(` `).map((hashtag) => {
      return hashtag.toLowerCase();
    });
    let errorMessage = hashtags.length > HASHTAGS_MAX_QUANTITY ? `нельзя указать больше пяти хэш-тегов` : ``;
    if (!errorMessage) {
      hashtags.forEach((hashtag, index) => {
        const isHashTagValid = re.test(hashtag);
        if (hashtags.indexOf(hashtag) !== index) {
          errorMessage = `Хеш-теги не должны повторяться`;
          return;
        }
        if (!isHashTagValid) {
          errorMessage = `Хеш-тег начинается с символа # и состоит из букв и цифр`;
        } else if (isHashTagValid && hashtag.length === ONLY_HASH_SYMBOL_LENGTH) {
          errorMessage = `Хеш-тег не может состоять только из одной решётки`;
        } else if (isHashTagValid && hashtag.length > HASHTAG_MAX_LENGTH) {
          errorMessage = `Хеш-тег не может быть больше 20 символов`;
        }
      });
    }
    hashtagsInput.setCustomValidity(errorMessage);
    hashtagsInput.reportValidity();
  };

  const addValidation = () => {
    hashtagsInput.addEventListener(`input`, hashtagsInputHandler);
  };

  const removeValidation = () => {
    hashtagsInput.removeEventListener(`input`, hashtagsInputHandler);
  };

  window.uploadValidation = {
    add: addValidation,
    remove: removeValidation,
  };
})();

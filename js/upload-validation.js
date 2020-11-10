'use strict';

(function () {
  const hashtagsInput = document.querySelector(`.text__hashtags`);
  const re = /^#[\w]*$/;
  const comment = document.querySelector(`.text__description`);

  hashtagsInput.addEventListener(`input`, () => {
    const hashtags = hashtagsInput.value.split(` `).map((hashtag) => {
      return hashtag.toLowerCase();
    });
    let errorMessage = hashtags.length > 5 ? `нельзя указать больше пяти хэш-тегов` : ``;
    if (!errorMessage) {
      hashtags.forEach((hashtag, index) => {
        const isHashTagValid = re.test(hashtag);
        if (hashtags.indexOf(hashtag) !== index) {
          errorMessage = `Хеш-теги не должны повторяться`;
          return;
        }
        if (!isHashTagValid) {
          errorMessage = `Хеш-тег начинается с символа # и состоит из букв и цифр`;
        } else if (isHashTagValid && hashtag.length === 1) {
          errorMessage = `Хеш-тег не может состоять только из одной решётки`;
        } else if (isHashTagValid && hashtag.length > 20) {
          errorMessage = `Хеш-тег не может быть больше 20 символов`;
        }
      });
    }
    hashtagsInput.setCustomValidity(errorMessage);
    hashtagsInput.reportValidity();
  });
})();

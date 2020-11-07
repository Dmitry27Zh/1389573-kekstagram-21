'use strict';

(function () {
  const modal = window.modalUpload.element;
  const scaleControlSmaller = modal.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = modal.querySelector(`.scale__control--bigger`);
  const scaleControlValue = modal.querySelector(`.scale__control--value`);
  const scaleMinValue = 25;
  const scaleMaxValue = 100;
  const scaleStep = 25;
  const imageElement = modal.querySelector(`.img-upload__preview img`);
  const effectsControlsContainer = modal.querySelector(`.img-upload__effects`);

  const setScaleValue = (value) => {
    scaleControlValue.value = `${value}%`;
  };

  setScaleValue(scaleMaxValue);

  const setImgScale = (value) => {
    imageElement.style = `transform: scale(${value / 100})`;
  };

  const changeScale = (option) => {
    return () => {
      let currentScale = parseInt(scaleControlValue.value, 10);
      if (currentScale !== scaleMaxValue && option === `increase`) {
        currentScale += scaleStep;
      } else if (currentScale !== scaleMinValue && option === `decrease`) {
        currentScale -= scaleStep;
      } else {
        return;
      }
      setScaleValue(currentScale);
      setImgScale(currentScale);
    };
  };

  const scaleControlSmallerClickHandler = changeScale(`decrease`);
  const scaleControlBiggerClickHandler = changeScale(`increase`);

  scaleControlSmaller.addEventListener(`click`, scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener(`click`, scaleControlBiggerClickHandler);

  const createEffectToogle = () => {
    let currentEffect = null;
    return (effectName) => {
      if (currentEffect) {
        imageElement.classList.remove(`effects__preview--${currentEffect}`);
      }
      if (effectName) {
        imageElement.classList.add(`effects__preview--${effectName}`);
      }
      currentEffect = effectName;
    };
  };

  const changeEffect = createEffectToogle();

  effectsControlsContainer.addEventListener(`change`, function (evt) {
    const effectName = evt.target.value === `none` ? null : evt.target.value;
    changeEffect(effectName);
  });
})();

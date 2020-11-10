'use strict';

(function () {
  const modal = window.modalUpload.element;
  const scaleControlSmaller = modal.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = modal.querySelector(`.scale__control--bigger`);
  const scaleControlValue = modal.querySelector(`.scale__control--value`);
  const ScaleParameters = {
    MIN_VALUE: 25,
    MAX_VALUE: 100,
    STEP: 25,
  };
  const imageElement = modal.querySelector(`.img-upload__preview img`);
  const effectControlsContainer = modal.querySelector(`.img-upload__effects`);
  const effectLevelContainer = modal.querySelector(`.effect-level`);
  const effectValue = effectLevelContainer.querySelector(`.effect-level__value`);
  const effectLine = effectLevelContainer.querySelector(`.effect-level__line`);
  const effectPin = effectLine.querySelector(`.effect-level__pin`);
  const effectDepth = effectLine.querySelector(`.effect-level__depth`);
  const filterStyleValues = {
    chrome: {
      min: 0,
      max: 1,
      template: `grayscale({value})`,
    },
    sepia: {
      min: 0,
      max: 1,
      template: `sepia({value})`,
    },
    marvin: {
      min: 0,
      max: 100,
      template: `invert({value}%)`,
    },
    phobos: {
      min: 0,
      max: 3,
      template: `blur({value}px)`,
    },
    heat: {
      min: 1,
      max: 3,
      template: `brightness({value})`,
    },
  };

  const setScaleValue = (value) => {
    scaleControlValue.value = `${value}%`;
  };

  const setImgScale = (value) => {
    imageElement.style.transform = `scale(${value / 100})`;
  };

  const changeScale = () => {
    let currentScale = ScaleParameters.MAX_VALUE;
    return (evt) => {
      if (currentScale !== ScaleParameters.MAX_VALUE && evt.target.classList.contains(`scale__control--bigger`)) {
        currentScale += ScaleParameters.STEP;
      } else if (currentScale !== ScaleParameters.MIN_VALUE && evt.target.classList.contains(`scale__control--smaller`)) {
        currentScale -= ScaleParameters.STEP;
      } else {
        return;
      }
      setScaleValue(currentScale);
      setImgScale(currentScale);
    };
  };

  const scaleControlClickHandler = changeScale();

  const setEffectLevelControls = (newCoord) => {
    effectPin.style.left = `${newCoord}px`;
    effectDepth.style.width = `${newCoord}px`;
    const perc = newCoord * 100 / effectLine.offsetWidth;
    effectValue.value = perc;
  };

  const getFilterValue = () => {
    const perc = effectValue.value;
    const effectName = effectControlsContainer.querySelector(`input:checked`).value;
    const min = filterStyleValues[effectName].min;
    const max = filterStyleValues[effectName].max;
    const template = filterStyleValues[effectName].template;
    const result = min + ((max - min) / 100 * perc);
    return template.replace(`{value}`, result);
  };

  const setFilterOnImage = () => {
    const newValue = getFilterValue();
    imageElement.style.filter = newValue;
  };

  const removeFilter = () => {
    imageElement.classList = ``;
    imageElement.style.filter = ``;
  };

  const onEffectLevelPinMove = (evt) => {
    const getPinCoord = (moveX) => {
      const minCoord = 0;
      const maxCoord = effectLine.offsetWidth;
      let coordX = effectPin.offsetLeft - moveX;
      if (coordX < minCoord) {
        coordX = minCoord;
      }
      if (coordX > maxCoord) {
        coordX = maxCoord;
      }
      return coordX;
    };

    window.move(evt, (move) => {
      const newCoord = getPinCoord(move.x);
      setEffectLevelControls(newCoord);
      setFilterOnImage();
    });
  };

  const showEffectLevelLine = () => {
    effectLevelContainer.classList.remove(`visually-hidden`);
    setEffectLevelControls(effectLine.offsetWidth);
    effectPin.addEventListener(`mousedown`, onEffectLevelPinMove);
  };

  const closeEffectLevelLine = () => {
    effectLevelContainer.classList.add(`visually-hidden`);
    effectPin.removeEventListener(`mousedown`, onEffectLevelPinMove);
    effectValue.value = 0;
  };

  const effectControlClickHandler = (evt) => {
    const effectName = evt.target.value === `none` ? null : evt.target.value;
    removeFilter();
    if (effectName) {
      imageElement.classList.add(`effects__preview--${effectName}`);
      setEffectLevelControls(effectLine.offsetWidth);
    }
    if (effectName && effectLevelContainer.classList.contains(`visually-hidden`)) {
      showEffectLevelLine();
    } else if (!effectName) {
      closeEffectLevelLine();
    }
  };

  const activatePhotoEdit = () => {
    setScaleValue(ScaleParameters.MAX_VALUE);
    setImgScale(ScaleParameters.MAX_VALUE);
    closeEffectLevelLine();
    scaleControlSmaller.addEventListener(`click`, scaleControlClickHandler);
    scaleControlBigger.addEventListener(`click`, scaleControlClickHandler);
    effectControlsContainer.addEventListener(`change`, effectControlClickHandler);
  };

  const deactivatePhotoEdit = () => {
    removeFilter();
    scaleControlSmaller.removeEventListener(`click`, scaleControlClickHandler);
    scaleControlBigger.removeEventListener(`click`, scaleControlClickHandler);
    effectControlsContainer.removeEventListener(`click`, effectControlClickHandler);
  };

  window.photoEdit = {
    imageElement,
    activate: activatePhotoEdit,
    deactivate: deactivatePhotoEdit,
  };
})();

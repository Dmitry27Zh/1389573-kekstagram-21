'use strict';

(function () {
  const uploadFormElement = window.uploadForm.element;
  const scaleControlSmallerElement = uploadFormElement.querySelector(`.scale__control--smaller`);
  const scaleControlBiggerElement = uploadFormElement.querySelector(`.scale__control--bigger`);
  const scaleControlValueElement = uploadFormElement.querySelector(`.scale__control--value`);
  const ScaleParameters = {
    MIN_VALUE: 25,
    MAX_VALUE: 100,
    STEP: 25,
  };
  const imageElement = uploadFormElement.querySelector(`.img-upload__preview img`);
  const effectControlsContainerElement = uploadFormElement.querySelector(`.img-upload__effects`);
  const effectLevelContainerElement = uploadFormElement.querySelector(`.effect-level`);
  const effectValueElement = effectLevelContainerElement.querySelector(`.effect-level__value`);
  const effectLineElement = effectLevelContainerElement.querySelector(`.effect-level__line`);
  const effectPinElement = effectLineElement.querySelector(`.effect-level__pin`);
  const effectDepthElement = effectLineElement.querySelector(`.effect-level__depth`);
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
    scaleControlValueElement.value = `${value}%`;
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
    effectPinElement.style.left = `${newCoord}px`;
    effectDepthElement.style.width = `${newCoord}px`;
    const perc = newCoord * 100 / effectLineElement.offsetWidth;
    effectValueElement.value = perc;
  };

  const getFilterValue = () => {
    const perc = effectValueElement.value;
    const effectName = effectControlsContainerElement.querySelector(`input:checked`).value;
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
      const maxCoord = effectLineElement.offsetWidth;
      let coordX = effectPinElement.offsetLeft - moveX;
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
    effectLevelContainerElement.classList.remove(`visually-hidden`);
    setEffectLevelControls(effectLineElement.offsetWidth);
    effectPinElement.addEventListener(`mousedown`, onEffectLevelPinMove);
  };

  const closeEffectLevelLine = () => {
    effectLevelContainerElement.classList.add(`visually-hidden`);
    effectPinElement.removeEventListener(`mousedown`, onEffectLevelPinMove);
    effectValueElement.value = 0;
  };

  const changeEffect = (effectName) => {
    if (effectName) {
      imageElement.classList.add(`effects__preview--${effectName}`);
      setEffectLevelControls(effectLineElement.offsetWidth);
    }
  };

  const effectControlClickHandler = (evt) => {
    const effectName = evt.target.value === `none` ? null : evt.target.value;
    removeFilter();
    changeEffect(effectName);
    if (effectName && effectLevelContainerElement.classList.contains(`visually-hidden`)) {
      showEffectLevelLine();
    } else if (!effectName) {
      closeEffectLevelLine();
    }
  };

  const activatePhotoEdit = () => {
    setScaleValue(ScaleParameters.MAX_VALUE);
    setImgScale(ScaleParameters.MAX_VALUE);
    closeEffectLevelLine();
    scaleControlSmallerElement.addEventListener(`click`, scaleControlClickHandler);
    scaleControlBiggerElement.addEventListener(`click`, scaleControlClickHandler);
    effectControlsContainerElement.addEventListener(`change`, effectControlClickHandler);
  };

  const deactivatePhotoEdit = () => {
    removeFilter();
    scaleControlSmallerElement.removeEventListener(`click`, scaleControlClickHandler);
    scaleControlBiggerElement.removeEventListener(`click`, scaleControlClickHandler);
    effectControlsContainerElement.removeEventListener(`click`, effectControlClickHandler);
  };

  window.photoEdit = {
    imageElement,
    activate: activatePhotoEdit,
    deactivate: deactivatePhotoEdit,
  };
})();

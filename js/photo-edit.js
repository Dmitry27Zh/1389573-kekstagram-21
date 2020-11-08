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
  const effectLevelContainer = modal.querySelector(`.effect-level`);
  const effectLevelValue = effectLevelContainer.querySelector(`.effect-level__value`);
  const effectLevelLine = effectLevelContainer.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);
  const effectLevelDepth = effectLevelLine.querySelector(`.effect-level__depth`);

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

  effectsControlsContainer.addEventListener(`change`, (evt) => {
    const effectName = evt.target.value === `none` ? null : evt.target.value;
    if (effectName) {
      effectLevelContainer.classList.remove(`visually-hidden`);
    } else {
      effectLevelContainer.classList.add(`visually-hidden`);
    }
    changeEffect(effectName);
  });

  const getPinCoord = (moveX) => {
    const minCoord = 0;
    const maxCoord = effectLevelLine.offsetWidth;
    let coordX = effectLevelPin.offsetLeft - moveX;
    if (coordX < minCoord) {
      coordX = minCoord;
    }
    if (coordX > maxCoord) {
      coordX = maxCoord;
    }
    return coordX;
  };

  const setEffect = (newCoord) => {
    const value = newCoord * 100 / effectLevelLine.offsetWidth;
    const effectName = effectsControlsContainer.querySelector(`input:checked`).value;
    let filter = ``;
    switch (effectName) {
      case `chrome`:
        filter = `grayscale(${value / 100})`;
        break;
      case `sepia`:
        filter = `sepia(${value / 100})`;
        break;
      case `marvin`:
        filter = `invert(${value}%)`;
        break;
      case `phobos`:
        filter = `blur(${3 * value / 100}px)`;
        break;
      case `heat`:
        filter = `brightness(${1 + 2 * value / 100})`;
    }
    imageElement.style.filter = filter;
  };

  effectLevelContainer.classList.add(`visually-hidden`);
  effectLevelPin.addEventListener(`mousedown`, (evt) => {
    window.move(evt, (move) => {
      const newCoord = getPinCoord(move.x);
      effectLevelPin.style.left = `${newCoord}px`;
      effectLevelDepth.style.width = `${newCoord}px`;
      effectLevelValue.value = newCoord;
      setEffect(newCoord);
    });
  });


})();

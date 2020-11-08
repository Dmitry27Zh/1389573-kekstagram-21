'use strict';

(function () {
  window.move = (evt, action) => {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    const onMouseMove = (moveEvt) => {
      const move = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      action(move);
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };
    };
    const onMouseUp = () => {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };
})();

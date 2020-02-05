'use strict';

(function () {
  var WIND_SPEED = 5;
  var AGAINST_WIND_SPEED = 2;
  var WIZARD_HEIGHT_WIDTH_RATIO = 1.337;

  // размер фаербола в пикселях
  window.fireballSize = 22;

  // Скорость фаербола по ветру или против ветра.
  window.getFireballSpeed = function (left) {
    return left ? WIND_SPEED : AGAINST_WIND_SPEED;
  };

  // Скорость и ширина мага
  window.wizardSpeed = 3;
  window.wizardWidth = 70;

  // возвращает пропорциональную высоту мага от его ширины
  window.getWizardHeight = function () {
    return WIZARD_HEIGHT_WIDTH_RATIO * window.wizardWidth;
  };

  // возвращает горизонтальную позицию мага по середине поля
  window.getWizardX = function (width) {
    return width / 2;
  };

  // Возвращает высоту на которой появляется маг относительно высоты игрового поля от земли.
  window.getWizardY = function (height) {
    return height / 3;
  };
})();

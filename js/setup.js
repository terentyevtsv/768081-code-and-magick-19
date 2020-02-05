'use strict';

(function () {
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var COAT_COLORS = window.wizardsGenerator.COAT_COLORS;
  var EYES_COLORS = window.wizardsGenerator.EYES_COLORS;

  // Диалог, который должен показаться при нажатии на setupOpen
  var userDialog = document.querySelector('.setup');
  var userDialogPosition = {};

  // Скрытые поля для обновления значений передаваемых на сервер для
  // мантии и цвета глаз
  var coatEyesInputColors = userDialog.querySelectorAll('.setup-wizard-appearance input');


  // Мантия волшебника
  var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');

  // Обработчик события клика по мантии волшебника
  var onWizardCoatClick = function () {
    var coatColor = COAT_COLORS[window.utils.getRandomInteger(0, COAT_COLORS.length - 1)];
    wizardCoat.style.fill = coatColor;

    coatEyesInputColors[0].value = coatColor;
  };

  // Глаза волшебника
  var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');

  var onWizardEyesClick = function () {
    var eyesColor = EYES_COLORS[window.utils.getRandomInteger(0, EYES_COLORS.length - 1)];
    wizardEyes.style.fill = eyesColor;

    coatEyesInputColors[1].value = eyesColor;
  };

  // Файрбол волшебника
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

  var fireballInputColor = wizardFireball.querySelector('input');

  var onWizardFireballClick = function () {
    var fireballColor =
      FIREBALL_COLORS[window.utils.getRandomInteger(0, FIREBALL_COLORS.length - 1)];
    wizardFireball.style.background = fireballColor;

    fireballInputColor.value = fireballColor;
  };

  // Кнопка закрытия диалога
  var setupClose = userDialog.querySelector('.setup-close');

  var showDialog = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onDialogEscPress);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);
    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireball.addEventListener('click', onWizardFireballClick);

    userDialogPosition.top = userDialog.offsetTop;
    userDialogPosition.left = userDialog.offsetLeft;
  };

  var closeDialog = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
    setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
    wizardCoat.removeEventListener('click', onWizardCoatClick);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardFireball.removeEventListener('click', onWizardFireballClick);

    userDialog.style.top = userDialogPosition.top + 'px';
    userDialog.style.left = userDialogPosition.left + 'px';
  };

  var onSetupCloseEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, closeDialog);
  };

  var onDialogEscPress = function (evt) {
    window.utils.isEscEvent(evt, function () {
      if (!evt.target.matches('.setup-user-name')) {
        closeDialog();
      }
    });
  };

  // Элемент по которому нужно нажать для открытия настроек
  var setupOpen = document.querySelector('.setup-open');

  // По нажатию на иконку в главном окне появляется окно настройки
  setupOpen.addEventListener('click', function () {
    showDialog();
  });

  // По нажатию клавиши ВВОД при активной иконке показывается окно настройки
  setupOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, showDialog);
  });

  // По нажатию крестика закрывается окно настройки
  setupClose.addEventListener('click', function () {
    closeDialog();
  });

  window.wizardsGenerator.renderWizards();
  document.querySelector('.setup-similar').classList.remove('hidden');
})();

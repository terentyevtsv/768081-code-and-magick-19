'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_COUNT = 4;

var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';

// Указатель на разметку внутри шаблона
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// Контейнер, в который добавляются разметки случайных волшебников
var wizardListContainer = document.querySelector('.setup-similar-list');

// Функция возвращает случайный целый элемент в выбранном диапазоне значений
var getRandomInteger = function (min, max) {
  // случайное число от min до (max+1)
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Отрисовывает волшебников во фрагменте документа.
// После этого добавляет их в контейнер на страницу
var renderWizards = function () {
  var wizards = generateRandomWizards();
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; ++i) {
    var wizardInstance = renderWizard(wizards[i]);
    documentFragment.appendChild(wizardInstance);
  }

  wizardListContainer.appendChild(documentFragment);
};

// Генерирует массив объектов волшебников с параметрами сгенерированными
// случайно из массивов
var generateRandomWizards = function () {
  var wizards = [];

  // Массив из WIZARD_COUNT элементов
  for (var i = 0; i < WIZARD_COUNT; ++i) {
    // Полное имя формируется конкатенацией случайного имени и фамилии
    var fullName =
      WIZARD_NAMES[getRandomInteger(0, WIZARD_NAMES.length - 1)] +
      ' ' +
      WIZARD_SURNAMES[getRandomInteger(0, WIZARD_SURNAMES.length - 1)];

    // Заполняем очередной объект волшебника
    var wizard = {
      name: fullName,
      coatColor: COAT_COLORS[getRandomInteger(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandomInteger(0, EYES_COLORS.length - 1)]
    };

    // Добавляем его в массив
    wizards[i] = wizard;
  }

  // Массив возвращается из функции
  return wizards;
};

// создает элемент волшебника для DOM
var renderWizard = function (wizard) {
  var wizardInstance = similarWizardTemplate.cloneNode(true);

  wizardInstance.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardInstance.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardInstance.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardInstance;
};

// Диалог, который должен показаться при нажатии на setupOpen
var userDialog = document.querySelector('.setup');

// Кнопка закрытия диалога
var setupClose = userDialog.querySelector('.setup-close');

// Элемент по которому нужно нажать для открытия настроек
var setupOpen = document.querySelector('.setup-open');

// По нажатию на иконку в главном окне появляется окно настройки
setupOpen.addEventListener('click', function () {
  showDialog();
});

// По нажатию клавиши ВВОД при активной иконке показывается окно настройки
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    showDialog();
  }
});

var showDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
};

var onDialogEscPress = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    closeDialog();
  }
};

// По нажатию крестика закрывается окно настройки
setupClose.addEventListener('click', function () {
  closeDialog();
});

var closeDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onDialogEscPress);
};

renderWizards();


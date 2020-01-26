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

// Указатель на разметку внутри шаблона
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// Контейнер, в который добавляются разметки случайных волшебников
var wizardListContainer = document.querySelector('.setup-similar-list');

// Показывает диалог настройки волшебника
var showUserDialog = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
};

// Функция возвращает случайный целый элемент в выбранном диапазоне значений
var getRandomInteger = function (min, max) {
  // случайное число от min до (max+1)
  var randomValue = min + Math.random() * (max + 1 - min);
  return Math.floor(randomValue);
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

showUserDialog();
renderWizards();
document.querySelector('.setup-similar').classList.remove('hidden');

'use strict';

// Модуль хранит самые общие широкоупотребимые функции.
// Они могут использоваться во многих программах.
(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';

  window.utils = {
    getMaxItem: function (items) {
      // Функция возвращает максимальное значение из значений в массиве items
      // Пусть максимальным будет первый элемент
      var maxItem = items[0];

      // Поиск максимального значения среди остальных элементов массива
      for (var i = 1; i < items.length; ++i) {
        if (items[i] > maxItem) {
          maxItem = items[i];
        }
      }

      return maxItem;
    },

    getRandomValue: function (min, max) {
      // Функция возвращает случайное вещественное значение
      // в интервале от min до max
      return min + Math.random() * (max - min);
    },

    getRandomInteger: function (min, max) {
      // Функция возвращает случайное целое число в выбранном диапазоне значений

      // случайное число от min до (max+1)
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    isEscEvent: function (evt, action) {
      // Анализ нажатия клавиши esc
      if (evt.key === ESCAPE_KEY) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      // Анализ нажатия клавиши enter
      if (evt.key === ENTER_KEY) {
        action();
      }
    }
  };
})();

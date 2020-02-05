'use strict';

// Модуль содержит функции для формирования облака с диаграммой
(function () {
  // Координаты облака
  var CLOUD_X = 100;
  var CLOUD_Y = 10;

  // Размер облака в пикселях
  var HEIGHT = 270;
  var WIDTH = 420;

  var DELTA_X = 100;

  // Расстояние от границы облака до текста
  var TOP_CLOUD_DISTANCE = 5;

  // Отступ для написания второй строчки сообщения
  var TEXT_DISTANCE = 15;

  // Смещение тени облака
  var CLOUD_SHADOWS_OFFSET = 10;

  // Шрифт и размер шрифта
  var FONT_OPTIONS = '16px PT Mono';

  var DIAGRAM_HEIGHT = 150; // Высота диаграммы
  var COLUMN_WIDTH = 40; // Ширина столбцов диаграммы
  var COLUMN_DISTANCE = 50; // Расстояние между столбцами

  // Цвет облака
  var CLOUD_COLOR = '#FFFFFF';
  var CLOUD_SHADOWS_COLOR = 'rgba(0, 0, 0, 0.7)';

  var TOP_LABEL_LUFT = 40;

  var OWN_PLAYER_NAME = 'Вы';
  var OWN_PLAYERS_DIAGRAM_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

  // Функция рисующая облако. Кроме контекста
  // принимает координаты верхнего левого угла облака и
  // цвет заливки
  var drawCloud = function (ctx, x, y, cloudColor) {
    // Устанавливаем цвет заливки
    ctx.fillStyle = cloudColor;

    // Рисуем параллелограмм
    ctx.beginPath();

    // Построение начинаем с верхнего левого угла фигуры
    ctx.moveTo(x, y);

    // Рисуем по часовой стрелке
    ctx.lineTo(x + WIDTH, y);
    ctx.lineTo(x + WIDTH + DELTA_X, y + HEIGHT);
    ctx.lineTo(x + DELTA_X, y + HEIGHT);
    ctx.lineTo(x, y);

    // Параллелограмм нарисован
    ctx.closePath();

    // Граница и закраска
    ctx.stroke();
    ctx.fill();
  };

  var writeText = function (ctx, topX, topY, text) {
    // Настройка шрифта, цвета и базовой линии текста
    ctx.font = FONT_OPTIONS;
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = 'black';

    ctx.fillText(text, topX, topY);
  };

  // Рисование одного блока диаграммы
  var drawBlock = function (x, y, time, name, maxTime, ctx, fillColor) {
    // Высота текущего блока в пикселях
    var blockHeight = DIAGRAM_HEIGHT * time / maxTime;

    // Расстояние от вершины диаграммы до верхней части текущего блока
    var topDistance = y + (DIAGRAM_HEIGHT - blockHeight) + TOP_LABEL_LUFT;

    // Полный вертикальный размер столбца
    var maxDistance = y + DIAGRAM_HEIGHT + TEXT_DISTANCE + TOP_LABEL_LUFT;

    // Отрисовка текущего столбца
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, topDistance, COLUMN_WIDTH, blockHeight);

    // Отрисовка подписи столбца (Время игры и имя игрока)
    ctx.fillText(time.toString(), x, topDistance - TEXT_DISTANCE);
    ctx.fillText(name, x, maxDistance);
  };

  var drawDiagram = function (times, names, startX, topY, ctx) {
    // Ищем максимальное время среди времен игры
    var maxTime = window.utils.getMaxItem(times);

    // Рисование диаграммы

    // Текущая абсцисса равна стартовой
    var currentX = startX;

    // В цикле отрисовываем столбцы для всех результатов игр
    for (var i = 0; i < times.length; ++i) {
      var currentColor = OWN_PLAYERS_DIAGRAM_COLUMN_COLOR;
      if (names[i] !== OWN_PLAYER_NAME) {
        currentColor = 'hsl(240, ' + window.utils.getRandomValue(0, 100) + '%, 50%)';
      }

      drawBlock(currentX, topY, Math.round(times[i]), names[i], maxTime, ctx, currentColor);

      // Рассчитываем абциссу для следующего столбца
      currentX += (COLUMN_WIDTH + COLUMN_DISTANCE);
    }
  };

  // Отрисовывает облако со статистикой игры
  // На вход подается контекст канваса и массивы
  // имен и их временные значения результатов игры
  window.renderStatistics = function (ctx, names, times) {
    // Отрисовка облака с тенью
    drawCloud(
        ctx,
        CLOUD_X + CLOUD_SHADOWS_OFFSET,
        CLOUD_Y + CLOUD_SHADOWS_OFFSET,
        CLOUD_SHADOWS_COLOR
    );
    drawCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

    // Расположение текста сообщения после победы
    var textX = CLOUD_X + DELTA_X;
    var textY = CLOUD_Y + TOP_CLOUD_DISTANCE;
    writeText(ctx, textX, textY, 'Ура вы победили!');

    // Отступ для второй строки
    textY += TEXT_DISTANCE;
    writeText(ctx, textX, textY, 'Список результатов:');

    // Отрисовка диаграммы
    drawDiagram(times, names, textX, textY + TEXT_DISTANCE, ctx);
  };
})();

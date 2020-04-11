"use strict";

var field_W = 300,
    field_H = 600;
var cols = 10,
    rows = 20;
var block_W = field_W / cols,
    block_H = field_H / rows;
var gameOver = rows - 2;
var canvas = document.getElementById('field');
var ctx = canvas.getContext('2d');
var current_x = 3,
    current_y = -1;
var current_mino = newMino();
var field = [];
var audioElem = new Audio();
audioElem.src = "tetris.mp3";
var counter = 0;
var speedLevel = 1;

var PlaySound = function PlaySound(music) {
  music.play();
};

var StopSound = function StopSound(music) {
  music.pause();
};

var deleteAll = function deleteAll() {
  for (var y = 0; y < rows; y++) {
    field[y] = [];

    for (var x = 0; x < cols; x++) {
      field[y][x] = 0;
    }
  }
};

var render = function render() {
  ctx.clearRect(0, 0, field_W, field_H);
  ctx.strokeStyle = "black";

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      drawBlock(x, y, field[y][x]);
    }
  }

  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      drawBlock(current_x + x, current_y + y, current_mino[y][x]);
    }
  }
};

var drawBlock = function drawBlock(x, y, block) {
  if (block) {
    ctx.fillStyle = colors[block - 1];
    ctx.fillRect(x * block_W, y * block_H, block_W - 1, block_H - 1);
    ctx.strokeRect(x * block_W, y * block_H, block_W - 1, block_H - 1);
  }
};

var clearRows = function clearRows() {
  for (var y = rows - 1; y >= 0; y--) {
    var fill = true;

    for (var x = 0; x < cols; x++) {
      if (field[y][x] == 0) {
        fill = false;
        break;
      }
    }

    if (fill) {
      countUp();
      levelUp();

      for (var v = y - 1; v >= 0; v--) {
        for (var x = 0; x < cols; x++) {
          field[v + 1][x] = field[v][x];
        }
      }

      y++;
    }
  }
};

var tick = function tick() {
  if (canMove(0, 1)) {
    current_y++;
  } else {
    fix();
    clearRows();
    var next_mino = newMino();

    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 4; x++) {
        current_mino[y][x] = next_mino[y][x];
      }
    }

    if (current_y <= -1) {
      return current_y;
    }

    current_x = 3;
    current_y = -1;
  }

  render();
};

var fix = function fix() {
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      if (current_mino[y][x]) {
        field[current_y + y][current_x + x] = current_mino[y][x];
      }
    }
  }
};

var canMove = function canMove(move_x, move_y, move_mino) {
  var next_x = current_x + move_x;
  var next_y = current_y + move_y;
  var next_mino = move_mino || current_mino;

  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      if (next_mino[y][x]) {
        if (next_y + y >= rows || next_x + x < 0 || next_x + x >= cols || field[next_y + y][next_x + x]) {
          return false;
        }
      }
    }
  }

  return true;
};

var arrowBtn = function arrowBtn() {
  document.body.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        if (canMove(-1, 0)) {
          current_x--;
        }

        break;

      case 39:
        if (canMove(1, 0)) {
          current_x++;
        }

        break;

      case 40:
        if (canMove(0, 1)) {
          current_y++;
        }

        break;

      case 38:
        var rotated = rotate(current_mino);

        if (canMove(0, 0, rotated)) {
          for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 4; x++) {
              current_mino[y][x] = rotated[y][x];
            }
          }
        }

        break;
    }

    render();
  };
};

var countUp = function countUp() {
  counter++;
  var CountText = document.getElementById("js_set_count");
  CountText.innerText = counter;
};

var levelUp = function levelUp() {
  speedLevel = Math.floor(1 + counter / 1);
  console.log(speedLevel);
};

var canTouchBtn = function canTouchBtn() {
  $(".btn").addClass("start");
};

var speed = function speed(Level) {
  var num = 500 / Level;
  return num;
};

var gameStart = function gameStart() {
  var over = setInterval(function () {
    if (tick() <= -1) {
      clearInterval(over);
      StopSound(audioElem);
      deleteAll();
      canTouchBtn();
    } else {
      arrowBtn();
    }

    tick;
  }, speed(speedLevel));
};

$(".btn").click(function () {
  if ($(".btn").hasClass("start")) {
    deleteAll();
    render();
    gameStart();
    PlaySound(audioElem);
    $(".btn").removeClass("start");
  }

  ;
});
"use strict";

var field_W = 300,
    field_H = 600;
var cols = 10,
    rows = 20;
var block_W = field_W / cols,
    block_H = field_H / rows;
var canvas = document.getElementById('field');
var ctx = canvas.getContext('2d');
var current_x = 3,
    current_y = 0;
var current_mino = newMino();
var field = [];
ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, block_W, block_H);

for (var y = 0; y < rows; y++) {
  field[y] = [];

  for (var x = 0; x < cols; x++) {
    field[y][x] = 0;
  }
}

var render = function render() {
  ctx.clearRect(0, 0, field_W, field_H);
  ctx.strokeStyle = "black";

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      drawBlock(x, y, field[y][x]);
    }
  }

  for (var y = 0; y < 2; y++) {
    for (var x = 0; x < 4; x++) {
      drawBlock(current_x + x, current_y + y, current_mino[y][x]);
    }
  }
};

var drawBlock = function drawBlock(x, y, block) {
  if (block) {
    ctx.strokeRect(x * block_W, y * block_H, block_W - 1, block_H - 1);
  }
};

var tick = function tick() {
  if (canMove()) {
    current_y++;
  } else {
    fix();
    var next_mino = newMino();

    for (var y = 0; y < 2; y++) {
      for (var x = 0; x < 4; x++) {
        current_mino[y][x] = next_mino[y][x];
      }
    }

    current_x = 3;
    current_y = 0;
  }

  render();
};

var fix = function fix() {
  for (var y = 0; y < 2; y++) {
    for (var x = 0; x < 4; x++) {
      if (current_mino[y][x]) {
        field[current_y + y][current_x + x] = current_mino[y][x];
      }
    }
  }
};

var canMove = function canMove() {
  var next_x = current_x;
  var next_y = current_y + 1;

  for (var y = 0; y < 2; y++) {
    for (var x = 0; x < 4; x++) {
      if (current_mino[y][x]) {
        if (next_y + y >= rows || field[next_y + y][next_x + x]) {
          return false;
        }
      }
    }
  }

  return true;
};

render();
setInterval(tick, 500);
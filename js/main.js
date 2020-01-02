"use strict";

var field_W = 300,
    field_H = 600;
var cols = 10,
    rows = 20;
var block_W = field_W / cols,
    block_H = field_H / rows;
var canvas = document.getElementById('field');
var ctx = canvas.getContext('2d');
var current_x = 0,
    current_y = 0;
ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, block_W, block_H);

var render = function render() {
  ctx.clearRect(0, 0, field_W, field_H);
  ctx.strokeStyle = "black";

  for (var i = 0; i < cols; i++) {
    ctx.strokeRect(i * block_W, current_y * block_H, block_W - 1, block_H - 1);
  }
};

var tick = function tick() {
  current_y++;
  render();
};

render();
setInterval(tick, 500);
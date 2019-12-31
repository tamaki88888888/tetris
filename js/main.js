"use strict";

var array = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var move = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var draw = function draw() {
  $('#game').find('tr').each(function (i, elemTr) {
    // trタグそれぞれに対する処理
    $(elemTr).children().each(function (j, elemTd) {
      // tdタグそれぞれに対する処理
      $(elemTd).removeClass(); // まずはクラスをすべてなしにする

      switch (array[i][j]) {
        case 1:
          $(elemTd).addClass("stick"); // 1の時にはstickクラスを割り振る

          break;

        default:
          $(elemTd).addClass("default");
        // それ以外の時にはdefaultクラスを割り振る
      }
    });
  });
};

var fall = function fall() {
  var under = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 下の行にブロックがあるかどうかを保持する配列

  for (var i = 19; i >= 0; i--) {
    for (var j = 0; j < 10; j++) {
      if (under[j] == 0) {
        if (array[i][j] == 0) {
          // 下に何もなくそのマスがブロックでもないとき
          under[j] = 0;
        } else {
          // 下に何もなくそのマスがブロックであるとき
          array[i + 1][j] = array[i][j];
          array[i][j] = 0;

          if (move[i][j] == 1) {
            move[i][j] = 0;
            move[i + 1][j] = 1;
          }

          under[j] = 0;
        }
      } else {
        if (array[i][j] == 0) {
          // 下がブロックでそのマスがブロックでないとき
          under[j] = 0;
        } else {
          if (move[i][j] == 1) {
            resetMove();
          } // 下がブロックでそのマスがブロックのとき


          under[j] = 1;
        }
      }
    }
  }
};

var moveBlockRight = function moveBlockRight() {
  for (var i = 19; i >= 0; i--) {
    var newMove = move[i].concat();

    for (var j = 8; j >= 0; j--) {
      if (move[i][j] == 1) {
        array[i][j + 1] = array[i][j];
        array[i][j] = 0;
        newMove[j + 1] = 1;
        newMove[j] = 0;
      }
    }

    move[i] = newMove;
  }
};

var moveBlockLeft = function moveBlockLeft() {
  for (var i = 19; i >= 0; i--) {
    var newMove = move[i].concat();

    for (var j = 1; j < 10; j++) {
      if (move[i][j] == 1) {
        array[i][j - 1] = array[i][j];
        array[i][j] = 0;
        newMove[j - 1] = 1;
        newMove[j] = 0;
      }
    }

    move[i] = newMove;
  }
};

document.onkeydown = function (e) {
  switch (e.code) {
    case "Space":
      tetBlock(1);
      break;

    case "ArrowRight":
      moveBlockRight();
      draw();
      break;

    case "ArrowLeft":
      moveBlockLeft();
      draw();
      break;
  }
};

var moveFlag = 0; // 動かす対象があるかどうか(0はない、1はあることを示す)

var tetBlock = function tetBlock(blockNum) {
  if (moveFlag == 0) {
    switch (blockNum) {
      case 1:
        array[0][5] = blockNum;
        array[1][5] = blockNum;
        array[2][5] = blockNum;
        array[3][5] = blockNum;
        move[0][5] = 1;
        move[1][5] = 1;
        move[2][5] = 1;
        move[3][5] = 1;
        break;
    }

    moveFlag = 1;
  }
};

var resetMove = function resetMove() {
  moveFlag = 0;

  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 10; j++) {
      move[i][j] = 0;
    }
  }
};

var checkDelete = function checkDelete() {
  for (var i = 19; i >= 0; i--) {
    if (!array[i].includes(0)) {
      for (var j = 0; j < 10; j++) {
        array[i][j] = 0;
      }
    }
  }
};

draw(); // 読込が完了したらまず表示

setInterval(function () {
  checkDelete();
  fall();
  draw();
}, 500); // 0.5秒ごとに表示を更新していきます
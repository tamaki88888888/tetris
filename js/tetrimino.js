// this shape like we used to see on The Tetris game , we call it "Tetriminos"

const MINOS = [
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0] // I テトリミノ
  ],
  [
    [0, 1, 1, 0],
    [0, 1, 1, 0] // O テトリミノ
  ],
  [
    [0, 1, 1, 0],
    [1, 1, 0, 0] // S テトリミノ
  ],
  [
    [1, 1, 0, 0],
    [0, 1, 1, 0] // Z テトリミノ
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 1, 0] // J テトリミノ
  ],
  [
    [0, 0, 1, 0],
    [1, 1, 1, 0] // L テトリミノ
  ],
  [
    [0, 1, 0, 0],
    [1, 1, 1, 0] // T テトリミノ
  ]
];

const newMino = ()=>{
	const id = Math.floor(Math.random() * MINOS.length);
	const mino = MINOS[id];
	return mino;
}

import { Tetris } from "./tetris.js";
import {
  PLAYFIELD_COLUMNS,
  PLAYFIELD_ROWS,
  convertPositionToIndex,
} from "./utilities.js";

const tetris = new Tetris();
const cells = document.querySelectorAll(".grid div");
const count = document.querySelector(".counter");

initKeyDown();

function initKeyDown() {
  document.addEventListener("keydown", onKeyDown);
}

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowDown":
      tetris.moveTetraminoDown();
      drow();
      break;
    case "ArrowRight":
      tetris.moveTetraminoRight();
      drow();
      break;
    case "ArrowLeft":
      tetris.moveTetraminoLefth();
      drow();
      break;
    case "ArrowUp":
      tetris.getRotateMatrix();
      drow();
      break;
    default:
      break;
  }
}

drow();

function drow() {
  cells.forEach((cell) => cell.removeAttribute("class"));
  count.innerHTML = tetris.counter;
  drowPlayField();
  drowTetromino();
}
function drowPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (!tetris.playfield[row][column]) continue;
      const name = tetris.playfield[row][column];
      const index = convertPositionToIndex(row, column);
      cells[index].classList.add(name);
    }
  }
}
function drowTetromino() {
  const name = tetris.tetromino.name;
  const tetrominoMatrixSize = tetris.tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetris.tetromino.matrix[row][column]) continue;
      if (tetris.tetromino.row + row < 0) continue;
      const cellIndex = convertPositionToIndex(
        tetris.tetromino.row + row,
        tetris.tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

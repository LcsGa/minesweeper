import { Cell } from "./Cell.js";

const bombsLeft = document.querySelector("#bombs-left");

export class Bombs {
  constructor(numberOfBombs, grid) {
    this.numberOfBombs = numberOfBombs;
    this.initBombsLeftHTML();
    this.bombsCoordinates = this.setBombsCoordinates(grid);
    this.initBombsObj(grid);
  }

  initBombsLeftHTML() {
    bombsLeft.innerHTML = this.numberOfBombs;
  }

  setBombsCoordinates(grid) {
    const bombsCoordinates = [];
    const bombPosition = {};

    for (let i = 0; i < this.numberOfBombs; i++) {
      do {
        bombPosition.line = Math.floor(Math.random() * grid.length);
        bombPosition.column = Math.floor(Math.random() * grid[0].length);
      } while (
        bombsCoordinates.includes(
          `L${bombPosition.line}C${bombPosition.column}`
        )
      );
      bombsCoordinates.push(`L${bombPosition.line}C${bombPosition.column}`);
    }

    console.log(bombsCoordinates);
    return bombsCoordinates;
  }

  initBombsObj(grid) {
    grid.forEach((line, lineIndex) => {
      line.forEach((cell, columnIndex) => {
        cell.hasBomb = this.bombsCoordinates.includes(
          `L${lineIndex}C${columnIndex}`
        )
          ? true
          : false;
      });
    });
  }

  static displayBomb(gameGrid, cellClicked) {
    const cell =
      gameGrid[Cell.cellIndex(cellClicked.id).line][
        Cell.cellIndex(cellClicked.id).column
      ];

    if (cell.hasBomb) {
      cellClicked.classList.add("has-bomb");
      cellClicked.innerHTML = `<i class="fas fa-bomb"></i>`;
    }
  }
}

import { Cell } from "./Cell.js";

const gridHTML = document.querySelector("#grid");

export class Grid {
  constructor(numberOfLines, numberOfColumns) {
    this.grid = [];
    this.initGrid(numberOfLines, numberOfColumns);
  }

  initGrid(numberOfLines, numberOfColumns) {
    this.initGridObject(numberOfLines, numberOfColumns);
    this.initGridHTML();
  }

  initGridObject(numberOfLines, numberOfColumns) {
    for (let line = 0; line < numberOfLines; line++) {
      this.grid.push([]);
      for (let column = 0; column < numberOfColumns; column++) {
        this.grid[line].push(new Cell(true, false, false, 0));
      }
    }
  }

  initGridHTML() {
    for (const lineIndex of this.grid.keys()) {
      for (const columnIndex of this.grid[lineIndex].keys()) {
        gridHTML.insertAdjacentHTML(
          "beforeend",
          Cell.cellHTML(lineIndex, columnIndex)
        );
      }
    }
  }
}

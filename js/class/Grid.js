import { Bombs } from "./Bombs.js";
import { Cell } from "./Cell.js";

const gridHTML = document.querySelector("#grid");

export class Grid {
  constructor(numberOfLines, numberOfColumns) {
    this.grid = [];
    this.initGrid(numberOfLines, numberOfColumns);
  }

  initGrid(numberOfLines, numberOfColumns) {
    gridHTML.innerHTML = "";
    this.initGridObject(numberOfLines, numberOfColumns);
    this.initGridHTML(numberOfColumns);
    this.initGridTempalte(numberOfLines, numberOfColumns);
  }

  initGridObject(numberOfLines, numberOfColumns) {
    for (let line = 0; line < numberOfLines; line++) {
      this.grid.push([]);
      for (let column = 0; column < numberOfColumns; column++) {
        this.grid[line].push(new Cell(false, false, false, 0));
      }
    }
  }

  initGridHTML(numberOfColumns) {
    for (const lineIndex of this.grid.keys()) {
      for (const columnIndex of this.grid[lineIndex].keys()) {
        gridHTML.insertAdjacentHTML(
          "beforeend",
          Cell.cellHTML(lineIndex, columnIndex, numberOfColumns)
        );
      }
    }
  }

  initGridTempalte(numberOfLines, numberOfColumns) {
    gridHTML.style.gridTemplate = `repeat(${numberOfLines},1fr) / repeat(${numberOfColumns},1fr)`;
  }
}

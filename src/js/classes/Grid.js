import { Cell } from "./Cell.js";
import { main } from "../main.js";

export const gridHTML = document.querySelector("#grid");

export class Grid {
  constructor(numberOfLines, numberOfColumns) {
    this.grid = [];
    this.nbOfCellsVisible = 0;
    this.initGridObject(numberOfLines, numberOfColumns);
    this.initGridHTML(numberOfLines, numberOfColumns);
    this.initGridTemplate(numberOfLines, numberOfColumns);
  }

  initGridObject(numberOfLines, numberOfColumns) {
    for (let line = 0; line < numberOfLines; line++) {
      this.grid.push([]);
      for (let column = 0; column < numberOfColumns; column++) {
        this.grid[line].push(
          new Cell(false, false, false, `L${line}C${column}`)
        );
      }
    }
  }

  initGridHTML(numberOfLines, numberOfColumns) {
    gridHTML.innerHTML = "";
    for (const lineIndex of this.grid.keys()) {
      for (const columnIndex of this.grid[lineIndex].keys()) {
        gridHTML.insertAdjacentHTML(
          "beforeend",
          Cell.cellHTML(lineIndex, columnIndex, numberOfLines, numberOfColumns)
        );
      }
    }
  }

  initGridTemplate(numberOfLines, numberOfColumns) {
    if (main.clientWidth >= main.clientHeight) {
      gridHTML.style.height = "calc(90vh - 51px)";
      gridHTML.style.width = "";
    } else {
      gridHTML.style.height = "";
      gridHTML.style.width = "90%";
    }

    gridHTML.style.gridTemplate = `repeat(${numberOfLines},1fr) / repeat(${numberOfColumns},1fr)`;
  }

  static cells() {
    return document.querySelectorAll(".cell");
  }
}

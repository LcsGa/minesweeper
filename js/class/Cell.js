import { Bombs } from "./Bombs.js";

export class Cell {
  constructor(isOpened, hasBomb, hasFlag, nbOfBombsTouched) {
    this.isOpened = isOpened;
    this.hasBomb = hasBomb;
    this.hasFlag = hasFlag;
    this.nbOfBombsTouched = nbOfBombsTouched;
  }

  static cellHTML(lineIndex, columnIndex, numberOfColumns) {
    return `<div id="L${lineIndex}C${columnIndex}" class="cell" style="${this.cellTemplate(
      numberOfColumns
    )}"></div>`;
  }

  static cellTemplate(numberOfColumns) {
    const gridWidth = document.querySelector("#grid").clientWidth;

    const sideLength = `calc(calc(${gridWidth}px - calc(1px * ${
      numberOfColumns - 1
    })) / ${numberOfColumns})`;

    const fontSize =
      Math.round((gridWidth - numberOfColumns - 1) / (2 * numberOfColumns)) +
      "px";

    return `height:${sideLength};width:${sideLength};font-size:${fontSize}`;
  }

  static cellIndex(id) {
    switch (id.length) {
      case 4: {
        return {
          line: id[1],
          column: id[3],
        };
      }
      case 5: {
        if (/\w\d{2}\w\d/.test(id)) {
          return {
            line: +(id[1] + id[2]),
            column: id[4],
          };
        } else {
          return {
            line: id[1],
            column: +(id[3] + id[4]),
          };
        }
      }
      case 6: {
        return {
          line: +(id[1] + id[2]),
          column: +(id[4] + id[5]),
        };
      }
    }
  }

  static open(gameGrid) {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        gameGrid[this.cellIndex(e.target.id).line][
          this.cellIndex(e.target.id).column
        ].isOpened = true;
        e.target.classList.add("visible");
        Bombs.displayBomb(gameGrid, e.target);
      });
    });
  }
}

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
    const sideLength = `calc(calc(${
      document.querySelector("#grid").clientWidth
    }px - calc(1px * ${numberOfColumns - 1})) / ${numberOfColumns})`;
    return `height:${sideLength};width:${sideLength}`;
  }

  static cellIndex(cell) {
    const id = cell.id;
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
        gameGrid[this.cellIndex(e.target).line][
          this.cellIndex(e.target).column
        ].isOpened = true;
        e.target.classList.add("visible");
      });
    });
  }
}

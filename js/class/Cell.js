export class Cell {
  constructor(isOpened, hasBomb, hasFlag, nbOfBombsTouched, cellId) {
    this.isOpened = isOpened;
    this.hasBomb = hasBomb;
    this.hasFlag = hasFlag;
    this.nbOfBombsTouched = nbOfBombsTouched;
    this.cellId = cellId;
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
          line: +id[1],
          column: +id[3],
        };
      }
      case 5: {
        if (/\w\d{2}\w\d/.test(id)) {
          return {
            line: +(id[1] + id[2]),
            column: +id[4],
          };
        } else {
          return {
            line: +id[1],
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

  static openEvent(gameGrid /*, nbOfCellsVisible, nbOfCellsPropagated*/) {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        this.open(
          gameGrid,
          /* nbOfCellsVisible, nbOfCellsPropagated,*/ e.target
        );
        this.adjacentOpening(gameGrid, e.target);
      });
    });
  }

  static open(gameGrid, cell) {
    gameGrid[this.cellIndex(cell.id).line][
      this.cellIndex(cell.id).column
    ].isOpened = true;
    cell.classList.add("visible");
    this.displayElementWithinCell(gameGrid, cell);
  }

  static chainOpening(gameGrid, nbOfCellsVisible, nbOfCellsPropagated, cell) {
    let lineFocusedIndex = this.cellIndex(cell.id).line;
    let columnFocusedIndex = this.cellIndex(cell.id).column;
    const cellFocused = gameGrid[lineFocusedIndex][columnFocusedIndex];

    //! this.nbOfCellsVisible for each this.open(...)
    //! this.nbOfCellsPropagated for each propagation

    //! Attention collision derCol
    do {
      if (!cellFocused.hasBomb && cellFocused.nbOfBombsTouched === 0) {
        // TODO : Ouvrir toutes les cellules autour
        // TODO : Modifier nbOfCellsVisible
        // TODO : cellFocused.propaged
      }
    } while (nbOfCellsVisible !== nbOfCellsPropagated); //! Attention : cells avec nombre sont visibles !!

    // gameGrid.forEach((line, lineIndex) => {
    //   for (const cell of gameGrid[line]) {
    //     if (cell.propagated) continue;
    //     if (cell.isVisible && cell.nbOfBombsTouched === 0) {
    //     }
    //   }
    // });

    /*
    this.lastCellOpened = `L${lineIndex}C${+columnIndex - 1}`;
    if (+columnIndex === gameGrid.length - 1) {
      +lineIndex++;
      for (let i = 0; i < this.cellsOpenedInARow; i++) {
        +columnIndex--;
      }
    }
    if (
      +columnIndex !== gameGrid[0].length - 1
    ) {
      this.open(
        gameGrid,
        document.querySelector(`#L${lineIndex}C${+columnIndex + 1}`)
      );
    }*/
  }

  static adjacentOpening(gameGrid, cellFocused) {
    const [lineIndex, columnIndex] = [
      this.cellIndex(cellFocused.id).line,
      this.cellIndex(cellFocused.id).column,
    ];

    if (
      !gameGrid[lineIndex][columnIndex].hasBomb &&
      gameGrid[lineIndex][columnIndex].nbOfBombsTouched === 0
    ) {
      console.log("là");
      // TODO : Ouvrir toutes les cellules autour
      this.adjacentCells(gameGrid, lineIndex, columnIndex).forEach(
        (adjacentCell) => {
          if (adjacentCell !== undefined) {
            this.open(
              gameGrid,
              document.querySelector("#" + adjacentCell.cellId)
            );
            //! ^ appelé ~2k-4k fois !!!!!! ^
          }
        }
      );
      // TODO : Modifier nbOfCellsVisible
      // TODO : cellFocused.propaged
    }
  }

  static addNumberOfBombsTouched(gameGrid) {
    gameGrid.forEach((line, lineIndex) => {
      for (const columnIndex of line.keys()) {
        this.adjacentCells(gameGrid, lineIndex, columnIndex).forEach(
          (adjacentCell) => {
            if (adjacentCell !== undefined && adjacentCell.hasBomb) {
              gameGrid[lineIndex][columnIndex].nbOfBombsTouched++;
            }
          }
        );
      }
    });
  }

  static adjacentCells(gameGrid, lineIndex, columnIndex) {
    switch (lineIndex) {
      case 0: {
        switch (columnIndex) {
          case 0: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              false,
              false,
              false,
              true,
              true,
              true,
              false,
              false
            );
          }
          case gameGrid[0].length - 1: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              false,
              false,
              false,
              false,
              false,
              true,
              true,
              true
            );
          }
          default: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              false,
              false,
              false,
              true,
              true,
              true,
              true,
              true
            );
          }
        }
      }
      case gameGrid.length - 1: {
        switch (columnIndex) {
          case 0: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              false,
              true,
              true,
              true,
              false,
              false,
              false,
              false
            );
          }
          case gameGrid[0].length - 1: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              true,
              true,
              false,
              false,
              false,
              false,
              false,
              true
            );
          }
          default: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              true,
              true,
              true,
              true,
              false,
              false,
              false,
              true
            );
          }
        }
      }
      default: {
        switch (columnIndex) {
          case 0: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              false,
              true,
              true,
              true,
              true,
              true,
              false,
              false
            );
          }
          case gameGrid[0].length - 1: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              true,
              true,
              false,
              false,
              false,
              true,
              true,
              true
            );
          }
          default: {
            return this.setAdjacentCells(
              gameGrid,
              lineIndex,
              columnIndex,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true
            );
          }
        }
      }
    }
  }

  static setAdjacentCells(
    gameGrid,
    line,
    column,
    topLeft,
    topMiddle,
    topRight,
    right,
    bottomRight,
    bottomMiddle,
    bottomLeft,
    left
  ) {
    return [
      topLeft ? gameGrid[line - 1][column - 1] : undefined,
      topMiddle ? gameGrid[line - 1][column] : undefined,
      topRight ? gameGrid[line - 1][column + 1] : undefined,
      right ? gameGrid[line][column + 1] : undefined,
      bottomRight ? gameGrid[line + 1][column + 1] : undefined,
      bottomMiddle ? gameGrid[line + 1][column] : undefined,
      bottomLeft ? gameGrid[line + 1][column - 1] : undefined,
      left ? gameGrid[line][column - 1] : undefined,
    ];
  }

  static displayElementWithinCell(gameGrid, cellClicked) {
    const cell =
      gameGrid[this.cellIndex(cellClicked.id).line][
        this.cellIndex(cellClicked.id).column
      ];

    if (cell.nbOfBombsTouched > 0) {
      cellClicked.innerHTML = `<p class="nb-${cell.nbOfBombsTouched}">${cell.nbOfBombsTouched}</p>`;
    }

    if (cell.hasBomb) {
      cellClicked.innerHTML = `<i class="fas fa-bomb"></i>`;
      cellClicked.classList.add("has-bomb");
    }
  }
}

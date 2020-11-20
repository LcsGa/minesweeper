import { Grid } from "./Grid.js";

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

  // returns on object filled with line and column of the targeted cell(html), depending of its id
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

  // Returns the cellObj of the cellHTML clicked
  static cellObj(gameGridObj, cellHTML) {
    return gameGridObj.grid[this.cellIndex(cellHTML.id).line][
      this.cellIndex(cellHTML.id).column
    ];
  }

  static markdownCellWithFlagEvent(gameGridObj) {
    Grid.cells().forEach((cellHTML) => {
      cellHTML.addEventListener("contextmenu", (e) => {
        if (!this.cellObj(gameGridObj, cellHTML).hasFlag) {
          cellHTML.innerHTML = `<i class="fas fa-flag"></i>`;
          this.cellObj(gameGridObj, cellHTML).hasFlag = true;
          // TODO :  reduce flagsRemaining
        } else {
          cellHTML.innerHTML = "";
          this.cellObj(gameGridObj, cellHTML).hasFlag = false;
          // TODO :  increase flagsRemaining
        }
        e.preventDefault();
      });
    });
  }

  static openCellEvent(gameGridObj) {
    Grid.cells().forEach((cellHTML) => {
      cellHTML.addEventListener("click", (e) => {
        if (!this.cellObj(gameGridObj, e.target).isOpened) {
          gameGridObj.nbOfCellsVisible++;
        }
        this.open(gameGridObj, e.target);
        this.adjacentOpening(gameGridObj, e.target);
      });
    });
  }

  // Sub method used in other methods : opens the cell clicked / opened
  static open(gameGridObj, cellHTML) {
    this.cellObj(gameGridObj, cellHTML).isOpened = true;
    cellHTML.classList.add("visible");
    this.displayElementWithinCell(gameGridObj, cellHTML);
  }

  // on cell opened display : nothing, a bomb or a the number of bombs touched
  static displayElementWithinCell(gameGridObj, cellClickedHTML) {
    const cell = this.cellObj(gameGridObj, cellClickedHTML);

    if (cell.nbOfBombsTouched > 0) {
      cellClickedHTML.innerHTML = `<p class="nb-${cell.nbOfBombsTouched}">${cell.nbOfBombsTouched}</p>`;
    }

    if (cell.hasBomb) {
      cellClickedHTML.innerHTML = `<i class="fas fa-bomb"></i>`;
      cellClickedHTML.classList.add("has-bomb");
    }
  }

  // Opens every cells of the grid that : is not opened, is empty and is not propagated
  static chainOpening(gameGridObj) {
    gameGridObj.grid.forEach((line) => {
      line.forEach((cellObj) => {
        const cellHTML = document.querySelector("#" + cellObj.cellId);
        if (
          cellObj.isOpened &&
          !cellObj.hasBomb &&
          cellObj.nbOfBombsTouched === 0 &&
          !cellObj.propagated
        ) {
          this.adjacentOpening(gameGridObj, cellHTML);
        }
      });
    });
  }

  // Opens every surrounding cell of the cell clicked of focused
  static adjacentOpening(gameGridObj, cellFocusedHTML) {
    const cellFocusedObj = this.cellObj(gameGridObj, cellFocusedHTML);

    if (!cellFocusedObj.hasBomb && cellFocusedObj.nbOfBombsTouched === 0) {
      this.adjacentCells(
        gameGridObj.grid,
        this.cellIndex(cellFocusedHTML.id).line,
        this.cellIndex(cellFocusedHTML.id).column
      ).forEach((adjacentCell) => {
        if (adjacentCell !== undefined && !adjacentCell.isOpened) {
          this.open(
            gameGridObj,
            document.querySelector("#" + adjacentCell.cellId)
          );
          gameGridObj.nbOfCellsVisible++;
        }
      });
      cellFocusedObj.propagated = true;
      this.chainOpening(gameGridObj);
    }
  }

  // runs through the whole grid and adds the number of bombs touched by each cell
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

  // Uses setAdjacentCells : returns an array with all of the adjacent cells surrounding the cell clicked/focused
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

  // Sub method  used by adjacentCells(...)
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
}

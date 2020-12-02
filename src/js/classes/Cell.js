import { Game } from "./Game.js";
import { Bombs } from "./Bombs.js";
import { Grid } from "./Grid.js";
import { victoryForm } from "../main.js";

export class Cell {
  constructor(isOpened, hasBomb, hasFlag, cellId) {
    this.isOpened = isOpened;
    this.hasBomb = hasBomb;
    this.hasFlag = hasFlag;
    this.nbOfBombsTouched = 0;
    this.cellId = cellId;
    this.clickedRecently = false;
  }

  static cellHTML(lineIndex, columnIndex, numberOfColumns) {
    return `<button id="L${lineIndex}C${columnIndex}" class="cell" style="${this.cellTemplate(
      numberOfColumns
    )}"></button>`;
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

  // Function used in markdownCellWithFlagEvent(...)
  static markdownCellWithFlag(gameGridObj, cellHTML, gameBombsObj) {
    if (this.cellObj(gameGridObj, cellHTML).isOpened) return;
    if (!this.cellObj(gameGridObj, cellHTML).hasFlag) {
      if (gameBombsObj.numberOfBombs === 0) return;
      cellHTML.innerHTML = `<i class="fas fa-flag"></i>`;
      this.cellObj(gameGridObj, cellHTML).hasFlag = true;
      Bombs.numberOfFlagsLeft(gameBombsObj, "reduce");
    } else {
      cellHTML.innerHTML = "";
      this.cellObj(gameGridObj, cellHTML).hasFlag = false;
      Bombs.numberOfFlagsLeft(gameBombsObj, "increase");
    }
    window.navigator.vibrate(10);
    if (Game.isGameWon(gameBombsObj, gameGridObj))
      victoryForm.style.display = "flex";
  }

  static markdownCellWithFlagEvent(gameBombsObj, gameGridObj) {
    Grid.cells().forEach((cellHTML) => {
      const cellObj = this.cellObj(gameGridObj, cellHTML);
      // right click
      cellHTML.addEventListener("mousedown", (e) => {
        if (e.which === 3) {
          this.markdownCellWithFlag(gameGridObj, cellHTML, gameBombsObj);
        }
      });

      // long touch
      let longClick;
      cellHTML.addEventListener("touchstart", () => {
        longClick = setTimeout(() => {
          this.markdownCellWithFlag(gameGridObj, cellHTML, gameBombsObj);
          cellObj.clickedRecently = true;
        }, 250);
      });
      window.addEventListener("touchend", () => {
        clearTimeout(longClick);
        setTimeout(() => {
          cellObj.clickedRecently = false;
        }, 20);
      });
    });
  }

  static openCellEvent(gameBombsObj, gameGridObj) {
    Grid.cells().forEach((cellHTML) => {
      cellHTML.addEventListener("click", () => {
        const cellObj = this.cellObj(gameGridObj, cellHTML);
        if (
          !cellObj.isOpened ||
          cellObj.nbOfBombsTouched ===
            this.nbOfFlagsTouched(gameGridObj, cellHTML)
        ) {
          if (cellObj.clickedRecently) return;
          this.open(gameGridObj, cellHTML);
          this.adjacentOpening(gameGridObj, cellHTML);
          if (Game.isGameWon(gameBombsObj, gameGridObj))
            victoryForm.style.display = "flex";
        }
      });
    });
  }

  // Sub method used in other methods : opens the cell clicked / opened
  static open(gameGridObj, cellHTML) {
    if (this.cellObj(gameGridObj, cellHTML).hasFlag) return;
    if (!this.cellObj(gameGridObj, cellHTML).isOpened) {
      gameGridObj.nbOfCellsVisible++;
    }
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
          !cellObj.propagated &&
          !cellObj.hasFlag
        ) {
          this.adjacentOpening(gameGridObj, cellHTML);
        }
      });
    });
  }

  // Opens every surrounding cell of the cell clicked of focused
  static adjacentOpening(gameGridObj, cellFocusedHTML) {
    const cellFocusedObj = this.cellObj(gameGridObj, cellFocusedHTML);

    if (
      !cellFocusedObj.hasBomb &&
      (cellFocusedObj.nbOfBombsTouched === 0 ||
        cellFocusedObj.nbOfBombsTouched ===
          this.nbOfFlagsTouched(gameGridObj, cellFocusedHTML)) &&
      !cellFocusedObj.hasFlag
    ) {
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

  static nbOfFlagsTouched(gameGridObj, cellHTML) {
    let nbOfFlagsTouched = 0;
    this.adjacentCells(
      gameGridObj.grid,
      this.cellIndex(cellHTML.id).line,
      this.cellIndex(cellHTML.id).column
    ).forEach((cellObj) => {
      if (cellObj !== undefined && cellObj.hasFlag) nbOfFlagsTouched++;
    });
    return nbOfFlagsTouched;
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

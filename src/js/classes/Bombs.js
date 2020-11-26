const bombsLeft = document.querySelector("#bombs-left");

export class Bombs {
  constructor(numberOfBombs, gridObj) {
    this.numberOfBombs = numberOfBombs;
    bombsLeft.innerHTML = this.numberOfBombs;
    this.bombsCoordinates = this.setBombsCoordinates(gridObj);
    this.initBombsObj(gridObj);
  }

  // Returns an array containing randoms coordinates for bombs to be placed
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

    return bombsCoordinates;
  }

  // Uses setBombsCoordinates(...) method to set each hasBomb property of the cell of the grid to true
  initBombsObj(gameGrid) {
    gameGrid.forEach((line, lineIndex) => {
      line.forEach((cell, columnIndex) => {
        cell.hasBomb = this.bombsCoordinates.includes(
          `L${lineIndex}C${columnIndex}`
        )
          ? true
          : false;
      });
    });
  }

  static nbOfBombsLeft(bombsObj, action) {
    switch (action) {
      case "reduce": {
        bombsObj.numberOfBombs--;
        break;
      }
      case "increase": {
        bombsObj.numberOfBombs++;
        break;
      }
      default: {
        console.error(
          `"${action}" action unknown for Bombs.nbOfBombsLeft(...) methods !`
        );
      }
    }
    bombsLeft.innerHTML = `${bombsObj.numberOfBombs < 10 ? "0" : ""}${
      bombsObj.numberOfBombs
    }`;
  }
}

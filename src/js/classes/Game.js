import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { Bombs } from "./Bombs.js";
import { victoryWindow, lossWindow } from "../main.js";
import { timerHTML, stopTimer } from "../lib/timer.js";

const bombs = document.querySelector("#bombs");
const time = document.querySelector("#time");

export class Game extends Grid {
  constructor(gameMode) {
    super();
    this.gameMode = gameMode;
    this.started = false;
    this.initGameMode();
    Cell.addNumberOfBombsTouched(this.gridObj.grid);
    Cell.openCellEvent(this.bombsObj, this.gridObj);
    Cell.markdownCellWithFlagEvent(this.bombsObj, this.gridObj);
  }

  initGameMode() {
    switch (this.gameMode) {
      case "easy": {
        this.gridObj = new Grid(9, 9);
        this.bombsObj = new Bombs(10, this.gridObj.grid);
        break;
      }
      case "medium": {
        this.gridObj = new Grid(16, 12);
        this.bombsObj = new Bombs(30, this.gridObj.grid);
        break;
      }
      case "hard": {
        this.gridObj = new Grid(23, 12);
        this.bombsObj = new Bombs(57, this.gridObj.grid);
        break;
      }
      default: {
        console.error(`${this.gameMode} does not match any game-mode`);
      }
    }
  }

  static isGameWon(gameBombsObj, gameGridObj) {
    if (
      gameBombsObj.numberOfFlagsLeft === 0 &&
      gameGridObj.nbOfCellsVisible ===
        gameGridObj.grid.length * gameGridObj.grid[0].length -
          gameBombsObj.numberOfBombs
    )
      return true;
  }

  static isGameLost(gameGridObj, cellHTML) {
    const cellObj = Cell.cellObj(gameGridObj, cellHTML);
    if (!cellObj.hasFlag && cellObj.hasBomb) return true;
  }

  static isDone(gameBombsObj, gameGridObj, cellHTML) {
    if (this.isGameWon(gameBombsObj, gameGridObj)) {
      victoryWindow.style.display = "flex";
      bombs.innerHTML = gameBombsObj.numberOfBombs;
      time.innerHTML = timerHTML.innerHTML;
      stopTimer();
    } else if (this.isGameLost(gameGridObj, cellHTML)) {
      lossWindow.style.display = "flex";
      Cell.openEveryCells(gameGridObj);
      stopTimer();
    }
  }
}

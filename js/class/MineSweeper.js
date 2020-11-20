import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { Bombs } from "./Bombs.js";

export class MineSweeper extends Grid {
  constructor(gameMode) {
    super();
    this.gameMode = gameMode;
    this.initGameMode();
    Cell.addNumberOfBombsTouched(this.gridObj.grid);
    Cell.openCellEvent(this.gridObj);
    Cell.markdownCellWithFlagEvent(this.gridObj);
  }

  initGameMode() {
    switch (this.gameMode) {
      case "easy": {
        this.gridObj = new Grid(9, 9);
        new Bombs(10, this.gridObj.grid);
        break;
      }
      case "medium": {
        this.gridObj = new Grid(16, 12);
        new Bombs(30, this.gridObj.grid);
        break;
      }
      case "hard": {
        this.gridObj = new Grid(23, 12);
        new Bombs(57, this.gridObj.grid);
        break;
      }
      default: {
        console.error(`${this.gameMode} does not match any game-mode`);
      }
    }
  }
}

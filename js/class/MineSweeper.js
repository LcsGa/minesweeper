import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { Bombs } from "./Bombs.js";

export class MineSweeper extends Grid {
  constructor(gameMode) {
    super();
    this.gameMode = gameMode;
    this.initGameMode();
    Cell.addNumberOfBombsTouched(this.grid);
    Cell.open(this.grid);
  }

  initGameMode() {
    switch (this.gameMode) {
      case "easy": {
        this.grid = new Grid(9, 9).grid;
        new Bombs(10, this.grid);
        break;
      }
      case "medium": {
        this.grid = new Grid(16, 12).grid;
        new Bombs(30, this.grid);
        break;
      }
      case "hard": {
        this.grid = new Grid(25, 12).grid;
        new Bombs(62, this.grid);
        break;
      }
      default: {
        console.error(`${this.gameMode} does not match any game-mode`);
      }
    }
  }
}

import { Grid } from "./Grid.js";
import { Bombs } from "./Bombs.js";

export class MineSweeper extends Grid {
  constructor(gameMode) {
    super();
    this.gameMode = gameMode;
    this.initGameMode();
  }

  initGameMode() {
    switch (this.gameMode) {
      case "easy": {
        this.grid = new Grid(9, 9).grid;
        new Bombs(10, this.grid);
        break;
      }
      case "medium": {
        this.grid = new Grid(16, 16).grid;
        new Bombs(40, this.grid);
        break;
      }
      case "hard": {
        this.grid = new Grid(30, 16).grid;
        new Bombs(90, this.grid);
        break;
      }
      default: {
        console.error(`${this.gameMode} does not match any game-mode`);
      }
    }
  }
}

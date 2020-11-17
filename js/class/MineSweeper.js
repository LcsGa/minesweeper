import { Grid } from "./Grid.js";

export class MineSweeper extends Grid {
  constructor(gameMode) {
    super();
    this.gameMode = gameMode;
    this.initGameMode();
  }

  initGameMode() {
    switch (this.gameMode) {
      case "easy": {
        new Grid(9, 9);
        break;
      }
      case "medium": {
        new Grid(16, 16);
        break;
      }
      case "hard": {
        new Grid(30, 16);
        break;
      }
      default: {
        console.error(`${this.gameMode} doesn't match any game-mode`);
      }
    }
  }
}

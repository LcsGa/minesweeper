export class MineSweeper {
  constructor(gameMode) {
    this.grid = [];
    this.gameMode = gameMode;
    this.initGameMode();
  }

  initGameMode() {
    switch (this.gameMode) {
      case "easy": {
        this.initObjectGrid(9, 9);
        break;
      }
      case "medium": {
        this.initObjectGrid(16, 16);
        break;
      }
      case "hard": {
        this.initObjectGrid(30, 16);
        break;
      }
      default: {
        console.error(`${this.gameMode} doesn't match any game-mode`);
      }
    }
  }

  initObjectGrid(lines, columns) {
    for (let line = 0; line < lines; line++) {
      this.grid.push([]);
      for (let column = 0; column < columns; column++) {
        this.grid[line].push({
          hidden: true,
          bomb: false,
          flag: false,
          bombsTouched: 0
        });
      }
    }
  }
};
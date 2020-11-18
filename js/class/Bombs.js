const bombsLeft = document.querySelector("#bombs-left");

export class Bombs {
  constructor(numberOfBombs) {
    this.numberOfBombs = numberOfBombs;
    this.initBombsLeftHTML();
  }

  initBombsLeftHTML() {
    bombsLeft.innerHTML = this.numberOfBombs;
  }

  static dispatchBombs(nbOfCells) {}
}

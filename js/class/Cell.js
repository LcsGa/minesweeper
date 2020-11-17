export class Cell {
  constructor(hidden, bomb, flag, bombsTouched) {
    this.hidden = hidden;
    this.bomb = bomb;
    this.flag = flag;
    this.bombsTouched = bombsTouched;
  }

  static cellHTML(lineIndex, columnIndex) {
    return `<div id="L${lineIndex}C${columnIndex}" class="cell"></div>`;
  }
}

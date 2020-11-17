export const cellHTML = (lineIndex, columnIndex) =>
  `<div id="L${lineIndex}C${columnIndex}" class="cell"></div>`;

export class Cell {
  constructor(hidden, bomb, flag, bombsTouched) {
    this.hidden = hidden;
    this.bomb = bomb;
    this.flag = flag;
    this.bombsTouched = bombsTouched;
  }
}

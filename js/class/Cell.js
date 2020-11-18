export class Cell {
  constructor(hidden, bomb, flag, bombsTouched) {
    this.hidden = hidden;
    this.bomb = bomb;
    this.flag = flag;
    this.bombsTouched = bombsTouched;
  }

  static cellHTML(lineIndex, columnIndex, numberOfColumns) {
    return `<div id="L${lineIndex}C${columnIndex}" class="cell" style="${this.cellTemplate(
      numberOfColumns
    )}"></div>`;
  }

  static cellTemplate(numberOfColumns) {
    const sideLength = `calc(calc(${
      document.querySelector("#grid").clientWidth
    }px - calc(2px * ${numberOfColumns - 1})) / ${numberOfColumns})`;
    return `height:${sideLength};width:${sideLength}`;
  }
}

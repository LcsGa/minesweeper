import { main, game } from "../main.js";
import { Cell } from "../classes/Cell.js";
import { gridHTML } from "../classes/Grid.js";

// This module is used to settle the correct application's height when used on mobile navigators

const body = document.querySelector("body");

window.addEventListener("resize", () => {
  setBodyHeight();
  resizeGrid(game.gridObj);
  resizeCells(game.gridObj);
});

export function setBodyHeight() {
  body.style.height = window.innerHeight + "px";
}

function resizeGrid(gameGridObj) {
  console.log(gameGridObj);
  if (main.clientWidth >= main.clientHeight) {
    gridHTML.style.height = "calc(90vh - 51px)";
    gridHTML.style.width = "";
  } else {
    gridHTML.style.height = "";
    gridHTML.style.width = "90%";
  }
}

function resizeCells(gameGridObj) {
  const cellTemplate = Cell.cellTemplate(
    gameGridObj.grid.length,
    gameGridObj.grid[0].length
  );
  gameGridObj.grid.forEach((line) => {
    line.forEach((cell) => {
      document.querySelector(`#${cell.cellId}`).style = cellTemplate;
    });
  });
}

export function setGridDimensions() {
  if (main.clientHeight < main.clientWidth) {
    if (main.clientHeight < main.clientWidth) {
      gridHTML.style.height = "calc(90vh - 51px)";
    } else {
      gridHTML.style.width = "90%";
    }
  }
}

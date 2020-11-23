import "./style/mobile_viewport_height.js";
import { Game } from "./class/Game.js";
import { Grid, gridHTML } from "./class/Grid.js";
import { timer, resetTimer } from "./timer.js";

const gameMode = document.querySelector("select");

// init gameMode
let game = new Game(gameMode.value);

// change gameMode
gameMode.addEventListener("change", () => {
  game = new Game(gameMode.value);
  resetTimer();
});

// prevent context menu from opening on grid right click
gridHTML.addEventListener("contextmenu", (e) => e.preventDefault());

Grid.cells().forEach((cellHTML) => {
  cellHTML.addEventListener("click", () => {
    if (!game.started) timer();
    game.started = true;
  });
});

import "./style/mobile_viewport_height.js";
import { Game } from "./class/Game.js";
import { Grid, gridHTML } from "./class/Grid.js";
import { timer, resetTimer } from "./timer.js";

const gameMode = document.querySelector("select");
const restart = document.querySelector(".fa-sync-alt");

// init gameMode
let game = new Game(gameMode.value);
startStopTimer(); // TODO : Include this into Game.js

// change gameMode
gameMode.addEventListener("change", () => initGame());

// restart game
restart.addEventListener("click", () => initGame());

// prevent context menu from opening on grid right click
gridHTML.addEventListener("contextmenu", (e) => e.preventDefault());

// start/stop timer
// TODO : Include this into Game.js
function startStopTimer() {
  Grid.cells().forEach((cellHTML) => {
    cellHTML.addEventListener("click", () => {
      if (!game.started) timer();
      game.started = true;
    });
  });
}

// init game
function initGame() {
  game = new Game(gameMode.value);
  resetTimer();
  game.started = false;
  startStopTimer();
}

import "./lib/mobile_viewport_height.js";
import { Game } from "./classes/Game.js";
import { gridHTML } from "./classes/Grid.js";
import { startTimer, resetTimer } from "./lib/timer.js";

const gameMode = document.querySelector("select");
const restart = document.querySelector(".fa-sync-alt");
let game;

// init game
function initGame() {
  game = new Game(gameMode.value);
  resetTimer();
  game.started = false;
  startTimer(game);
}
initGame();

// change gameMode
gameMode.addEventListener("change", () => initGame());

// restart game
restart.addEventListener("click", () => initGame());

// prevent context menu from opening on grid right click
gridHTML.addEventListener("contextmenu", (e) => e.preventDefault());

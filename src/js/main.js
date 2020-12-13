import "./lib/style.js";
import { setBodyHeight } from "./lib/style.js";
import { Game } from "./classes/Game.js";
import { gridHTML } from "./classes/Grid.js";
import { startTimer, resetTimer } from "./lib/timer.js";

const gameMode = document.querySelector("select");
const restart = document.querySelectorAll(".restart");
export const main = document.querySelector("main");
export const victoryWindow = document.querySelector("#victory-window");
export const lossWindow = document.querySelector("#loss-window");
const dialogWindows = document.querySelectorAll(".dialog-window");
export let game;

// init game
function initGame() {
  setBodyHeight();
  game = new Game(gameMode.value, main.clientWidth >= main.clientHeight);
  dialogWindows.forEach(
    (dialogWindow) => (dialogWindow.style.display = "none")
  );
  resetTimer();
  game.started = false;
  startTimer(game);
}
initGame();

// change gameMode
gameMode.addEventListener("change", initGame);

// restart game
restart.forEach((restartButton) =>
  restartButton.addEventListener("click", initGame)
);

// prevent context menu from opening on grid/dialog-window right click
[gridHTML, ...[...dialogWindows]].forEach((element) =>
  element.addEventListener("contextmenu", (e) => e.preventDefault())
);

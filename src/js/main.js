import "./lib/style.js";
import { Game } from "./classes/Game.js";
import { gridHTML } from "./classes/Grid.js";
import { startTimer, resetTimer } from "./lib/timer.js";

const gameMode = document.querySelector("select");
const restart = document.querySelectorAll(".restart");
export const victoryWindow = document.querySelector("#victory-window");
export const lossWindow = document.querySelector("#loss-window");
const dialogWindows = document.querySelectorAll(".dialog-window");
export let game;

// init game
function initGame() {
  game = new Game(gameMode.value);
  dialogWindows.forEach(
    (dialogWindow) => (dialogWindow.style.display = "none")
  );
  resetTimer();
  game.started = false;
  startTimer(game);
}
initGame();

// change gameMode
gameMode.addEventListener("change", () => initGame());

// restart game
restart.forEach((restartButton) =>
  restartButton.addEventListener("click", () => initGame())
);

// prevent context menu from opening on grid/dialog-window right click
[gridHTML, dialogWindows[0], dialogWindows[1]].forEach((element) =>
  element.addEventListener("contextmenu", (e) => e.preventDefault())
);

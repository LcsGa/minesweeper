import "./style/mobile_viewport_height.js";
import { MineSweeper } from "./class/MineSweeper.js";
import { Cell } from "./class/Cell.js";

const gameMode = document.querySelector("select");

// init gameMode
let game = new MineSweeper(gameMode.value);

// change gameMode
gameMode.addEventListener("change", () => {
  game = new MineSweeper(gameMode.value);
});

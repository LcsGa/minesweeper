import "./style/mobile_viewport_height.js";
import { MineSweeper } from "./class/MineSweeper.js";

// easy : 9 * 9 / 10 bombs
// medium : 16 * 16 / 40 bombs
// hard : 16 * 30 / 99 bombs

const gameMode = document.querySelector("select");

// init gameMode
let ms = new MineSweeper(gameMode.value);

// change gameMode
gameMode.addEventListener("change", () => {
  const ms = new MineSweeper(gameMode.value);
});

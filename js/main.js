import "./style/mobile_viewport_height.js";
import { Game } from "./class/Game.js";

const gameMode = document.querySelector("select");

// init gameMode
let game = new Game(gameMode.value);

// change gameMode
gameMode.addEventListener("change", () => {
  game = new Game(gameMode.value);
});

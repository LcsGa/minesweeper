import { Grid } from "./class/Grid.js";

const timerHTML = document.querySelector("#timer");
let timerTimeOut;
let seconds = -1;

function timer() {
  seconds++;
  timerHTML.innerHTML = `${seconds < 10 ? "0" : ""}${seconds}`;
  timerTimeOut = setTimeout(timer, 1000);
}

export function startTimer(gameObj) {
  Grid.cells().forEach((cellHTML) => {
    ["click", "contextmenu"].forEach((event) => {
      cellHTML.addEventListener(event, () => {
        if (!gameObj.started) timer();
        gameObj.started = true;
      });
    });
  });
}

export function resetTimer() {
  clearTimeout(timerTimeOut);
  seconds = -1;
  timerHTML.innerHTML = "00";
}

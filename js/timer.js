const timerHTML = document.querySelector("#timer");
let timerTimeOut;
let seconds = -1;

export function timer() {
  seconds++;
  timerHTML.innerHTML = `${seconds < 10 ? "0" : ""}${seconds}`;
  timerTimeOut = setTimeout(timer, 1000);
}

export function resetTimer() {
  clearTimeout(timerTimeOut);
  seconds = -1;
  timerHTML.innerHTML = "00";
}

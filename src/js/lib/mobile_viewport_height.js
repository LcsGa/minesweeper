// This module is used to settle the correct application's height when used on mobile navigators

const body = document.querySelector("body");

window.addEventListener("load", () => {
  setHeight();
});

window.addEventListener("resize", () => {
  setHeight();
});

function setHeight() {
  body.style.height = window.innerHeight + "px";
}

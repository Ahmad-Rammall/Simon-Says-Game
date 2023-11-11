const body = document.querySelector("body");
const title = document.querySelector("#level-title");

const colorsArray = ["green", "red", "yellow", "blue"];
let clickedColors = [];
let sequence = [];
let level = 0;
let gameStarted = false;

document.addEventListener("keypress", () => {
  if (!gameStarted) {
    gameStarted = true;
    generateNextLevel();
  }
});
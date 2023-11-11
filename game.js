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

function generateNextLevel() {
  level++;
  title.textContent = `Level ${level}`;
  clickedColors = [];
  let random = Math.floor(Math.random() * 4);
  sequence.push(colorsArray[random]);
  let btn = document.getElementById(colorsArray[random]);
  setTimeout(() => {
    changeClassList(btn, "pressed");
    playSound(btn.id);
  }, 1000);
}

function playSound(soundName) {
  const sound = new Audio(`./sounds/${soundName}.mp3`);
  sound.play();
}

function changeClassList(element, className) {
  element.classList.add(className);
  setTimeout(() => element.classList.remove(className), 150);
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!gameStarted) return;
    changeClassList(btn, "pressed");
    clickedColors.push(btn.id);
    console.log("sequence:" + sequence);
    console.log("user: " + clickedColors);
    checkAnswer(clickedColors.length - 1);
  });
});

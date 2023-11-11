const title = document.querySelector("#level-title");

const colorsArray = ["green", "red", "yellow", "blue"];
let clickedColors , sequence= [];
let level = 0;
let gameStarted = false;

// When User Clicks On The Keyboard To Start The Game
document.addEventListener("keypress", () => {
  if (!gameStarted) {
    gameStarted = true;
    generateNextLevel();
  }
});

// To Add A New Step In The Sequence
function generateNextLevel() {
  level++;
  title.textContent = `Level ${level}`;
  clickedColors = [];
  let random = Math.floor(Math.random() * 4);
  
  // Adding Random Color
  sequence.push(colorsArray[random]); 

  let btn = document.getElementById(colorsArray[random]);
  setTimeout(() => {
    changeClassList(btn, "pressed");
    playSound(btn.id);
  }, 1000); // Delay The Execution after 1 second
}

// To Play A Sound
function playSound(soundName) {
  const sound = new Audio(`./sounds/${soundName}.mp3`);
  sound.play();
}

// To Add And Remove A Class (.pressed / game-over)
function changeClassList(element, className) {
  element.classList.add(className);
  setTimeout(() => element.classList.remove(className), 150);
}

// Event Listener To Track The User's Click
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!gameStarted) return;
    changeClassList(btn, "pressed"); // To Add The Click Animation To The Button 
    clickedColors.push(btn.id);
    checkAnswer(clickedColors.length - 1);
  });
});

// To Check The User's Choice
function checkAnswer(index) {
  if (sequence[index] == clickedColors[index]) {
    playSound(clickedColors[index]);
    if (sequence.length == clickedColors.length) {
      generateNextLevel();
    }
  } else {
    changeClassList(document.querySelector("body"), "game-over");
    playSound("wrong");
    title.textContent = "Game Over! Press Any Key To Restart.";
    resetGame();
  }
}

// To Reset The Game
function resetGame() {
  level = 0;
  sequence = [];
  gameStarted = false;
}
const gameMusic = new Audio("/Audio/GameMusic.mp3");
const OSound = new Audio("/Audio/OSound.mp3");
const XSound = new Audio("/Audio/XSound.mp3");
const gameTie = new Audio("/Audio/gameDraw.wav");
const winSound = new Audio("/Audio/WinSound.mp3");

let boxes = document.querySelectorAll(".box");
let turnPlayer = document.querySelector(".turnPlayer");
let YourTurn = document.querySelector("#YourTurn");
let winnerTxt = document.querySelector("#wtext");
let container = document.querySelector(".container");
let winPopUp = document.querySelector(".winPopUp");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#newgame-btn");

let turnO = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Counter variable moved outside the event listener to avoid re-initializing on each click
let counter = 0;

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  turnPlayer.innerText = "O";
  YourTurn.style.color = "white";
  enableBoxes();
  // Reset the counter to 0
  counter = 0;
};

const startnew = () => {
  gameTie.pause();
  winSound.pause();
  container.style.visibility = "visible";
  turnO = true;
  turnPlayer.innerText = "O";
  YourTurn.style.color = "white";
  winPopUp.classList.add("hide");
  enableBoxes();
  // Reset the counter to 0
  counter = 0;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.innerText) {
      // Only proceed if the box is empty
      if (turnO) {
        OSound.play();
        box.innerText = "O";
        box.style.color = "white";
        turnO = false;
        turnPlayer.innerText = "X";
        YourTurn.style.color = "red";
      } else {
        XSound.play();
        box.innerText = "X";
        box.style.color = "red";
        turnO = true;
        turnPlayer.innerText = "O";
        YourTurn.style.color = "white";
      }
      box.disabled = true;
      checkWinner();
    }
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return;
      }
    }
  }

  // Increment the counter after each move
  counter++;

  if (counter === 9) {
    gameDraw();
  }
};

let showWinner = (winner) => {
  winPopUp.classList.remove("hide");
  container.style.visibility = "hidden";
  winSound.play();
  winnerTxt.innerText = `Congratulations , Winner is ${winner}`;
};

let gameDraw = () => {
  winPopUp.classList.remove("hide");
  container.style.visibility = "hidden";
  gameTie.play();
  winnerTxt.innerText = `Game Draw!.. Play Again..`;
};

resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", startnew);

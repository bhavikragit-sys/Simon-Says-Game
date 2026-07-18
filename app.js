let gameSeq = [];
let userSeq = [];

const btns = ["yellow", "red", "orange", "blue"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 100);
}

function userFlash(btn) {
  btn.classList.add("userFlash");

  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 100);
}

function levelUp() {
  userSeq = [];
  level++;

  h2.innerText = `Level ${level}`;

  let randIndex = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIndex];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function btnPress() {
  if (!started) {
    return;
  }
  let btn = this;

  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
  // Wrong answer
  if (userSeq[idx] !== gameSeq[idx]) {
    document.body.classList.add("game-over");

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 150);

    h2.innerHTML = `Game Over! Your Score was <b>${level - 1}</b><br>Press any key to restart.`;

    reset();
    return;
  }
  // Next Level
  if (userSeq.length === gameSeq.length) {
    setTimeout(levelUp, 500);
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

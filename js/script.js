let scoreCount = "0";
let scoreBlock = false;
const jumpTime = 500;

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, jumpTime);
};

function marioIsJumpingUpPipe(pipePosition, marioPosition) {
    return pipePosition <= 120 && pipePosition > 0 && marioPosition >= 80;
  }  

function marioIsDead(pipePosition, marioPosition) {
  return pipePosition <= 120 && pipePosition > 0 && marioPosition < 80;
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (marioIsDead(pipePosition, marioPosition)) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    clearInterval(loop);
  } else if (marioIsJumpingUpPipe(pipePosition, marioPosition)) {
    if (!scoreBlock) {
      score.innerHTML = `${++scoreCount}`;
      scoreBlock = true;
      setTimeout(() => {
        scoreBlock = false;
      }, jumpTime);
    }
  }
}, 10);

document.addEventListener("keydown", jump);

let scoreCount = "0";
let scoreBlock = false;
const jumpTime = 500;
let marioIsAlive = true;

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    if (marioIsAlive) mario.classList.remove("jump");
  }, jumpTime);
};

function marioIsJumpingUpPipe(pipePosition, marioPosition) {
  return pipePosition <= 120 && pipePosition > 0 && marioPosition >= 80;
}

function marioIsDead(pipePosition, marioPosition, pipeTopPosition) {
  return (
    pipePosition <= 120 && pipePosition > 0 && marioPosition <= pipeTopPosition
  );
}

function stopGame(pipePosition, marioPosition) {
  pipe.style.animationPlayState = "paused";

  mario.style.animationPlayState = "paused";

  mario.src = "./images/game-over.png";
  mario.style.width = "75px";
  mario.style.marginLeft = "50px";
  clouds.style.animationPlayState = "paused"; // pausa a animação das núvens. //
  gameOver.style.display = 'flex'; // isso serve pra alterar a propriedade CSS //
}

function loop() {
  const pipePosition = pipe.offsetLeft;
  const pipeTopPosition = pipe.offsetHeight;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (marioIsDead(pipePosition, marioPosition, pipeTopPosition)) {
    marioIsAlive = false;
    stopGame(pipePosition, marioPosition);
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
  requestAnimationFrame(loop);
}
loop();
document.addEventListener("keydown", jump);
restartBtn.addEventListener('click', ()=> location.reload())

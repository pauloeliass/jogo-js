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

// function checkDevice() { 
//   if( navigator.userAgent.match(/Android/i)
//   || navigator.userAgent.match(/webOS/i)
//   || navigator.userAgent.match(/iPhone/i)
//   || navigator.userAgent.match(/iPad/i)
//   || navigator.userAgent.match(/iPod/i)
//   || navigator.userAgent.match(/BlackBerry/i)
//   || navigator.userAgent.match(/Windows Phone/i)
//   ){
//      return true;
//    }
//   else {
//      return false; 
//    }
//  }

// function mobileLayout(checkDevice) {
//  if (checkDevice == true) {
//    gameBoard.style.minWidth = "90%";
//    gameBoard.style.height = "80%";
//    clouds.style.width = "20rem";
//  }
// }

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
mobileLayout();
document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump);
restartBtn.addEventListener('click', ()=> location.reload())

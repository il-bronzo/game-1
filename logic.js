document.addEventListener("keydown", (press) => {
  switch (press.key) {
    case "ArrowLeft":
      myPlayer.direction = "left";
      break;
    case "ArrowRight":
      myPlayer.direction = "right";
      break;
    case " ":
      myPlayer.jump();
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (unpress) => {
  if (unpress.key === "ArrowLeft" || unpress.key === "ArrowRight") {
    myPlayer.direction = null;
  }
});

let frames = 0;

function gameLoop() {
  requestAnimationFrame(gameLoop);
  frames++;
  myPlayer.walk(myPlayer.direction);
}

requestAnimationFrame(gameLoop);

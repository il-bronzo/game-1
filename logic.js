document.addEventListener("keydown", (press) => {
  console.log(press.key);
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
    case "ArrowUp":
      myPlayer.direction = "up";
      break;
    case "ArrowDown":
      myPlayer.direction = "down";
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (unpress) => {
  if (unpress.key === "ArrowLeft" || unpress.key === "ArrowRight" || unpress.key === "ArrowUp" || unpress.key === "ArrowDown") {
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

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
  myEnemies.forEach(enemy => {
  enemy.move();
   
  });

}

requestAnimationFrame(gameLoop);


function checkCollision(player, enemies) {
  myEnemies.forEach(enemy => {
  
      const playerCoordinates = {
        left: myPlayer.x,
        right: myPlayer.x + Player.width, 
        top: myPlayer.y,
        bottom: myPlayer.y + Player.height 
        };
      
        const enemyCoordinates = {
          left: enemy.x,
          right: enemy.x + Enemy.width, 
          top: enemy.y,
          bottom: enemy.y + Enemy.height 
      };
      if (
        playerCoordinates.left < enemyCoordinates.right &&
        playerCoordinates.right > enemyCoordinates.left &&
        playerCoordinates.top < enemyCoordinates.bottom &&
        playerCoordinates.bottom > enemyCoordinates.top
      ) {

        //AFTER COLLISION
        console.log("Collision detected between player and enemy!");
        myPlayer.lives -= 1;
        if (myPlayer.lives <= 0) {
            console.log("Game Over!");

        } else {
            console.log(`Player lives remaining: ${myPlayer.lives}`);
        }
      }
  });
}

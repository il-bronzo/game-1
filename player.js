class Player {
  static height = 50; //this is only a value, but does not create visually the player. For that, I need to use this value with this.element.styel.height.
  static width = 30;
  static border = "1px solid black";
  static borderWidth = parseInt(Player.border, 10);
  static startPlatform = 1;
  static currentPlatformIndex = Player.startPlatform -1;

  constructor() {
    //visual
    this.element = document.createElement("div");
    this.element.setAttribute("id", "player");
    myGame.element.appendChild(this.element);

    this.element.style.height = Player.height + "px";
    this.element.style.width = Player.width + "px";
    this.element.style.border = Player.border;

    // initial position on the first platform
    this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
    this.element.style.left = 10 + "px";
    this.x = parseInt(this.element.style.left);
    /* this.y = firstPlatform.y; */
    this.element.style.top = this.currentPlatform.y - Player.height + "px";
    this.y = parseInt(this.element.style.top);
    this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
    console.log("current platform ", this.currentPlatform);
    console.log("current index ", Player.currentPlatformIndex);

    //features (speed, etc.)
    this.speed = 2;
    this.direction = null;

    //jump features
    this.jumpSpeed = 5; //prima 3
    this.currentSpeed = this.jumpSpeed;
    this.gravity = 0.08;
    this.jumping = false;
  }

  walk(direction) {
    if (direction === "left") {
      this.x -= this.speed;
      if (this.x <= 0) {
        this.x = 0;
      }
    } else if (direction === "right") {
      this.x += this.speed;
      if (
        this.x >=
        myGame.width -
          2 * Game.borderWidth -
          Player.width -
          2 * Player.borderWidth
      ) {
        /* if (this.x >= myGame.width - Game.borderWidth - Player.width - Player.borderWidth) { */
        // this.x = myGame.width - 2*Game.borderWidth - Player.width;
        /* this.x = myGame.width - Game.borderWidth - Player.width - Player.borderWidth */
        this.x = myGame.width - 2 * Game.borderWidth - Player.width;
      }
    }
    this.element.style.left = this.x + "px";

    // check if the player is jumping, the vertical position y is updated
    if (this.jumping) {
      this.y -= this.currentSpeed;
      this.currentSpeed -= this.gravity;

      /*    this.checkPlatformCollision(); */

      if (this.y >= this.currentPlatform.y - Player.height) {
        //the player lands again on the upper side of the platform
        this.jumping = false;
        this.currentSpeed = this.jumpSpeed;
        this.y = this.currentPlatform.y - Player.height;
      }

      this.element.style.top = this.y + "px";
    }
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
    }
  }

  //uncomment also line 54
  /*     checkPlatformCollision() {
        myPlatforms.forEach(platform => {
            if (this.y <= platform.y + platform.height && this.y > platform.y) {
            this.jumping = false;
            this.jumpSpeed = 4;
            
                }
            
            //the player lands again on the upper side of the platform    
            if (this.y >= platform.y - Player.height) { //the player lands again on the upper side of the platform
                this.jumping = false; 
                this.jumpSpeed = 4;
                this.y = platform.y - Player.height;
            }
            }); 
        } */
}

const myPlayer = new Player();
console.log("myPlayer x ", myPlayer.x);
console.log("myPlayer y ", myPlayer.y);
console.log("Player width ", Player.width);
console.log("actual y player ", myPlayer.y);
console.log("actual y plataforma 1", myPlatforms[0].y);

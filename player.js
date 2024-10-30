class Player {
  static height = 20; //this is only a value, but does not create visually the player. For that, I need to use this value with this.element.styel.height.
  static width = 30;
  static startPlatform = 1;
  static currentPlatformIndex = Player.startPlatform -1;

  constructor() {
    //visual
    this.element = document.createElement("div");
    this.element.setAttribute("id", "player");
    myGame.element.appendChild(this.element);

    this.element.style.height = Player.height + "px";
    this.element.style.width = Player.width + "px";

    // initial position on the first platform
    this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
    this.element.style.left = 10 + "px";
    this.x = parseInt(this.element.style.left);
    this.element.style.top = this.currentPlatform.y - Player.height + "px";
    this.y = parseInt(this.element.style.top);
    this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
    console.log("current platform ", this.currentPlatform);
    console.log("current index ", Player.currentPlatformIndex);

    //features (speed, etc.)
    this.speed = 2;
    this.direction = null;

    //jump features
    this.jumpSpeed = 5;
    this.currentSpeed = this.jumpSpeed;
    this.gravity = 0.08;
    this.jumping = false;
  }

  walk(direction) {
    // PLAYER MOVES LEFT
    if (direction === "left") {
      this.x -= this.speed;
      if (this.x <= 0) {
        this.x = 0;
      }

    // PLAYER MOVES RIGHT
    } else if (direction === "right") {
      this.x += this.speed;
      if (
        this.x >= myGame.width - Player.width) {
        this.x = myGame.width - Player.width;
      }
    }
    
    //PLAYER MOVES UP
    if (direction === "up") {
      myLadders.forEach(ladder => {
        ladder.left = parseInt(ladder.element.style.left);
        ladder.y = parseInt(ladder.element.style.top);
        console.log("this x ",this.x);
        console.log("ladder left ", ladder.left);
        console.log ("ladder width ", Ladder.width);
        console.log("this y - player height", this.y - Player.height);
        console.log ("ladder y ", ladder.y);
        console.log ("ladder y + ladder height ", ladder.y + ladder.height);
        if (this.x <= ladder.left + Ladder.width && this.x + Player.width >= ladder.left && this.y + Player.height >= ladder.y && this.y < ladder.y + ladder.height) { 
          this.y -= this.speed / 5;
          
          if (this.y + Player.height <= ladder.y) {
            this.y = ladder.y - Player.height;
            Player.currentPlatformIndex ++;
            console.log ("index platform after ladder up ", Player.currentPlatformIndex);
            this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
            console.log ("current platform after up ladder ", this.currentPlatform);
            this.direction = null;
          }
        }
      });
    }
    this.element.style.left = this.x + "px";
    this.currentPlatform = myPlatforms[Player.currentPlatformIndex];

    //PLAYER MOVES DOWN
    if (direction === "down") {
      myLadders.forEach(ladder => {
        ladder.left = parseInt(ladder.element.style.left);
        ladder.y = parseInt(ladder.element.style.top);
        if (this.x <= ladder.left + Ladder.width && this.x + Player.width >= ladder.left && this.y + Player.height >= ladder.y && this.y + Player.height < ladder.y + ladder.height) { 
          this.y += this.speed / 5;
          if (this.y + Player.height === ladder.y + ladder.height) {
            this.currentPlatformIndex --; // this is not working
            console.log ("current platform after ladder ", this.currentPlatform) //this is not working
            this.y = ladder.y - Player.height + ladder.height;   
            
          this.direction = null;
          }
        }
      });
    }

    this.element.style.top = this.y + "px";

    // check if the player is jumping, the vertical position y is updated
    if (this.jumping) {
/*       if (this.y <= myPlatforms[Player.currentPlatformIndex + 1].y + Platform.height) {
        console.log ("upper platform 'y' ", myPlatforms[Player.currentPlatformIndex + 1].y)
        this.jumping = false;
        Player.currentSpeed = this.jumpSpeed;
        this.y = this.currentPlatform.y - Player.height;
      } */
     console.log(this.y)
      this.y -= this.currentSpeed;
      this.currentSpeed -= this.gravity;

/*     this.checkPlatformCollision(); */

    //the player lands again on the upper side of the platform
      if (this.y >= this.currentPlatform.y - Player.height) {
        this.jumping = false;
        this.currentSpeed = this.jumpSpeed;
        this.y = this.currentPlatform.y - Player.height;
      }

      this.element.style.top = this.y + "px";
      console.log(this.y)
    }
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
    }
  }

  //uncomment also line 64
/*       checkPlatformCollision() {
        myPlatforms.forEach(platform => {
            if (this.y <= platform.y + platform.height && this.y > platform.y) {
            this.currentSpeed = this.jumpSpeed;
        this.y = this.currentPlatform.y - Player.height;
            
                }
            
            //the player lands again on the upper side of the platform    
            if (this.y >= platform.y - Player.height) {
                this.jumping = false; 
                this.currentSpeed = this.jumpSpeed;
                this.y = platform.y - Player.height;
            }
            }); 
        } */

   /*  checkPlatformCollision() {
      const currentPlatform = this.currentPlatform;
      if(Player.currentPlatformIndex < myPlatforms.length -1) {
        const upperPlatform = myPlatforms[Player.currentPlatformIndex + 1];
        if (this.y <= upperPlatform.y + Platform.height) {
          this.jumping = false;
          this.currentSpeed = -this.jumpSpeed;
          this.y = currentPlatform.y - Player.height;
      }

    }
    if (this.y >= currentPlatform.y - Player.height) {

      this.jumping = false;
      this.currentSpeed = this.jumpSpeed;
      this.y = currentPlatform.y - Player.height; // Riporta il giocatore sopra la piattaforma corrente
    }
  
    this.element.style.top = this.y + "px";
  
    } */
}

const myPlayer = new Player();
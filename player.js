class Player {
  static height = 20; //this is only a value, but does not create visually the player. For that, I need to use this value with this.element.styel.height.
  static width = 30;
  static currentPlatformIndex = 0;
  static margin = 1;
  

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
    this.x = parseFloat(this.element.style.left);
    this.element.style.top = this.currentPlatform.y - Player.height + "px";
    this.y = parseFloat(this.element.style.top);
    this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
    console.log("current platform ", this.currentPlatform);
    console.log("current index ", Player.currentPlatformIndex);

    //features (speed, etc.)
    this.speed = 2;
    this.direction = null;
    this.activeLadder = false;

    //jump features
    this.jumpSpeed = 5;
    this.currentSpeed = this.jumpSpeed;
    this.gravity = 0.08;
    this.jumping = false;
  }

  

  walk(direction) {

    // PLAYER JUMPS --> if the player jumps can also move right and left (parabolic movement), even though it is not on a platform
    if (this.jumping) {
 console.log ("we are going to jump from platform", this.currentPlatform )
      this.y -= this.currentSpeed;
      this.currentSpeed -= this.gravity;

      //the player lands again on the upper side of the platform
      if (this.y >= this.currentPlatform.y - Player.height - Player.margin && this.y <= this.currentPlatform.y + Player.margin) {
        this.jumping = false;
        this.currentSpeed = this.jumpSpeed;
        this.y = this.currentPlatform.y - Player.height;
      }

      this.element.style.top = this.y + "px";
      console.log(this.y);

      // PLAYER MOVES LEFT
      if (direction === "left") {
        this.x -= this.speed;
        if (this.x <= 0) {
          this.x = 0;
        }

        // PLAYER MOVES RIGHT
      } else if (direction === "right") {
        this.x += this.speed;
        if (this.x >= myGame.width - Player.width) {
          this.x = myGame.width - Player.width;
        }
      }
      this.element.style.left = this.x + "px";
          }  //end of the jump

// PLAYER MOVE ON THE SIDE --> if the player is not jumping, it can only move left-right if on a platform (so he can not move left-right while on a ladder)
    
if (this.jumping === false && this.activeLadder === false) {
myPlatforms.forEach(platform => {

       
      // PLAYER IS ON THE PLATFORM
      if (this.y >= platform.y - Player.height - Player.margin && this.y <= platform.y - Player.height + Player.margin) {


        // PLAYER MOVES LEFT
        if (direction === "left") {
          this.x -= this.speed;
          if (this.x <= 0) {
            this.x = 0;
          }
    
          // PLAYER MOVES RIGHT
        } else if (direction === "right") {
          this.x += this.speed;
          if (this.x >= myGame.width - Player.width) {
            this.x = myGame.width - Player.width;
          }
        }

      }
    });
  }

  
    //PLAYER MOVES UP
    if (direction === "up") {
      
      myLadders.forEach((ladder) => {
        ladder.left = parseFloat(ladder.element.style.left);
        ladder.y = parseFloat(ladder.element.style.top);

        if (
          this.x <= ladder.left + Ladder.width &&
          this.x + Player.width >= ladder.left &&
          this.y + Player.height >= ladder.y &&
          this.y <= ladder.y + ladder.height  && Player.currentPlatformIndex < myPlatforms.length
        ) {
          this.y -= this.speed / 5;

          if (
            this.y >= ladder.y - Player.height - Player.margin && this.y <= myPlatforms[Player.currentPlatformIndex +1].y - Player.height) {
            console.log ("Il giocatore è salito di una piattaforma")
            console.log("next ladder?", this.y > myPlatforms[Player.currentPlatformIndex + 1].y )
            Player.currentPlatformIndex++;
            this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
            this.y = this.currentPlatform.y - Player.height;
        
            this.direction = null;
            console.log("index platform after ladder up ", Player.currentPlatformIndex)
            console.log("platform after ladder up ", this.currentPlatform)
          }

          
        }
      });

    }
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
  

     //PLAYER MOVES DOWN //FINO QUI
    if (direction === "down") {
      myLadders.forEach((ladder) => {
        ladder.left = parseFloat(ladder.element.style.left);
        ladder.y = parseFloat(ladder.element.style.top);
        if (
          this.x <= ladder.left + Ladder.width &&
          this.x + Player.width >= ladder.left &&
          this.y + Player.height >= ladder.y - Player.margin &&
          this.y + Player.height <= ladder.y + ladder.height + Player.margin
        ) {
          this.y += this.speed / 5;
          if (
            this.y + Player.height >=
              ladder.y + ladder.height - Player.margin &&
            this.y + Player.height >= ladder.y + ladder.height - Player.margin
          ) {
            this.currentPlatformIndex--; // this is not working
            this.y = ladder.y - Player.height + ladder.height;
            this.direction = null;
            console.log("index platform after ladder down ", Player.currentPlatformIndex)
            console.log("platform after ladder down ", this.currentPlatform)
          }
        }
        /* this.element.style.top = this.currentPlatform.y - Player.height + "px"; */
      });
    }


    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.currentPlatform = myPlatforms[Player.currentPlatformIndex];
    // check if the player is jumping, the vertical position y is updated

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

//DEBUGGING
/* console.log("myPlayer.y + Player.height ", myPlayer.y + Player.height);
console.log("myPlayer.y ", myPlayer.y);
console.log("myPlatforms[0].y ", myPlatforms[0].y);
console.log("gap ", gap)
console.log("myPlatforms[1].y ", myPlatforms[1].y);

setInterval(()=> {
  console.log("current myPlayer.y ", myPlayer.y);
  console.log (myPlayer.y == myPlatforms[1].y - Player.height);
}, 5000)

myLadders.forEach((ladder, index) => {
  console.log(`current height of ladder number ${index} `, myLadders[index].height, "\n current ladder y de base ", parseFloat(myLadders[index].element.style.top) + myLadders[index].height, "\n current ladder y ", parseFloat(myLadders[index].element.style.top))
}) */



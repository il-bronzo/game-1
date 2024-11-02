class Enemy {
    static width = 20;
    static height = 20;

    constructor (x, y) {
        this.x = x;
        this.y = y; 
        this.speed = 0.5;
        this.enemyPlatformIndex = myPlatforms.length -1;
        this.enemyPlatform = myPlatforms[this.enemyPlatformIndex];
        console.log ("enemy platform ", this.enemyPlatform);
       
        
        this.usingLadder = false; 

        this.element = document.createElement("div");
        this.element.classList.add("enemy");
        this.element.style.width = Enemy.width + "px";
        this.element.style.height = Enemy.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        
        myGame.element.appendChild(this.element);
    }

    move() {
        
        if (!this.usingLadder) {
            this.x += this.speed;

            if (this.x > myGame.width - Enemy.width || this.x < 0) {
                this.speed *=-1;
            }
            myLadders.forEach(ladder => {
                ladder.left = parseInt(ladder.element.style.left);
                ladder.y = parseInt(ladder.element.style.top);
               
                if (this.x + Enemy.width > ladder.left + Ladder.width && this.x < ladder.left + Ladder.width/2 &&
                    this.y + Enemy.height >= ladder.y && this.y < ladder.y + ladder.height) {
                    this.usingLadder = true;
                    this.ladder = ladder;
                }
            });
        } else {
            this.y += this.speed;
            
            if (this.y + Enemy.height >= this.ladder.y + this.ladder.height) {
                this.usingLadder = false;
                if (this.enemyPlatformIndex >= 0) {
                    this.y = myPlatforms[this.enemyPlatformIndex].y - Enemy.height; 
                    this.enemyPlatformIndex--; 
                }
        }
            }
            this.element.style.left = this.x + "px";
            this.element.style.top = this.y + "px";
         }
          }

class Player {
    static height = 50; //this is only a value, but does not create visually the player. For that, I need to use this value with this.element.styel.height.
    static width = 30;
    static border = "1px solid black";
    static borderWidth = parseInt(Player.border, 10);

    constructor () {
        //visual
        this.element = document.createElement("div");
        this.element.setAttribute("id", "player");
        myGame.element.appendChild(this.element);

        this.element.style.height = (Player.height) + "px";
        this.element.style.width = (Player.width) + "px";
        this.element.style.border = Player.border;

        // initial position on the first platform
        this.element.style.left = 10 + "px";
        this.x = parseInt(this.element.style.left);
        /* this.y = firstPlatform.y; */
        this.element.style.top = (firstPlatform.y - Player.height) + 'px'
        this.y = parseInt(this.element.style.top);

        //features (speed, etc.)
        this.speed = 2;
        this.direction = null;

        //jump features
        this.jumpSpeed = 10;
        this.gravity = 0.5  ;
        this.jumping = false;

    }

    walk(direction) {
        if (direction === "left") {
            this.x -= this.speed;
            if (this.x <=0) {
                this.x =0;
            }
        } else if (direction === "right") {
            this.x += this.speed;
            if (this.x >= myGame.width - Game.borderWidth - Player.width - Player.borderWidth) {
                this.x = myGame.width - 2*Game.borderWidth - Player.width;
            }
        }
        this.element.style.left = this.x + 'px';

        // check if the player is jumping, the vertical position y is updated
        if (this.jumping) {
            this.y -= this.jumpSpeed;
            this.jumpSpeed -= this.gravity;

            if (this.y >= firstPlatform.y - Player.height) {
                this.jumping = false; 
                this.jumpSpeed = 10;
                this.y = firstPlatform.y - Player.height;
            }

            this.element.style.top = this.y + "px";
        } 
    }
    
    jump() {
            if(!this.jumping) {
                this.jumping = true; 
            }
        }
    }

const myPlayer = new Player();
console.log("myPlayer x ", myPlayer.x);
console.log("myPlayer y ", myPlayer.y);
console.log("Player width ", Player.width);


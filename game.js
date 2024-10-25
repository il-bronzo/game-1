class Game {
    static border = "3px solid rgb(110, 110, 110)";
    static borderWidth = parseInt(Game.border, 10);
    constructor () {
        this.lives = 3;
        this.element = document.querySelector('#game-area');
        this.width = this.element.getBoundingClientRect().width;
        this.height = this.element.getBoundingClientRect().height;
        this.element.style.border = Game.border;
    }
}

const myGame = new Game();

class Platform {
    static height = 30;
    static border = "2px solid black";
    static borderWidth = parseInt(Platform.border, 10);
    constructor (x, y) { 
    /* initial position */
    this.x = x;
    this.y = y;
   /*  this.height = Platform.height; */
    /* this.width = width; */

    /* I create the element in the document  */
    this.element = document.createElement("div");
    this.element.classList.add("platform");

    /* dinamic position, therefore I use element.style to update it */
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y+ "px";
    /* this.element.style.width = (this.width) + "px"; */
    this.element.style.height = (Platform.height) + "px";
    this.element.style.border = Platform.border;


    myGame.element.appendChild(this.element);
    }
}


const gap = (myGame.height - Game.borderWidth - 4*Platform.height)/4;
console.log ("myPlatform border width ", Platform.borderWidth)
console.log("Platform.height ",Platform.height);
console.log ("Platform border width ",Platform.borderWidth)
console.log("gap ", gap);
console.log("gamearea height ", myGame.height);
console.log("gamearea border width ", Game.borderWidth);

const myPlatforms = [
    new Platform(0, myGame.height - Game.borderWidth - Platform.height - Platform.borderWidth), 
    new Platform(0, myGame.height - Game.borderWidth - 2 * Platform.height - Platform.borderWidth - gap),
    new Platform(0, myGame.height - 3 * Platform.height - Platform.borderWidth - 2 * gap),
    new Platform(0, myGame.height - 4 * Platform.height - Platform.borderWidth - 3*gap)
]

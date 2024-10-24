class Game {
    constructor () {
        this.lives = 3;
        this.element = document.querySelector('#game-area');
        this.width = this.element.getBoundingClientRect().width;
        this.height = this.element.getBoundingClientRect().height;
    }
}

const myGame = new Game();

class Platform {
    static height = 30;
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
    const styleHeight = this.element.style.height;
    console.log("this.element.style.height ", styleHeight);


    myGame.element.appendChild(this.element);
    }
}
const gap = (myGame.height - Platform.height)/5.5;
console.log("Platform.height ",Platform.height);
console.log ("Platform border width ",Platform.borderWidth)
console.log("gap ", gap);
console.log("gamearea height ", myGame.height);
console.log("gamearea border width ", Game.borderWidth);
/* ARRIVATO QUI */

const myPlatforms = [
    new Platform(0, myGame.height - Platform.height - Platform.borderWidth), 
    new Platform(0, myGame.height - 2 * Platform.height - gap),
    new Platform(0, myGame.height - 3 * Platform.height - 2 * gap),
    new Platform(0, myGame.height - 4 * Platform.height - 3*gap)
]

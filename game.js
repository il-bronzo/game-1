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
console.log("game area width ", myGame.width);

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

class Ladder {
    constructor (platform1, platform2) {
        this.platform1 = platform1;
        this.platform2 = platform2;
        this.width = 30;
        this.height = gap + Platform.height + Platform.borderWidth;

        //I create the elements
        this.element = document.createElement("div");
        this.element.classList.add("ladder");

        this.element.style.height = this.height + "px";
        this.element.style.width = this.width + "px";
        const randomNum = Math.random(); //I create this number to generate a random x of the ladder. I will then detract o,5 to generate a second ladder that is far from the previous one like the half of game area width
        this.element.style.left = randomNum*myGame.width + "px";
        this.element.style.top = (this.platform1.y - gap - Platform.height) + "px";


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
    new Platform(0, myGame.height - Game.borderWidth - Platform.borderWidth - Platform.height), 
    new Platform(0, myGame.height - Game.borderWidth - Platform.borderWidth - 2 * Platform.height - gap),
    new Platform(0, myGame.height - Game.borderWidth - Platform.borderWidth - 3 * Platform.height - 2 * gap),
    new Platform(0, myGame.height - Game.borderWidth - Platform.borderWidth - 4 * Platform.height - 3*gap)
] // I have created the array of platforms

console.log("myGame height ", myGame.height);
console.log("Game borderwidth ", Game.borderWidth);
console.log("y de la primera plataforma ", myPlatforms[0].y);
console.log("y de la segunda plataforma ", myPlatforms[1].y);
const firstPlatform = myPlatforms[0]; // I select the first platform, this will be used to place the player on it (player.js)


function createLadders (platforms) {
    platforms.forEach((platform, index) => {
        if (index < 3) {
            new Ladder (platform, platforms[index+1]);
        }
    })
}

createLadders (myPlatforms);
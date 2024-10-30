class Game {
    constructor () {
        this.lives = 3;
        this.element = document.querySelector('#game-area');
        this.width = this.element.getBoundingClientRect().width;
        this.height = this.element.getBoundingClientRect().height;
    }
}

const myGame = new Game();
console.log("game area width ", myGame.width);

class Platform {
    static height = 30;
    constructor (x, y) { 

    /* initial position */
    this.x = x;
    this.y = y;

    /* I create the element in the document  */
    this.element = document.createElement("div");
    this.element.classList.add("platform");

    /* dinamic position, therefore I use element.style to update it */
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y+ "px";
    this.element.style.height = (Platform.height) + "px";

    myGame.element.appendChild(this.element);
    }
}  

class Ladder {
        static width = 30;
    constructor (platform1, platform2) {
        this.platform1 = platform1;
        this.platform2 = platform2;
        this.width = Ladder.width;
        this.height = gap + Platform.height;

        //I create the elements
        this.element = document.createElement("div");
        this.element.classList.add("ladder");

        this.element.style.height = this.height + "px";
        this.element.style.width = this.width + "px";
        this.element.style.top = (this.platform1.y - gap - Platform.height) + "px";

        myGame.element.appendChild(this.element);
    }
}


const gap = (myGame.height - 4*Platform.height)/4;

const myPlatforms = [
    new Platform(0, myGame.height - Platform.height), 
    new Platform(0, myGame.height - 2 * Platform.height - gap),
    new Platform(0, myGame.height - 3 * Platform.height - 2 * gap),
    new Platform(0, myGame.height - 4 * Platform.height - 3*gap)
] 

const myLadders = [];
function createLadders(platforms) {
    platforms.forEach((platform, index) => {
        if (index < 3) {
            const randomX = Math.floor(Math.random()*(myGame.width - Ladder.width));
            const ladder1 = new Ladder (platform, platforms[index+1]);
            ladder1.element.style.left = randomX + "px";
            let randomX2 = randomX + (myGame.width / 3);
            if (randomX + randomX2 > myGame.width) {
                randomX2 = randomX - (myGame.width / 3);
            }

            const ladder2 = new Ladder (platform, platforms[index+1]);
            ladder2.element.style.left = randomX2 + "px";
            myLadders.push(ladder1, ladder2);
        }
    });

}

createLadders (myPlatforms);
console.log("my ladders ", myLadders);
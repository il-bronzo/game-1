class Player {
    constructor () {
        this.element = document.createElement("div");
        this.element.setAttribute("id", "player");
        myGame.element.appendChild(this.element);
    }
}

const newPlayer = new Player();


class Player {
    constructor () {
        this.element = document.createElement("div");
        this.element.setAttribute("id", "player");
        myGame.element.appendChild(this.element);

        this.element.style.left = '10px';
        this.element.style.top = (firstPlatform.y - this.element.getBoundingClientRect().height) + 'px'
    }
}

const newPlayer = new Player();


const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(.5, 'green');
gradient.addColorStop(1, 'blue');

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > .975) {
            this.y = 0;
            context.fillStyle = 'DeepSkyBlue';
        } else {
            context.fillStyle =/* gradient; */'#0aff0a';
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }

    // private function
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, .075)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    matrixMessage();
    requestAnimationFrame(animate);
}

animate(0);
setNewTabButtons();

function matrixMessage() {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.fillRect(canvas.width / 2 - 140, canvas.height / 2 - 30, 280, 45);
    ctx.stroke();
    ctx.fillStyle = 'lightGray';
    ctx.fillText('welcome to matrix', canvas.width / 2, canvas.height / 2, 800);
}

function setNewTabButtons() {

}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
})
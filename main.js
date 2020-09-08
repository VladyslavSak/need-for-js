/* Game board */
const score = document.querySelector('.score');
const start = document.querySelector('.game__start');
const gameArea = document.querySelector('.game__area');

/* Car */
const car = document.createElement('div');
car.classList.add('game__car');


/* Settings */
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3
};

/*Game logic*/
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame() {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);

    if (setting.start) {
        requestAnimationFrame(playGame);
    }
}

function playGame() {
    requestAnimationFrame(playGame);
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

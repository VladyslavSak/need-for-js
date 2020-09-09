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
    speed: 3,
    traffic: 2
};

/*Game logic*/
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
    start.classList.add('hide');

    for (let i = 0; i < getQuantityElements(50); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = i * 80 + 'px';
        line.y = i * 80;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
       const enemy = document.createElement('div');
       let enemyBackgroundNumber = i % 2 === 0 ? '2' : '';
       enemy.classList.add('game__enemy');
       enemy.y = -100 * setting.traffic * (i + 1);
       enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
       enemy.style.top = enemy.y + 'px';
       enemy.style.background = 'url("./image/enemy'+ enemyBackgroundNumber +'.png") no-repeat center / contain';
       gameArea.appendChild(enemy);
    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    moveRoad();
    moveEnemy();
    if (setting.start) {
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < gameArea.offsetWidth - 50) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y < gameArea.offsetHeight - car.offsetHeight) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame);
    }
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemies = document.querySelectorAll('.game__enemy');
    enemies.forEach(enemy => {
        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px';

        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * setting.traffic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

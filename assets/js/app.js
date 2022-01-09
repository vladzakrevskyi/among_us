const controlButtons = document.querySelectorAll(".js-user-button");
const screenButtons = document.querySelectorAll(".js-memory-button");
const startGame = document.querySelector(".js-start-game");
const resetGame = document.querySelector(".js-reset-game");
const ledContainer = document.querySelector(".js-led-container");
let led = document.querySelectorAll(".js-led");
const notification = document.querySelector('.js-notification');
const selectList = document.querySelector(".js-select");

let screenButtonBoard = [], playerButton = [];
let testPosition = 0, position = 0, turn = 1, score = 0, working = false, interval;
let selectArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

for (let i = 1; i < selectArray.length; i++) {
    const option = document.createElement("option");
    option.value = selectArray[i];
    option.text = selectArray[i];
    if (i === 4) {
        option.defaultSelected = true;
    }
    selectList.appendChild(option);
}

selectList.addEventListener('change', function () {
    ledContainer.innerHTML = '';
    for (let i = 0; i < selectList.value; i++) {
        let div = document.createElement('div');
        div.className = 'led js-led';
        div.setAttribute('data-id', i + 1);
        ledContainer.appendChild(div);
    }

    position = 0;
    turn = 1;
    score = 0;
    screenButtonBoard = [];
});


function gameStart() {
    if (score === parseInt(selectList.value)) {
        gameWon();
    } else {
        notification.innerHTML = 'Game Started';
        playerButton = [];
        getButtonScreen();
        turnOn();
        buttonActive();
    }
}

function gameEnd() {
    turnOn();
    position = 0;
    turn = 1;
    score = 0;
    notification.innerHTML = 'You lost';
    buttonDisable();
    resetLed();
}

function gameWon() {
    position = 0;
    turn = 1;
    score = 0;
    screenButtonBoard = [];
    notification.innerHTML = 'You won';
    buttonDisable();
}

function gameReset() {
    notification.innerHTML = 'Loading...';
    position = 0;
    turn = 1;
    score = 0;
    screenButtonBoard = [];
    setTimeout(gameStart, 700);
    resetLed();
}

resetGame.addEventListener("click", () => {
    gameReset();
});

startGame.addEventListener("click", () => {
    gameReset();
    buttonActive();
});

controlButtons.forEach(button => {
    button.addEventListener("click", () => {
        getButtonControl(event.target.id)
        button.classList.add('active');
        setTimeout(function () {
            button.classList.remove('active');
        }, 100);
    })
});

function getButtonControl(value) {
    if (!working) {
        playerButton.push(Number.parseInt(value));
        userClickedButton();
    }
}

function getButtonScreen() {
    let indexOfButton = Math.floor(Math.random() * 16);
    screenButtonBoard.push(indexOfButton);
}

function turnOn() {
    working = true;
    screenButtons[screenButtonBoard[position]].classList.add("active");
    setTimeout(turnOff, 500);
}

function turnOff() {
    screenButtons[screenButtonBoard[position]].classList.remove("active");
    position++;

    if (position < screenButtonBoard.length) {
        setTimeout(turnOn, 500);
    } else {
        position = 0;
        working = false;
    }
}

function resetLed() {
    led.forEach(ledLamp => {
        ledLamp.classList.remove('led-on');
    })
}


function userClickedButton() {
    if (playerButton[testPosition] === screenButtonBoard[testPosition]) {
        testPosition++;
        if (testPosition == screenButtonBoard.length) {
            led = document.querySelectorAll(".js-led");
            testPosition = 0;
            score += 1;
            led.forEach(ledLamp => {
                const dataId = parseInt(ledLamp.getAttribute('data-id'));
                if (dataId === score) {
                    ledLamp.classList.add('led-on');
                }
            });
            turn++;
            gameStart();
        }
    } else {
        gameEnd();
        resetLed();
        testPosition = 0;
    }
}

function buttonActive() {
    controlButtons.forEach(button => {
        button.classList.remove('blocked');
    })
}

function buttonDisable() {
    controlButtons.forEach(button => {
        button.classList.add('blocked');
    })
}

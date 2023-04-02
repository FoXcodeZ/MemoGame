import * as GLOBAL from './globals.js';
import * as BOARD from "./board.js";
import * as GUI from "./gui.js";

export let cardsChosen = [];
export let cardsChosenId = [];
export let cardsWon = [];

let intervalId;

export function reset() {
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
}

export function start() {
    clearInterval(intervalId);
    BOARD.clear();
    BOARD.reset();
    reset();
    GUI.reset();
    const mySelect = document.getElementById("my-select");
    const selectedOption = mySelect.value;

    switch(selectedOption) {
        case 'easy':
            BOARD.create(GLOBAL.GameLevel.easy);
            break;
        case 'normal':
            BOARD.create(GLOBAL.GameLevel.normal);
            break;
        case 'hard':
            BOARD.create(GLOBAL.GameLevel.hard);
            break;
    }
     intervalId = setInterval(GUI.updateTimer, 1000);
}
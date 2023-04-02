import * as GAME from './game.js';
import * as GLOBAL from "./globals.js";
import * as BOARD from './board.js';

document.addEventListener('DOMContentLoaded', onPageLoaded);



function onPageLoaded() {
    const newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', GAME.start);
}
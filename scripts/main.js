import * as GAME from './game.js';

document.addEventListener('DOMContentLoaded', onPageLoaded);

function onPageLoaded() {
    const newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', GAME.start);
}
import * as GLOBAL from './globals.js';
import * as GUI from './gui.js';

let deck = [];
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []

export function createDeck(_gameLevel) {
    let sliceDeck;
    switch(_gameLevel)
    {

        case GLOBAL.GameLevel.easy:
            sliceDeck = GLOBAL.possibleCards.slice(0, 2);
            break;
        case GLOBAL.GameLevel.normal:
            sliceDeck = GLOBAL.possibleCards.slice(0, 8);
            break;
        case GLOBAL.GameLevel.hard:
            sliceDeck = GLOBAL.possibleCards.slice(0, 18);
            break;
    }
    deck = sliceDeck.concat(sliceDeck);
    deck.sort( () => 0.5 - Math.random());
}

export function isGameLevelCorrect(_boardLevel)
{
    switch(_boardLevel)
    {
        case GLOBAL.GameLevel.easy:
            return true;
        case GLOBAL.GameLevel.normal:
            return true;
        case GLOBAL.GameLevel.hard:
            return true;
        default:
            return false;
    }
}


export function create(_gameLevel) {
    const gameArea = document.querySelector('.game-area');

    if (!isGameLevelCorrect(_gameLevel)) {
        return;
    }

    createDeck(_gameLevel);
    let id = 0;

    for (let column = 0; column < _gameLevel.columns; column++) {
        const rowElement = document.createElement('div');
        rowElement.setAttribute('class', 'row');
        gameArea.appendChild(rowElement);
        for (let row = 0; row < _gameLevel.rows; row++) {
            const card = document.createElement('img');
            card.src = '../images/Card1.png';
            card.setAttribute('data-id', id.toString());
            card.addEventListener('click', flipCard);
            card.width = 100;
            card.height = 100;
            rowElement.appendChild(card);
            id++;
        }
    }
}

export function clear() {
    const gameArea = document.querySelector('.game-area');
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }
}

export function flipCard() {
    if(GUI.playerLose || GUI.playerWon) {
        return;
    }

    let cardId = this.getAttribute('data-id');
    cardsChosen.push(deck[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', deck[cardId].image);
    if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500);
    }
}

export function checkForMatch() {
    if(GUI.playerLose || GUI.playerWon) {
        return;
    }
    const cards = document.querySelectorAll('img')
    const scoreDisplay = document.querySelector('#score');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if(optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src',  GLOBAL.CARD_REVERSE)
        cards[optionTwoId].setAttribute('src', GLOBAL.CARD_REVERSE);
        GUI.changeScoreInfoText("You have clicked the same image!");
        setTimeout(GUI.clearScoreInfoText, 1000);
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', GLOBAL.CARD_BLANK);
        cards[optionTwoId].setAttribute('src',  GLOBAL.CARD_BLANK);
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        GUI.changeScoreInfoText("You found a match");
        setTimeout(GUI.clearScoreInfoText, 1000);
    } else {
        cards[optionOneId].setAttribute('src', GLOBAL.CARD_REVERSE);
        cards[optionTwoId].setAttribute('src', GLOBAL.CARD_REVERSE);
        GUI.changeScoreInfoText('Sorry, try again');
        setTimeout(GUI.clearScoreInfoText, 1000);
    }
    cardsChosen = []
    cardsChosenId = []

    scoreDisplay.textContent = cardsWon.length.toString();
    if  (cardsWon.length === deck.length/2) {
        setTimeout(GUI.showWinInfo, 1010);
    }
}


export function reset() {
    deck = [];
    cardsChosen = []
    cardsChosenId = []
    cardsWon = []
}
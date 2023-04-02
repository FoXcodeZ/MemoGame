export let timeValue = 50;
export let playerWon = false;
export let playerLose = false;

export function showLoseInfo() {
    playerLose = true;
    changeScoreInfoText("Sorry. You lost the game!");
    //setTimeout(clearScoreInfoText, 5000);
}

export function showWinInfo() {
    playerWon = true;
    changeScoreInfoText("Congratulations. You Won!");
    //setTimeout(clearScoreInfoText, 5000);
}

export function updateTimer() {
    if(!playerWon && !playerLose)
    {
        const timeText = document.querySelector('#time');
        timeText.textContent = timeValue.toString();
        if(timeValue === 0) {
            setTimeout(showLoseInfo, 1010);
            return 0;
        }
        timeValue--;
        return timeValue;
    }
}

export function changeScoreInfoText(_text) {
    const scoreInfo = document.querySelector('#info');
    scoreInfo.textContent = _text;
}

export function clearScoreInfoText() {
    const scoreInfo = document.querySelector('#info');
    scoreInfo.textContent = "_";
}

export function reset() {
    timeValue = 50;
    playerWon = false;
    playerLose = false;
    clearScoreInfoText();
}
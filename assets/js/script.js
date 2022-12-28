

let gameInstructions = document.getElementById('instructions');


function showGameInstructions() {
    gameInstructions.classList.remove('hide');
}

function hideGameInstructions(){
    gameInstructions.classList.add('hide');
}

let howToPlay = document.getElementById('how-to-play');
howToPlay.addEventListener('click', showGameInstructions);

let hideHowToPlay = document.getElementById('close');
hideHowToPlay.addEventListener('click', hideGameInstructions);

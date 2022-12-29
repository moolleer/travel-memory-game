

let gameInstructions = document.getElementById('instructions');
let feedbackForm = document.getElementById('feedback');


function showGameInstructions() {
    gameInstructions.classList.remove('hide');
}

function hideGameInstructions(){
    gameInstructions.classList.add('hide');
}

function showFeedbackForm() {
    feedbackForm.classList.remove('hide');
}

function hideFeedbackForm() {
    feedbackForm.classList.add('hide');
}

// Eventlisteners

let howToPlay = document.getElementById('how-to-play');
howToPlay.addEventListener('click', showGameInstructions);

let hideHowToPlay = document.getElementById('close');
hideHowToPlay.addEventListener('click', hideGameInstructions);

let feedbackButton = document.getElementById('feedback-button');
feedbackButton.addEventListener('click', showFeedbackForm);

let closeForm = document.getElementById('close-form');
closeForm.addEventListener('click', hideFeedbackForm);

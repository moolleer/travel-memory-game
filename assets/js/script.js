//create an array of travel images
const itemsArray = [
    {name: 'plane', image: 'plane.png'},
    {name: 'camera', image: 'camera.png'},
    {name: 'drink', image: 'drink.png'},
    {name: 'flip-flop', image: 'flip-flop.png'},
    {name: 'map', image: 'map.png'},
    {name: 'passport', image: 'passport.png'},
    {name: 'photos', image: 'photos.png'},
    {name: 'suitcase', image: 'suitcase.png'},
];



let gameInstructions = document.getElementById('instructions');
let feedbackForm = document.getElementById('feedback');
let showGameGrid = document.getElementById('game-modual');


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

function showGame() {
    showGameGrid.classList.remove('hide');
    
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

let startGameButton = document.getElementById('new-game');
startGameButton.addEventListener('click', showGame);

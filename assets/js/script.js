const blurContainer = document.getElementById('blur-container');
const gameTimeContainer = document.getElementById('game-time');
const cardTurnsContainer = document.getElementById('card-turns');

const gameInstructions = document.getElementById('instructions');
const feedbackForm = document.getElementById('feedback');
const showGameGrid = document.getElementById('game-modual');
const gameGrid = document.getElementById('game-grid');
const container = document.querySelector('#game-grid');

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

//Duplicate the array
const fullGameGrid = itemsArray.concat(itemsArray);

let turnedCard = false;
let firstCard, secondCard;
let lockGrid = false;

let cardsMatched = 0;
let turnScore = 0;
let startGameTime = true;

let time;
let minutes = 0;
let seconds = 0;

/**
 * Randomize the game grid 
 */
function shuffleCards() {
    fullGameGrid.sort(function() {
    return 0.5 - Math.random();
})
}

//Functions for showing and hiding feedbackform and instructions
function showGameInstructions() {
    gameInstructions.classList.remove('hide');
    if(blurContainer.classList.contains('hide')) blurContainer.classList.remove('hide');
    blurContainer.classList.add('blur');
}

function hideGameInstructions(){
    gameInstructions.classList.add('hide');
    blurContainer.classList.remove('blur');
}

function showFeedbackForm() {
    feedbackForm.classList.remove('hide');
    if(blurContainer.classList.contains('hide')) blurContainer.classList.remove('hide');
    blurContainer.classList.add('blur');
}

function hideFeedbackForm() {
    feedbackForm.classList.add('hide');
    blurContainer.classList.remove('blur');
}

/**
 * Setup the gamegrid by creating each card and add eventlisteners
 */
function showGame() {
    showGameGrid.classList.remove('hide');
    if(blurContainer.classList.contains('hide')) blurContainer.classList.remove('hide');
    shuffleCards();
    console.log(fullGameGrid);
    
    for (let i = 0; i < fullGameGrid.length; i++) {
        gameGrid.innerHTML +=`
        <div class="card" data-description="${fullGameGrid[i].name}">
        <div class="card-front"><i class="fa-solid fa-plane-up"></i></div>
        <div class="card-back">
        <img src="assets/images/${fullGameGrid[i].image}"></div>
        </div>
        `;   
    }
    
    //Add eventlistener to each card after cards been added to the grid
    const memoryCards = document.querySelectorAll('.card');
        memoryCards.forEach(card => {
        card.addEventListener('click', turnCard);
    });

    blurContainer.classList.add('blur');
}

/**
 * click function for memorycards, and for turn class css effects 
 * code adapted from https://marina-ferreira.github.io/tutorials/js/memory-game/
 */
function turnCard() {
    if (startGameTime) startTime();

    if (lockGrid) return; //if true the rest wont be executed
    if (this === firstCard) return; //if same card clicked two times after each other
    this.classList.add('turn');

    if (!turnedCard){
        turnedCard = true; //first klick on a card
        firstCard = this;
        
    } else {
        turnedCard = false; //second click on a card
        secondCard = this;
        
        checkMatch();
    }
}

/**
 * Starts the timer for the game
 */
function startTime () {
    time = setInterval(function() {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
        gameTimeContainer.innerHTML = minutes +" : " + seconds;
    }, 1000);
    startGameTime = false;
}

/**
 * Stops the timer for the game
 */
function stopTime() {
    clearInterval(time);
}

/**
 * Reseting card values so card can be clicked again
 */
function resetGrid() {
    turnedCard = false;
    lockGrid = false;

    firstCard = null;
    secondCard = null;
}

/**
 * Check if cards match and prevent randomized card clicks 
 */
function checkMatch() {
    //for a match, prevent the cards to be clicked and turned again
    if (firstCard.dataset.description === secondCard.dataset.description) {
        firstCard.removeEventListener('click', turnCard);
        secondCard.removeEventListener('click', turnCard);

        ++cardsMatched;
        ++turnScore;
        cardTurnsContainer.innerHTML = turnScore;
        checkCardMatches();
        resetGrid();
    } else {
        lockGrid = true; //lock the grid until cards have been turned

        setTimeout(() => { //prevents the first card to turn before second is clicked
            if(firstCard !== null) firstCard.classList.remove('turn');
            if(secondCard !== null) secondCard.classList.remove('turn');

        ++turnScore;
        cardTurnsContainer.innerHTML = turnScore;
        resetGrid();
        }, 800);
    }
}

/**
 * checks if all cards are matched and if so stops the game and show game end message
 */
function checkCardMatches() {
    if (cardsMatched === 8) {
        stopTime();
        finishedGame(); 
    }  
}

/**
 * Show a finished game message and remove focus from the background
 */
function finishedGame() {
    blurContainer.classList.remove('hide');
    showGameGrid.classList.add('hide');
    blurContainer.classList.add('set-background');

    blurContainer.innerHTML +=`
    <div id="game-end-msg">
    <h2>You matched all pairs!!!</h2>
    <p>Your time was: ${minutes}: ${seconds} and your number of turns was: ${turnScore}.</p>
    <p>Try again to beat your time and number of turns!</p>
    <button class="btn" id="reset-game-btn"type="btn" type="button">Try Again</button>
    <p>Close and return</p>
    <button class="close-btn" id="close" type="button" ><i class="fa-solid fa-x"></i></button>
    </div>
    `; 
        
    let resetGameBtn = document.getElementById('reset-game-btn');
    resetGameBtn.addEventListener('click', tryAgain);
    let closeBtn = document.getElementById('close');
    closeBtn.addEventListener('click', closeGame);
}

//Functions for clearing and reseting the game
function tryAgain() {
    blurContainer.innerHTML= "";
    blurContainer.classList.add('hide');
    removeBlurContBackground();
    clearGame();
    showGame();
}

function closeGame() {
    blurContainer.classList.add('hide');
    blurContainer.innerHTML= "";
    removeBlurContBackground();
    clearGame();
}

function returnHome() {
    showGameGrid.classList.add('hide');
    blurContainer.classList.remove('blur');
    blurContainer.classList.add('hide');
    removeBlurContBackground();
    clearGame();
}

function removeBlurContBackground() {
    if(blurContainer.classList.contains('set-background')) blurContainer.classList.remove('set-background');
}

/**
 * Restarts the game, turn back all cards and removing all cards before opening up a new game
 */
function restartGame() {
    clearGame();
    if(secondCard !== null) secondCard.classList.remove('turn'); 
    if(secondCard !== null) secondCard.classList.remove('turn'); 
    showGame(); 
}

/**
 * Resets the game to initial values
 */
function clearGame() {
    stopTime();

    minutes = 0;
    seconds = 0;
    gameTimeContainer.innerHTML = minutes +" : " + seconds;

    cardsMatched = 0;
    turnScore = 0;
    cardTurnsContainer.innerHTML = turnScore;
    startGameTime = true;

    removeAllChildNodes(container);
    resetGrid(); 
}

/**
 * Remove all cards from the grid
 */
function removeAllChildNodes(parent) {
    while (gameGrid.firstChild) {
        gameGrid.removeChild(gameGrid.firstChild);
    }
}

//Eventlisteners
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

let returnHomeButton = document.getElementById('home-button');
returnHomeButton.addEventListener('click', returnHome);

let restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

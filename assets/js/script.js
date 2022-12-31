

let gameInstructions = document.getElementById('instructions');
let feedbackForm = document.getElementById('feedback');
let showGameGrid = document.getElementById('game-modual');
let gameGrid = document.getElementById('game-grid');


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

/*Duplicate the array and randomize fullGameGrid for each load
*code adapted from https://www.codewithrandom.com/2022/11/05/memory-game-using-javascript/
*/
const fullGameGrid = itemsArray.concat(itemsArray);

fullGameGrid.sort(function() {
    return 0.5 - Math.random();
})

//Functions for showing and hiding feedbackform and instructions
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
//Setup the gamegrid by creating each card and add eventlisteners
function showGame() {
    showGameGrid.classList.remove('hide');
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
}

/*click function for memorycards, and for turn class css effects
* code adapted from https://marina-ferreira.github.io/tutorials/js/memory-game/
*/
let turnedCard = false;
let firstCard, secondCard;
let lockGrid = false;

let cardsMatched = 0;
let turnScore = 0;
let startGameTime = true;

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

const gameTimeContainer = document.getElementById('game-time');
let time;
let minutes = 0;
let seconds = 0;

//starts the timer for the game
function startTime () {
    time = setInterval(function() {
        seconds++;
        if (seconds === 59) {
            minutes++;
            console.log(minutes);
            seconds = 0;
        }
        gameTimeContainer.innerHTML = minutes +" : " + seconds;
    }, 1000);
    startGameTime = false;
}
//reseting card values so card can be clicked again
function resetGrid() {
    turnedCard = false;
    lockGrid = false;

    firstCard = null;
    secondCard = null;
}



//check if cards match
function checkMatch() {
    //for a match, prevent the cards to be clicked and turned again
    if (firstCard.dataset.description === secondCard.dataset.description) {
        firstCard.removeEventListener('click', turnCard);
        secondCard.removeEventListener('click', turnCard);

        ++cardsMatched;
        ++turnScore;
        checkCardMatches();
        resetGrid();
    } else {
        lockGrid = true; //lock the grid until cards have been turned

        setTimeout(() => { //prevents the first card to turn before second is clicked
        firstCard.classList.remove('turn');
        secondCard.classList.remove('turn');

        ++turnScore;
        console.log(turnScore);
        resetGrid();// 
    }, 800);
    }
}

//checks if all cards are matched
function checkCardMatches() {
    if (cardsMatched === 8) console.log("Grattis du klarade det!");
}

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

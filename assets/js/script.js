

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

/*Duplicate the itemsArray, 
*code adapted from https://www.codewithrandom.com/2022/11/05/memory-game-using-javascript/
*/
const fullGameGrid = itemsArray.concat(itemsArray);

/*Randomize fullGameGrid for each load
*code adapted from https://www.codewithrandom.com/2022/11/05/memory-game-using-javascript/
*/
fullGameGrid.sort(function() {
    return 0.5 - Math.random();
})


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
        <div class="card" data-card-value="${fullGameGrid[i].name}">
        <div class="card-front">?</div>
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

function turnCard() {
    this.classList.toggle('flip');
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

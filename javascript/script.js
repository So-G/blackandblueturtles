//----------
// Variables
//----------

// gameArea: Grab HTML containing element (id)
const gameArea = document.querySelector('#game-area')

// fundation: Grab HTML element first bloc (fundation) (by id)
const fundation = document.querySelector('#fundation')

// displayScore & displayHighscore
const displayScore = document.querySelector('#display-score')
const displayHighscore = document.querySelector('#display-highscore')

let currentScore = 0
let highscore = 0
const highscores = []
/*
Array of objects:
- playerName: John Doe
- score: 1234
*/

let speed = 1

let isStarted = false

//----------
// Functions
//----------

// Function = "Animation" -- joris
/*  animation lunched => event.listener(click) => stop animation
using js   define status of bloc (isStarted:true/false) then switch true/false by event.click

document.addEventListener('keyup' || 'click', event => {
  if (event.code === 'Space') {
    if (isStarted === false){
      isStarted = true
    }
  }
})
gameArea.addEventListener('key === 32' || 'click', function (event) 
{
    if (isStarted = false){
      isStarted = true 
    })
  } 

buttonElement.addEventListener('click' || 'keydown', function (event)) {
  if(isStarted = true){
    stopAnimation
  };if (isStarted = false){
      isStarted = true 
    })
});
let stopAnimation
const running = lastBlock.style.animationPlayState === 'running';
lastBlock.style.animationPlayState = running ? 'paused' : 'running';


 */

// Function resizeBloc : resize the current element / bloc (div) || or loose ??? --Do -

const resizeCurrentElement = () => {
  // Select the current bloc : getElement
  const currentElement = document.querySelector('.block:last-of-type')
  const leftMovingBlock = currentElement.getBoundingClientRect().x
  const rightMovingBlock = currentElement.getBoundingClientRect().right

  // Select the previous bloc : ~ node.previousSibling
  const previousElement = currentElement.previousElementSibling // ou document.queryS
  const leftFixedBlock = previousElement.getBoundingClientRect().x
  const rightFixedBlock = previousElement.getBoundingClientRect().right

  // if we are here it means that both bloc are not equal
  if (leftFixedBlock < leftMovingBlock && leftMovingBlock < rightFixedBlock) {
    // if x is between [ab]
    const resizedWidth =
      previousElement.offsetWidth - (rightMovingBlock - rightFixedBlock) // so, y = b
  } else if (
    leftFixedBlock < rightMovingBlock &&
    rightMovingBlock < rightFixedBlock
  ) {
    // if y is between [ab]
    const resizedWidth =
      previousElement.offsetWidth - (leftMovingBlock - leftFixedBlock) // so, x = a
  }
  // set the new size to the element
  currentElement.offsetWidth = resizedWidth //
}

// createElement creates a new block --Ed
function createElement() {
  // 1) create element: document.createElement("div")
  const newElement = document.createElement('div')
  // grab the last bloc element (of class)
  const lastBlock = document.querySelector('.block:last-of-type')
  // 2) Set width from previous bloc, height, margin and class
  newElement.classList.add('block')
  newElement.classList.add('new-block')
  newElement.style.width = `${lastBlock.offsetWidth}px`
  newElement.style.marginLeft = `${100 + currentScore}px`
  // 3) Set color: using hsl, hue + 10 * score
  newElement.style.background = `hsl(${254 + 10 * currentScore}, 60%, 35%)`
  // 4) append child block to the container (gameArea)
  gameArea.appendChild(newElement)
  return newElement
}

/** Function blocAnimation 
- to add / create animation (css) for the new element / bloc (div) --Solene */
function speedDefinition (htmlElement){
  let period = 1 / speed
  htmlElement.style.animationDuration = `${3 + period}s`
  // Speed to be adjusted
}
/**change class + JS (toggle?)
set speed +1
*/

// Function = "countScore" (and sets highscore if score > highscore) && save it to localStorage --joris
/* score = (number of <div> created by function create new element) save the score at the end of game
  
myScore = newBlock.length

localStorage.setItem(myName,myScore);


 */

// function startGame
// Function to restart the game : delete all blocs --Solene
function startGame () {
  const deleteBlocks = document.querySelectorAll(".new-block");
    for (let i = 0; i < deleteBlocs.length; i++) { 
    deleteBlocks[i].remove ();
    score = 0;
 }
  /**const resetScore = document.getElementById('.display-score');
  resetScore.innerHTML = "0"
 /** when bloc = 0 (ie if click when moving bloc is outside of area previous fixed bloc)
  querySelectorAll(div) + function remove div (movingbloc.remove()?) so that only fixed bloc stays 
+ reset score to 0
*/

// fetchHighscore Fetch highscores from localStorage and assign them to variable highscore --Ed
function fetchHighscore() {
  // 1) fetch the data : localStorage.getItem('highscores')
  // 2) parse it : JSON.parse
  const locSto = JSON.parse(localStorage.getItem('highscores'))
  // Sort by highscore
  locSto.sort((a, b) => b.score - a.score)
  // 3) Assign it to highscore
  highscore = locSto[0].score
  // 3) Display it
  displayHighscore.textContent = `Highscore: ${highscore}`
}

const eventHandler = () => {
  if ((isStarted = false)) {
    isStarted = true
    createElement()
    startAnimation()
    stopAnimation()
    if (leftMovingBlock !== leftFixedBlock) {
      //variables définies ?
      resizeCurrentElement()
    }
    countScore()
    fetchHighscore
  }
}

//----------------
// Event Listeners
//----------------

// Create an event listener to start the game && 'drop' the bloc && restart the game
// on click, spacebar, tap event -- Do

/* 
Start the game: 
When start button is clicked, call the createElement function
When spacebar is pressed, call the createElement function

Drop the bloc : 
When user click, call the drop function
When spacebar is pressed, call the drop function

Restart the game
When user click, go back to the initial game 
When spacebar, go back to the initial game
*/

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

// Instruction
const instructions = gameArea.querySelectorAll('p')

let currentScore = 0
let highscore = 0
const highscores = []
/*
Array of objects:
- playerName: John Doe
- score: 1234
*/

let speed = 1
let playerName = ''
let currentBlockWidth
let isStarted = false

//----------
// Functions
//----------
// Function = "stopAnimation" -- joris
/*  animation lunched => event.listener(click) => stop animation
using js   define status of bloc (isMooving:true/false) then switch true/false by event.click
*/
function stopAnimation() {
  const movingBlock = document.querySelector('.new-block:last-of-type')
  movingBlock.style.animationPlayState = 'paused'
}

// Function resizeBloc : resize the current element / bloc (div) || or loose ??? --Do -

const resizeCurrentElement = () => {
  // Select the current bloc : getElement
  const currentBlock = document.querySelector('.block:last-of-type')
  const leftMovingBlock = currentBlock.getBoundingClientRect().left
  const rightMovingBlock = currentBlock.getBoundingClientRect().right

  // Select the previous bloc : ~ node.previousSibling
  const previousBlock = document.querySelector('.block:nth-last-of-type(2)')
  const leftFixedBlock = previousBlock.getBoundingClientRect().left
  const rightFixedBlock = previousBlock.getBoundingClientRect().right

  if (
    // The moving bloc is not above the tower
    leftFixedBlock >= rightMovingBlock ||
    leftMovingBlock >= rightFixedBlock
  ) {
    currentBlock.remove()
    currentBlockWidth = 0
  } else if (
    // The moving bloc is to the right of the fixed one
    leftFixedBlock < leftMovingBlock &&
    leftMovingBlock < rightFixedBlock
  ) {
    // calculates the size of the leftover
    currentBlockWidth =
      previousBlock.offsetWidth - (rightMovingBlock - rightFixedBlock)
  } else if (
    // The moving bloc is to the left of the fixed one
    leftFixedBlock < rightMovingBlock &&
    rightMovingBlock < rightFixedBlock
  ) {
    // calculates the size of the leftover
    currentBlockWidth =
      previousBlock.offsetWidth - (leftFixedBlock - leftMovingBlock)
  }
  // set the new size to the element
  console.log(currentBlockWidth)
  currentBlock.style.width = `${currentBlockWidth}px`
}

// createElement creates a new block --Ed
function createBlock() {
  // 1) create element: document.createElement("div")
  const newBlock = document.createElement('div')
  // grab the last bloc element (of class)
  const lastBlock = document.querySelector('.block:last-of-type')
  // 2) Set width from previous bloc, height, margin and class
  newBlock.classList.add('block')
  newBlock.classList.add('new-block')
  newBlock.style.width = `${lastBlock.offsetWidth}px`
  newBlock.style.left = `${100 + currentScore}px`
  // 3) Set color: using hsl, hue + 10 * score
  newBlock.style.background = `hsl(${254 + 10 * currentScore}, 60%, 35%)`
  // 4) append child block to the container (gameArea)
  gameArea.appendChild(newBlock)
  return newBlock
}

/* Function blocAnimation 
- to add / create animation (css) for the new element / bloc (div) --Solene */
function speedDefinition(block) {
  let period = 1 / speed
  block.style.animationDuration = `${3 + period}s`
  // Speed to be adjusted
}
/* change class + JS (toggle?)
set speed +1
*/

// Function = "countScore" (and sets highscore if score > highscore) && save it to localStorage --joris
/* score = (nombre de <div> crée par function create new element) save the score at the end of game
  highscore = best loaded score in local storage by user

 */

// function startGame
// Function to restart the game : delete all blocs --Solene
function resetGame() {
  const blocksToRemove = document.querySelectorAll('.new-block')
  for (let i = 0; i < blocksToRemove.length; i++) {
    blocksToRemove[i].remove()
  }
  currentScore = 0
}
/* const resetScore = document.getElementById('.display-score');
  resetScore.innerHTML = "0"
when bloc = 0 (ie if click when moving bloc is outside of area previous fixed bloc)
*/

// fetchHighscore Fetch highscores from localStorage and assign them to variable highscore --Ed
function fetchHighscore() {
  // 0) Deal with the case the highscores don't exists
  if (!localStorage.getItem('highscores')) {
    localStorage.setItem('hightscores', JSON.stringify(highscores))
  } else {
    // 1) fetch the data : localStorage.getItem('highscores')
    // 2) parse it : JSON.parse
    const localStor = JSON.parse(localStorage.getItem('highscores'))
    console.log(localStor)
    // Sort by highscore
    localStor.sort((a, b) => b.score - a.score)
    // 3) Assign it to highscore
    highscore = localStor[0].score
    // 3) Display it
    displayHighscore.textContent = `Highscore: ${highscore}`
  }
}

function promptUser() {
  playerName = prompt("🎉 Well done! Sailor ⭐️ \n What's your name ?", 'Ed')
}

// Function to toggle the instructions (tap to play...)
function toggleInstructions() {
  if (instructions[0].style.display === 'none') {
    // eslint-disable-next-line no-return-assign
    instructions.forEach((paragraph) => (paragraph.style.display = 'bloc'))
  } else {
    // eslint-disable-next-line no-return-assign
    instructions.forEach((paragraph) => (paragraph.style.display = 'none'))
  }
}

// Main function called everytime the game area is clicked (spacebar, tap & click)
const eventHandler = (event) => {
  if (event.code === 'space' || event.type === 'click') {
    if (!isStarted) {
      isStarted = true
      toggleInstructions()
      createBlock()
    } else {
      stopAnimation()
      resizeCurrentElement()

      // Size of element === 0 => Lost : prompt user for name, then reset Game (and display message Click to play)
      if (currentBlockWidth <= 0) {
        isStarted = false
        promptUser()
        highscores.push({ playerName, score: currentScore })
        resetGame()
        toggleInstructions()
      } else {
        currentScore++
        createBlock()
        // increase speed
      }
    }
  }
}

fetchHighscore()
//----------------
// Event Listeners
//----------------

// Create an event listener to start the game && 'drop' the bloc && restart the game
// on click, spacebar, tap event -- Do

gameArea.addEventListener('click', eventHandler)
// todo : Not working... why ?
gameArea.addEventListener('keypress', eventHandler)

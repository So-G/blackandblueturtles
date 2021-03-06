//----------
// Variables
//----------

// gameArea: Grab HTML containing element (id)
const gameArea = document.querySelector('#game-area')
const input = document.querySelector('#player-name')

// Score & Highscore
const scoreDisplay = document.querySelector('#display-score')
const highscoreDisplay = document.querySelector('#display-highscore')

// Instruction
const instructions = gameArea.querySelector('#click-to-play')
const gameOver = gameArea.querySelector('#game-over')

let currentScore = 0
let highscore = 0
const highscores = [{ playerName: "Bob's your uncle", score: 10 }]

const playerNameInput = document.querySelector('#player-name')
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

function resizeCurrentElement() {
  // Select the current bloc
  const currentBlock = document.querySelector('.block:last-of-type')
  const leftMovingBlock = currentBlock.getBoundingClientRect().left
  const rightMovingBlock = currentBlock.getBoundingClientRect().right

  // Select the previous bloc
  const previousBlock = document.querySelector('.block:nth-last-of-type(2)')
  const leftFixedBlock = previousBlock.getBoundingClientRect().left
  const rightFixedBlock = previousBlock.getBoundingClientRect().right
  currentBlock.style.position = 'relative'

  if (
    // The moving bloc is not above the tower
    leftFixedBlock >= rightMovingBlock ||
    leftMovingBlock >= rightFixedBlock
  ) {
    currentBlock.remove()
    currentBlockWidth = 0
  } else if (
    // The moving bloc is to the RIGHT of the fixed one
    leftFixedBlock < leftMovingBlock &&
    leftMovingBlock < rightFixedBlock
  ) {
    // calculates the size of the leftover
    currentBlockWidth =
      previousBlock.offsetWidth - (rightMovingBlock - rightFixedBlock)
    currentBlock.style.right = `${(rightMovingBlock - rightFixedBlock) / 2}px`
  } else if (
    // The moving bloc is to the LEFT of the fixed one
    leftFixedBlock < rightMovingBlock &&
    rightMovingBlock < rightFixedBlock
  ) {
    // calculates the size of the leftover
    currentBlockWidth =
      previousBlock.offsetWidth - (leftFixedBlock - leftMovingBlock)
    currentBlock.style.left = `${(leftFixedBlock - leftMovingBlock) / 2}px`
  }
  // set the new size to the element
  currentBlock.style.width = `${currentBlockWidth}px`
}

// createElement creates a new block --Ed
function createBlock() {
  // 1) create element: document.createElement("div")
  const currentBlock = document.createElement('div')
  // grab the last bloc element (of class)
  const previousBlock = document.querySelector('.block:last-of-type')
  // 2) Set width from previous bloc, height, margin and class
  currentBlock.classList.add('block')
  currentBlock.classList.add('new-block')
  currentBlock.style.width = `${previousBlock.offsetWidth}px`
  // currentBlock.style.left = `${previousBlock.offsetWidth}px`
  // 3) Set color: using hsl, hue + 10 * score
  currentBlock.style.background = `hsl(${254 + 10 * currentScore}, 60%, 35%)`
  // 4) append child block to the container (gameArea)
  gameArea.appendChild(currentBlock)
  return currentBlock
}

// Function = "displayScore" (and sets highscore if score > highscore)
function displayScore(score, highscore) {
  scoreDisplay.textContent = `Score: ${score} `
  highscoreDisplay.textContent = `Highscore: ${highscore}`
}

// function startGame
// Function to restart the game : delete all blocs --Solene
function resetGame() {
  const blocksToRemove = document.querySelectorAll('.new-block')
  for (let i = 0; i < blocksToRemove.length; i++) {
    blocksToRemove[i].remove()
  }
  currentScore = 0
}

// fetchHighscore Fetch highscores from localStorage and assign them to variable highscore --Ed
function fetchHighscore() {
  if (localStorage.getItem('highscores')) {
    // 1) fetch the data : localStorage.getItem('highscores')
    // 2) parse it : JSON.parse
    const localStor = JSON.parse(localStorage.getItem('highscores'))
    // Sort by highscore
    localStor.sort((a, b) => b.score - a.score)
    // 3) Assign it to highscore
    highscore = localStor[0].score
    // 3) Display it
    displayScore(currentScore, highscore)
  } else {
    // 0) Deal with the case the highscores don't exists by adding one (fake)
    localStorage.setItem('highscores', JSON.stringify(highscores))
  }
}

// Function to store score into local storage
function storeHighscore(name, score) {
  highscores.push({ playerName: name, score })
  localStorage.setItem('highscores', JSON.stringify(highscores))
}

// Main function called everytime the game area is clicked (spacebar, tap & click)
const eventHandler = (event) => {
  if (
    event.code === 'Enter' ||
    event.code === 'Space' ||
    event.type === 'mousedown'
  ) {
    event.preventDefault()
    if (!isStarted) {
      isStarted = true
      instructions.style.display = 'none'
      gameOver.style.display = 'none'
      createBlock()
      playerName = playerNameInput.value
    } else {
      stopAnimation()
      resizeCurrentElement()
      // Size of element === 0 => Lost : prompt user for name, then reset Game (and display message Click to play)
      if (currentBlockWidth === 0) {
        // highscores.push({ playerName, score: currentScore })
        storeHighscore(playerName, currentScore)
        isStarted = false
        resetGame()
        gameOver.style.display = 'block'
        currentScore = 0
      } else {
        currentScore++
        displayScore(currentScore, highscore)
        // setHighscore()
        createBlock()
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

gameArea.addEventListener('mousedown', eventHandler)
document.body.addEventListener('keypress', eventHandler)
input.addEventListener('keypress', eventHandler)

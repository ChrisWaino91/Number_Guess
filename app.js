/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBTN = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message')

// Assign UI min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBTN.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

// Validate the input
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }
  


// Check if we've won
  if (guess === winningNum){
// //Game Over - WON

    gameOver(true, `${winningNum} is correct, You Win!`);

  } else {
    // Wrong Number
    guessesLeft -= 1; 
    // This means guessesLeft -1;

    if(guessesLeft === 0){
      //Game Over - Lose

     
      gameOver(false, `Game Over, You Lost! The Correct Number Was ${winningNum}`);
    

    }
    
    else {

      //Make Border Red
      guessInput.style.borderColor = 'red';

      // Set input to blank
      guessInput.value = '';

      // Game Continues - Answer Wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }

}
});



// Game Over
function gameOver(won, msg){
let color;
// Shorthand for if won === true then set color to green else set it to red;
won === true ? color = 'green' : color = 'red';

    //Game Over - WON
    // Disable input
         guessInput.disabled = true;
    //  Change border colour
         guessInput.style.borderColor = color;
    // Set Text Color
         message.style.color = color;
     // Set Message
         setMessage(msg);

// Play Again - Change text of button and add class to manipulate event listener
guessBTN.value = 'Play Again';
guessBTN.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
 return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}


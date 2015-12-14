/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
var playersGuess = [];
    winningNumber = generateWinningNumber();



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random()*100 +1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	var guess = $('#guess').val();
	checkGuess(guess);
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){

}

// Check if the Player's Guess is the winning number 

function checkGuess(guess){
	if (parseInt(guess)===winningNumber) {
		alert('You Win!');
	} else {
		if (guess != "") {
			if (playersGuess.indexOf(guess)===-1) {
				playersGuess.push(guess);
				lowerOrHigher(guess);
				$('#guess').val("");
			} else {
				$('#accuracy').text("You already guessed that number!");
			}
		} else {
			$('#accuracy').text("Please enter a number before guessing!");
		}
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	$("#guess-button").on('click', playersGuessSubmission);
})














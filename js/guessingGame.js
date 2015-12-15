/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
var playersGuess;
var winningNumber;


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random()*100 +1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	var guess = parseInt($('#guess').val());
	checkGuess(guess);
}

//Check if the player entered a value, and whether that value is between 1 and 100

function isValid(guess) {
	if (isNaN(guess) || guess<1 || guess>100) {
		return false
	} else {
		return true
	}
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(guess){
	var message = ""
	var difference = winningNumber - guess;
	var distance = Math.abs(difference);
	if (distance < 5) {
		message = "AHHH You're SO close, but "
		$('#accuracy').addClass('hot');
	} else if (distance < 15) {
		message = "That's a pretty good guess, but "
		$('#accuracy').addClass('warm');
	} else if (distance < 30) {
		message = "Not the worst guess, but "
		$('#accuracy').addClass('cold');
	} else {
		message = "Yikes..."
		$('#accuracy').addClass('frigid');
	};
	if (difference<0) {
		message += "you're too high."
	} else {
		message += "you're too low."
	};
	return message;
}

// Check if the Player's Guess is the winning number 

function checkGuess(guess){
	//Check if it is the winning number
	if (guess===winningNumber) {
		winGame();
	} else {
		//Remove styling from feedback
		$('#accuracy').removeClass();

		//Check if it is a valid guess
		if (isValid(guess)) {
			//Check if it is a unique guess
			if (playersGuess.indexOf(guess)===-1) {
				playersGuess.push(guess);
				guessMessage(guess);
				recordGuess(guess);
				//End the game if the player has guessed 5 times
				if (playersGuess.length === 5) {
					loseGame();
				}
			} else {
				$('#accuracy').text("You already guessed that number!");
			}
		} else {
			$('#accuracy').text("Please enter a number between 1 and 100");
		}
		$('#guess').val("");
		$('#guess').focus();
	}
}

//Create a message with clues depending on the player's guess

function guessMessage(guess) {
	$('#accuracy').text(lowerOrHigher(guess));
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	if (playersGuess.length<1) {
		$('#hint').text('You need to at least try before I give you a hint...')
	} else {
		//generate one of three random hints
		var hint = Math.floor(Math.random()*3+1)

		if (hint===1) {
			//randomly pick one of the player's guesses, and return its distance from the winning number
			var guess = playersGuess[Math.floor(Math.random()*(playersGuess.length))];
			var distance = Math.abs(guess - winningNumber);
			$('#hint').text('One of your guesses was '+distance+' away from the winning number.')

		} else if (hint===2) {
			//find the player's closest guess, and return its distance
			var closest = playersGuess[0];
			for (var i = 0; i < playersGuess.length; i++) {
				if (Math.abs(playersGuess[i]-distance)<closest) {
					closest = playersGuess[i];
				}
			}
			var distance = Math.abs(winningNumber - closest);
			$('#hint').text('Your best guess was '+distance+' away.')
		
		} else {
			//create a list of possible values, depending on the number of guesses remaining
			var values = [];
			//double the number of hints for guesses remaining
			hintAmount = 2*(5-playersGuess.length);
			for (var i=0; i<hintAmount; i++) {
				values.push(Math.floor(Math.random()*100+1))
			};
			//randomly add winning number inside
			values[Math.floor(Math.random()*values.length)] = winningNumber;
			$('#hint').text('The answer is one of these numbers: '+values.join(', '))
		}
	}
}

function recordGuess(guess) {
	//Update the counter
	$('#count').text(5-playersGuess.length)

	//Record the guess
	var guesses = $('#guesses').find('li').each(function() {
		var val = true;
		if ($(this).text()==='-') {
			val = false;
			$(this).text(guess)
		};

		//end each statement if empty li found
		return(val);
	});
}

function winGame() {
	$("input").prop('disabled', true);
	$('#win').text('You Win!');
	$('#replay').show()
	$('#cover').addClass('coverWin');
	$('#cover').animate({opacity: 1}, 2000);
}

function loseGame() {
	$("input").prop('disabled', true);
	$('#win').text('You lose.');
	$('#replay').show()
	$('#cover').addClass('coverLose')
	$('#cover').animate({opacity: 1}, 2000);
}

// Allow the "Player" to Play Again

function playGame(){
	//Reset board if playing again
	if (typeof winningNumber === 'number') {
		resetBoard();
	}

	//Generate new game
	playersGuess = [];
    winningNumber = generateWinningNumber();
}

function resetBoard() {
	//Remove win/lose cover
	$('#cover').animate({opacity: 0}, {
				duration: 500,
				complete: function() {
					$('#win').text("");
					$('#replay').hide()
					$('#cover').removeClass();
				}
	})

	//Clear guess input, previous guesses, hint, and high/low feedback
	$("input").prop('disabled', false);
	$('#guess').val("");
	$('#guesses li').text("-");
	$('#hint').text("");
	$('#accuracy').text("").removeClass();
	$('#count').text(5);
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	playGame();
	$("#guessButton").on('click', playersGuessSubmission);
	$("#guess").on('keyup', function(event) {
		if (event.keyCode === 13 ) {
			playersGuessSubmission();
		}
	});
	$("#hintButton").on('click', provideHint);
	$(".playAgain").on('click', playGame);
})














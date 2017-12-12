// require inquirer and the random pokemon name npm package
var inquirer = require("inquirer");
var randomWord = require("random-word");

// creating word, blank word, wrong guess, and already guessed arrays
var word;
var blankWord = [];
var wrongGuess = [];
var alreadyGuessed = [];

// alphabet array for input validation
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
	 "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// random word function
function newWord() {
	word = randomWord().toLowerCase();
	// filling blank word array with _. length of array = length of random word
	for (var i = 0; i < word.length; i++) {
		blankWord.push("_");
	};
	// logging for testing purposes
	console.log(word);
	console.log(blankWord);
	guess();
};

function printStats() {
	// log blank word, wrong guesses, already guessed, wrong guesses left
	console.log("Word: " + blankWord.join(" "));
	console.log("Wrong guesses: " + wrongGuess.join(" "));
	console.log("Already guessed: " + alreadyGuessed.join(" "));
	console.log("Wrong guesses left: " + (10 - wrongGuess.length));
};

// play again function
function playAgain() {
	inquirer.prompt([
		{
			name: "playAgain",
			message: "would you like to play again?",
			type: "list",
	  	choices: ["yes", "no"]
		}
	]).then(function(response) {
		if (response.playAgain === "yes") {
			word = "";
			blankWord = [];
			wrongGuess = [];
			alreadyGuessed = [];
			newWord();
		}
	});
};

// guessing function
function guess() {
	// run this function until wrong guesses hits 10 or word has been guessed
	if (blankWord.indexOf("_") > -1 && wrongGuess.length < 10) {
		// asking user to guess a letter and validating that a letter is guessed
		inquirer.prompt([
			{
				name: "letter",
				message: "guess a letter",
				validate: function(input) {
          if (alphabet.indexOf(input.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      }
			// function to run after user guess
		]).then(function(userGuess) {
			// saving user guess to lowercase
			var userLetter = userGuess.letter.toLowerCase();

			// saving index of user's guess in random word
			var index = word.indexOf(userLetter);

			// if user has already guessed the letter
			if (alreadyGuessed.indexOf(userLetter) > -1) {
				console.log("You already guessed that letter, guess again.");

				// if guess doesn't appear in word, push to wrong & already guessed array
			} else if (index === -1) {
				wrongGuess.push(userLetter);
				alreadyGuessed.push(userLetter);

				// if user guess appears in word 
			} else if (index > -1) {
				// loop through the word, find where the guess appears, replace the _ in 
				// blank word array with the guess.
				for (var j = 0; j < blankWord.length; j++) {
					if (userLetter === word[j]) {
						blankWord[j] = userLetter;
					}
				}
				// add user guess to the already guessed array
				alreadyGuessed.push(userLetter);
			}
			// print stats
			printStats();
			// recursie - run guess again until word is guessed or wrong guesses hits 10
			guess();
		});

		// if user guessed all the letters
	} else if (blankWord.indexOf("_") === -1) {
		console.log("you win");
		// print stats, run play again function
		printStats();
		playAgain();
		// if user had 10 wrong guesses
	} else if (wrongGuess.length >= 10) {
		console.log("you lose, the word was '" + word + "'.");
		// print stats, run play again function
		printStats();
		playAgain();
	}
};

// starts game
newWord();
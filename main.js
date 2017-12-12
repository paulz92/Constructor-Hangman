// requiring npm packages
var inquirer = require("inquirer");
var	randomWord = require("random-word");

// requiring letter guessed constructor file and word constructor file
var LetterGuessed = require("./letter.js");
var NewWord = require("./word.js");

// creating NewWord instance based on random word
var hangmanWord = new NewWord(randomWord().toLowerCase());

// populating blank word array
hangmanWord.populateBlankWord();

console.log(hangmanWord.word);
console.log("Word: " + hangmanWord.blankWord.join(" "));
console.log("---------------------------------------------------------");

// alphabet array for input validation
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
		 "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// wins and losses
var	wins = 0;
var	losses = 0;

function guess() {
	// run this function until wrong guesses hits 10 or word has been guessed
	if (hangmanWord.blankWord.indexOf("_") > -1) { //&& userLetter.wrongGuesses.length < 10) {
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
			// new LetterGuessed instance based on user's input
			var userLetter = new LetterGuessed(userGuess.letter, hangmanWord.word);
			// saving index of user's guess in random word
			var index = hangmanWord.word.indexOf(userLetter.letter);
			// if user has already guessed the letter
			if (userLetter.alreadyGuessed.indexOf(userLetter.letter) > -1) {
				userLetter.letterAlreadyGuessed();
		  	// if guess doesn't appear in word, push to wrong & already guessed array
			} else if (index === -1) {
				userLetter.letterNotInWord();
				// if user guess appears in word 
			} else if (index > -1) {
				userLetter.letterInWord();
			}
			// print stats
			userLetter.printStats();
			// recursie - run guess again until word is guessed or wrong guesses hits 10
			guess();
		});
		// if user guessed all the letters
	} else if (hangman.blankWord.indexOf("_") === -1) {
		console.log("you win");
		// add 1 to wins
		wins++;
		// print stats, run play again function
		userLetter.printStats();
		// if user had 10 wrong guesses
	} else if (hangman.wrongGuess.length >= 10) {
		console.log("you lose, the word was '" + hangmanWord.word + "'.");
		// add 1 to losses
		losses++;
		// print stats, run play again function
	  userLetter.printStats();
	}
};

guess();
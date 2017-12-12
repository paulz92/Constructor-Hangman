// requiring word js file
var NewWord = require("./word.js");

// constructor for letter guessed
function LetterGuessed(letter, word) {
	this.letter = letter;
	// blank already guessed letters array
	this.alreadyGuessed = [];
	// blank wrong guesses array
	this.wrongGuesses = [];
	// function if the user guesses a letter in the word
	this.letterInWord = function() {
		// building NewWord with the random-word npm package
		var hangmanWord = new NewWord(word);
		// for all letters in the word
		for (var i = 0; i < hangmanWord.word.length; i++) {
			// if the letter matches the letter at word[i]
			if (letter === hangmanWord.word[i]) {
				// replace the _ in NewWord.blankWord with the letter
				hangmanWord.blankWord[i] = letter;
			}
		}
		// add letter to the already guessed array
		this.alreadyGuessed.push(letter);
	};
	// method if the user guesses a letter not in the word
	this.letterNotInWord = function() {
		// push letter to wrong guesses and already guessed arrays
		this.wrongGuesses.push(letter);
		this.alreadyGuessed.push(letter);
	};
	// method if the user guesses a letter that has already been guessed
	this.letterAlreadyGuessed = function() {
		// tell them to guess again, don't put the duplicate guess in any arrays
		console.log("You already guessed that letter, guess again.");
	};
	this.printStats = function() {
		var hangmanWord = new NewWord(word);
		// log blank word, wrong guesses, already guessed, wrong guesses left
		console.log("Word: " + hangmanWord.blankWord.join(" "));
		console.log("Wrong guesses: " + this.wrongGuesses.join(" "));
		console.log("Wrong guesses left: " + (10 - this.wrongGuesses.length));
		console.log("--------------------------------------------------------");
	};
};

module.exports = LetterGuessed;
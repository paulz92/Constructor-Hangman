// constructor for letter guessed
function LetterGuessed(letter, word) {
	// letter property
	this.letter = letter;
	// blank already guessed letter
	this.alreadyGuessed;
	// blank wrong guess letter
	this.wrongGuess;
};

// prototype method if letter not in word
LetterGuessed.prototype.letterNotInWord = function() {
	// assign the letter to the wrong guess and already guessed properties
	this.wrongGuess = this.letter;
	this.alreadyGuessed = this.letter;
};

// prototype method if letter already guessed
LetterGuessed.prototype.letterAlreadyGuessed = function() {
	// tell them to guess again, don't put the duplicate guess in any arrays
	console.log("You already guessed that letter, guess again.");
};

module.exports = LetterGuessed;
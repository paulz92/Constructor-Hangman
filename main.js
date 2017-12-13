// require inquirer and the random word npm package
var inquirer = require("inquirer");
var randomWord = require("random-word");
// requiring letter and word constructor functions
var LetterGuessed = require("./letter.js");
var NewWord = require("./word.js");
// object oriented
var hangman = {
	// creating empty word string, blank word/wrong guess/already guessed arrays
	word: "",
	blankWord: [],
	wrongGuess: [],
	alreadyGuessed: [],
	// alphabet array for input validation
	alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
		 "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
	// wins and losses
	wins: 0,
	losses: 0,
	// new word function
  newWord: function() {
  	// creating new instance of word constructor
  	var newWordInstance = new NewWord(randomWord().toLowerCase());
  	// assigning the constructor word to the hangman word
		hangman.word = newWordInstance.word;
		// building blank words array from constructor function
		newWordInstance.populateBlankWord();
		// assigning blankWord array equal to the constructor blank word array
		hangman.blankWord = newWordInstance.blankWord;
		// printing stats, start guessing
		hangman.printStats();
		hangman.guess();
	},
	// print stats method
	printStats: function() {
		console.log("Word: " + hangman.blankWord.join(" "));
		console.log("Wrong guesses: " + hangman.wrongGuess.join(" "));
		console.log("Wrong guesses left: " + (10 - hangman.wrongGuess.length));
		console.log("--------------------------------------------------------");
	},
	// print wins losses method
	winsLosses: function() {
		console.log("Wins: " + hangman.wins);
		console.log("Losses: " + hangman.losses);
	},
	// play again method
	playAgain: function() {
		// ask user if they want to play agin
		inquirer.prompt([
			{
				name: "playAgain",
				message: "would you like to play again?",
				type: "list",
		  	choices: ["yes", "no"]
			}
		]).then(function(response) {
			// if they say yes, reset game, tell them, start new game
			if (response.playAgain === "yes") {
				hangman.word = "";
				hangman.blankWord = [];
				hangman.wrongGuess = [];
				hangman.alreadyGuessed = [];
				console.log("--------------------------------------------------------");
				console.log("Starting new game!");
				console.log("--------------------------------------------------------");
				hangman.newWord();
			}
		});
	},
	// guessing function
	guess: function() {
		// run this function until wrong guesses hits 10 or word has been guessed
		if (hangman.blankWord.indexOf("_") > -1 && hangman.wrongGuess.length < 10) {
			// asking user to guess a letter and validating that a letter is guessed
			inquirer.prompt([
				{
					name: "letter",
					message: "guess a letter",
					// validating the input is actually a letter
					validate: function(input) {
	          if (hangman.alphabet.indexOf(input.toLowerCase()) > -1) {
	            return true;
	          }
	          return false;
	        }
	      }
				// function to run after user guess
			]).then(function(userGuess) {
				// new instance of letter constructor function based on user input
				var newLetterInstance = new LetterGuessed(userGuess.letter.toLowerCase(), hangman.word);
				// saving index of user's guess in random word
				var index = hangman.word.indexOf(newLetterInstance.letter);
				// if user has already guessed the letter, call constructor method
				if (hangman.alreadyGuessed.indexOf(newLetterInstance.letter) > -1) {
					newLetterInstance.letterAlreadyGuessed();
					// if guess not in word, call constructor method, push letter to arrays
				} else if (index === -1) {
					newLetterInstance.letterNotInWord();
					hangman.alreadyGuessed.push(newLetterInstance.alreadyGuessed);
					hangman.wrongGuess.push(newLetterInstance.wrongGuess);
					// if guess appears in word, call constructor method, push to array
				} else if (index > -1) {
					// loop through word, find where guess appears, replace _ with letter 
					for (var j = 0; j < hangman.blankWord.length; j++) {
						if (newLetterInstance.letter === hangman.word[j]) {
							hangman.blankWord[j] = newLetterInstance.letter;
						}
					}
					hangman.alreadyGuessed.push(newLetterInstance.letter);
				}
				// print stats
				hangman.printStats();
				// recursie - run guess again until word is guessed or wrong guesses hits 10
				hangman.guess();
			});
			// if user guessed all the letters
		} else if (hangman.blankWord.indexOf("_") === -1) {
			console.log("you win");
			// add 1 to wins, print stats, run play again function
			hangman.wins++;
			hangman.printStats();
			hangman.winsLosses();
			hangman.playAgain();
			// if user had 10 wrong guesses
		} else if (hangman.wrongGuess.length >= 10) {
			console.log("you lose, the word was '" + hangman.word + "'.");
			// add 1 to losses, print stats, run play again function
			hangman.losses++;
			hangman.printStats();
			hangman.winsLosses();
			hangman.playAgain();
		}
	}
};
// starts game
hangman.newWord();
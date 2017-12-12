// object oriented
var hangman = {

	// require inquirer and the random pokemon name npm package
	inquirer: require("inquirer"),
	randomWord: require("random-word"),

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
		hangman.word = hangman.randomWord().toLowerCase();
		// filling blank word array with _. length of array = length of random word
		for (var i = 0; i < hangman.word.length; i++) {
			hangman.blankWord.push("_");
		};
		// logging for testing purposes
		console.log(hangman.word);
		console.log("Word: " + hangman.blankWord.join(" "));
		console.log("---------------------------------------------------------");
		// start guessing
		hangman.guess();
	},

	printStats: function() {
		// log blank word, wrong guesses, already guessed, wrong guesses left
		console.log("Word: " + hangman.blankWord.join(" "));
		console.log("Wrong guesses: " + hangman.wrongGuess.join(" "));
		console.log("Wrong guesses left: " + (10 - hangman.wrongGuess.length));
		console.log("--------------------------------------------------------");
	},

	winsLosses: function() {
		console.log("Wins: " + hangman.wins);
		console.log("Losses: " + hangman.losses);
	},

	// play again function
	playAgain: function() {
		hangman.inquirer.prompt([
			{
				name: "playAgain",
				message: "would you like to play again?",
				type: "list",
		  	choices: ["yes", "no"]
			}
		]).then(function(response) {
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
			hangman.inquirer.prompt([
				{
					name: "letter",
					message: "guess a letter",
					validate: function(input) {
	          if (hangman.alphabet.indexOf(input.toLowerCase()) > -1) {
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
				var index = hangman.word.indexOf(userLetter);

				// if user has already guessed the letter
				if (hangman.alreadyGuessed.indexOf(userLetter) > -1) {
					console.log("You already guessed that letter, guess again.");

					// if guess doesn't appear in word, push to wrong & already guessed array
				} else if (index === -1) {
					hangman.wrongGuess.push(userLetter);
					hangman.alreadyGuessed.push(userLetter);

					// if user guess appears in word 
				} else if (index > -1) {
					// loop through the word, find where the guess appears, replace the _ in 
					// blank word array with the guess.
					for (var j = 0; j < hangman.blankWord.length; j++) {
						if (userLetter === hangman.word[j]) {
							hangman.blankWord[j] = userLetter;
						}
					}
					// add user guess to the already guessed array
					hangman.alreadyGuessed.push(userLetter);
				}
				// print stats
				hangman.printStats();
				// recursie - run guess again until word is guessed or wrong guesses hits 10
				hangman.guess();
			});

			// if user guessed all the letters
		} else if (hangman.blankWord.indexOf("_") === -1) {
			console.log("you win");
			// add 1 to wins
			hangman.wins++;
			// print stats, run play again function
			hangman.printStats();
			hangman.winsLosses();
			hangman.playAgain();
			// if user had 10 wrong guesses
		} else if (hangman.wrongGuess.length >= 10) {
			console.log("you lose, the word was '" + hangman.word + "'.");
			// add 1 to losses
			hangman.losses++;
			// print stats, run play again function
			hangman.printStats();
			hangman.winsLosses();
			hangman.playAgain();
		}
	}
};

// starts game
hangman.newWord();
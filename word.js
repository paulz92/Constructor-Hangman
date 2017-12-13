// new word constructor
function NewWord(word) {
	this.word = word;
	this.blankWord = [];
};

// populateblankword prototype function for newword constructor
NewWord.prototype.populateBlankWord = function() {
  for (var i = 0; i < this.word.length; i++) {
			this.blankWord.push("_");
	};
};

// exporting newword constructor
module.exports = NewWord;
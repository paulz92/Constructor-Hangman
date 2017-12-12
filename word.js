function NewWord(word) {
	this.word = word;
	this.blankWord = [];
	this.populateBlankWord = function() {
		for (var i = 0; i < word.length; i++) {
			this.blankWord.push("_");
		};
	};
};

module.exports = NewWord;
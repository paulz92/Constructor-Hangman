## Constructor-Hangman
Node.js hangman game built with JS constructor functions

## Motivation
To build a hangman app for use on a local machine in Bash using contructor functions and NPM packages.

## Tech/framework used
<b>Built with</b>
- Node.js
- JavaScript
- [Random Word NPM package](https://www.npmjs.com/package/random-word)
- [Inquirer NPM package](https://www.npmjs.com/package/inquirer)

## Features
Random word generator greatly reduces the likelihood of word repetition, and the words generated tend to be on the difficult side. The app accepts either uppercase or lowercase letters, and will not allow you to input any character not within the english alphabet. The app keeps a running tally of your session's wins and losses, and you will be prompted whether or not you'd like to play again after winning/losing the current round. Also, no internet connection is required to play this game after installation.

## Installation
- Install [Node js](https://nodejs.org/en/)
- Clone the Constructor-Hangman repository to your machine
- While inside the cloned repository, run the following to install the npm package dependencies 

		npm install

- You're ready to go!

## How to use?
Easy! Simply run
		
		node main.js

while inside the cloned repository, and a word will automatically generate. From there just guess a letter, hit enter, and repeat until you win.....or lose.

## Credits
UNC Chapel Hill Coding Boot Camp

© [paul92](https://github.com/paulz92)
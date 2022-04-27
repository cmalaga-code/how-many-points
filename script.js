'use strict';
// notes use toggle method from dom to add or remove
// buttons
const newGameButton = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//  current score
const currentScore = document.querySelectorAll('.current-score');
const currentScoreId0 = document.getElementById('current--0');
const currentScoreId1 = document.getElementById('current--1');
// score
const score = document.querySelectorAll('.score');
const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.getElementById('score--1');
// player
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
// dice
const dice = document.querySelector('.dice');
// variables
let currentScore0 = 0;
let currentScore1 = 0;
let scoreBoard0 = 0;
let scoreBoard1 = 0;
let randomNumber = Math.floor(Math.random()*6); // can use Math.trunc() instead & it will work the same
// add click event handler to handle click events to the new game button
newGameButton.addEventListener('click', () => {
    if (player0.classList.contains('player--winner')) {
        player0.classList.remove('player--winner');
    }
    if (player1.classList.contains('player--winner')) {
        player1.classList.remove('player--winner');
    }
    // set all current scores to 0
    currentScore.forEach(element => element.textContent = 0);
    scorePlayer0.textContent = 0;
    scorePlayer1.textContent = 0;
    scorePlayer0.textContent = 0;
    scorePlayer1.textContent = 0;
    currentScore0 = 0;
    currentScore1 = 0;
    scoreBoard0 = 0;
    scoreBoard1 = 0;
    btnHold.classList.remove('hidden');
    // hide dice when a new game starts
    dice.classList.add("hidden");
    // if the element contains the hidden class remove it
    if (btnRollDice.classList.contains("hidden")) {
        btnRollDice.classList.remove("hidden");
    }
});
// add click event handler to handle clicks to the roll dice button
btnRollDice.addEventListener('click', () => {
    if (btnHold.classList.contains("pointer-event-none")) {
        btnHold.classList.remove("pointer-event-none");
    }
    // create a random number from 0 to 6
    randomNumber = Math.floor(Math.random()*6)
    // remove hidden class from dice
    dice.classList.remove("hidden");
    // use template literal string to use a ternary operator to change the image in the UI
    dice.src = `dice-${randomNumber < 1?randomNumber + 1:randomNumber}.png`;
    // if random number is less than or equal to 1 go ahead and switch players turn
    if (randomNumber <= 1) {
        if (player0.classList.contains('player--active')) {
            btnHold.classList.add('pointer-event-none');
            currentScoreId0.textContent = 0;
            player0.classList.remove('player--active');
            player1.classList.add('player--active');

        } else {
            btnHold.classList.add('pointer-event-none');
            currentScoreId1.textContent = 0;
            player1.classList.remove('player--active');
            player0.classList.add('player--active');
        }
    } else {
        if (player0.classList.contains('player--active')) {
            currentScore0 = Number(currentScoreId0.textContent) + Number(randomNumber)
            currentScoreId0.textContent = currentScore0
        } else {
            currentScore1 = Number(currentScoreId1.textContent) + Number(randomNumber)
            currentScoreId1.textContent = currentScore1
        }
    }
});

btnHold.addEventListener('click', () => {
    if (!btnHold.classList.contains("pointer-event-none")) {
        btnHold.classList.add("pointer-event-none");
    }
    if (player0.classList.contains('player--active')) {
        // scoreBoard0 ++;
        scoreBoard0 += currentScore0
        scorePlayer0.textContent = scoreBoard0
        if (scoreBoard0 >= 100) {
            currentScoreId0.textContent = "You Win!";
            btnRollDice.classList.add('hidden');
            btnHold.classList.add('hidden');
            dice.classList.add('hidden');
            player0.classList.add('player--winner')

        }
    } else {
        scoreBoard1 += currentScore1
        scorePlayer1.textContent = scoreBoard1
        if (scoreBoard1 >= 100) {
            currentScoreId1.textContent = "You Win!";
            btnRollDice.classList.add('hidden');
            btnHold.classList.add('hidden');
            dice.classList.add('hidden');
            player1.classList.add('player--winner')
        }
    }
})
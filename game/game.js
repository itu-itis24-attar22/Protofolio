const word = "UNITY";
let sequence = [];
let userSequence = [];
let score = 0;
let lives = 3;
let gameBoard = document.getElementById('game-board');
let predictionInput = document.getElementById('prediction-input');
let predictionFeedback = document.getElementById('prediction-feedback');
let scoreDisplay = document.getElementById('score');
let livesDisplay = document.getElementById('lives');
let resetButton = document.getElementById('reset-button');

function createBoard() {
    sequence = [];
    userSequence = [];
    gameBoard.innerHTML = '';
    predictionFeedback.textContent = '';
    livesDisplay.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        let heart = document.createElement('img');
        heart.src = "heart.svg";
        heart.alt = "Heart";
        heart.classList.add('heart');
        livesDisplay.appendChild(heart);
    }
    for (let i = 0; i < word.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', i);
        const letter = document.createElement('span');
        letter.textContent = word[i];
        letter.style.display = 'none';
        card.appendChild(letter);
        const img = document.createElement('img');
        img.src = `${word[i]}_letter_ink_style.svg`;
        img.alt = word[i];
        img.classList.add('card-img');
        img.style.display = 'none';
        card.appendChild(img);
        gameBoard.appendChild(card);
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function checkPrediction() {
    const userInput = predictionInput.value.trim().toUpperCase();
    if (!window.globalUsedLetters) {
        window.globalUsedLetters = new Set();
    }
    if (userInput === word) {
        predictionFeedback.textContent = "Correct! You've guessed the word!";
        predictionFeedback.classList.add("win");
        score = 100;
        scoreDisplay.textContent = score;
        document.querySelectorAll('.card').forEach((card, index) => {
            if (word[index]) {
                card.querySelector('img').style.display = 'block';
                card.querySelector('span').style.display = 'none';
                card.classList.add('revealed');
            }
        });
        alert("Congratulations! You've won the game!");
        disableGame();
    } else if (userInput.length > 0 && userInput.length <= 6) {
        let correctMatches = 0;
        for (let i = 0; i < userInput.length; i++) {
            const inputLetter = userInput[i];
            if (window.globalUsedLetters.has(inputLetter)) {
                continue;
            }
            window.globalUsedLetters.add(inputLetter);
            if (word.includes(inputLetter)) {
                correctMatches++;
                document.querySelectorAll('.card').forEach((card, index) => {
                    if (word[index] === inputLetter) {
                        card.querySelector('img').style.display = 'block';
                        card.querySelector('span').style.display = 'none';
                        card.classList.add('revealed');
                    }
                });
            }
        }
        if (correctMatches > 0) {
            predictionFeedback.textContent = `Good guess! ${correctMatches} letter(s) are correct.`;
            predictionFeedback.style.color = "blue";
            score += correctMatches * 20;
            scoreDisplay.textContent = score;
        } else {
            predictionFeedback.textContent = `No matches in "${userInput}".`;
            predictionFeedback.style.color = "red";
            lives -= 1;
            updateLivesDisplay();
            if (lives <= 0) {
                predictionFeedback.textContent = "Game Over! You ran out of lives.";
                predictionFeedback.classList.add("loss");
                alert("You lost! Try again.");
                disableGame();
            }
        }
    } else if (userInput.length > 6) {
        predictionFeedback.textContent = `Input is too long! Maximum allowed length is 6 letters.`;
        predictionFeedback.style.color = "red";
    }
    predictionInput.value = '';
    resetButton.style.display = "inline-block";
}

function resetGame() {
    score = 0;
    lives = 3;
    scoreDisplay.textContent = score;
    updateLivesDisplay();
    window.globalUsedLetters = new Set();
    resetButton.style.display = "none";
    predictionFeedback.textContent = "";
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('revealed');
        card.querySelector('span').style.display = 'none';
        card.querySelector('img').style.display = 'none';
    });
    createBoard();
    enableGame();
}

function updateLivesDisplay() {
    livesDisplay.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        let heart = document.createElement('img');
        heart.src = "heart.svg";
        heart.alt = "Heart";
        heart.classList.add('heart');
        livesDisplay.appendChild(heart);
    }
}

function disableGame() {
    document.querySelector('button').disabled = true;
    predictionInput.disabled = true;
}

function enableGame() {
    document.querySelector('button').disabled = false;
    predictionInput.disabled = false;
}

window.onload = createBoard;

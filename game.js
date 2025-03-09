const word = "UNITY"; // The word the player needs to guess
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

// Function to create the game board
function createBoard() {
    sequence = []; // Reset sequence
    userSequence = []; // Reset user's sequence
    gameBoard.innerHTML = ''; // Clear the game board
    predictionFeedback.textContent = ''; // Clear any previous feedback

    // Clear the heart display before adding new ones
    livesDisplay.innerHTML = '';

    // Add heart SVG images based on the number of lives
    for (let i = 0; i < lives; i++) {
        let heart = document.createElement('img');
        heart.src = "heart.svg"; // Replace with the path to your heart SVG
        heart.alt = "Heart";
        heart.classList.add('heart');
        livesDisplay.appendChild(heart);
    }

    // Create cards for each letter
    for (let i = 0; i < word.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', i);

        // Add a text inside the card (this will be hidden initially)
        const letter = document.createElement('span');
        letter.textContent = word[i];
        letter.style.display = 'none'; // Hide the letter initially
        card.appendChild(letter);

        // Add an image or style to show on card reveal (you can use SVGs as needed)
        const img = document.createElement('img');
        img.src = `path/to/your/letter_images/${word[i]}.svg`; // Replace with your image path
        img.alt = word[i];
        img.classList.add('card-img');
        card.appendChild(img);

        card.addEventListener('click', () => handleCardClick(card, i));
        gameBoard.appendChild(card);

        sequence.push(i); // Store the correct order
    }

    // Shuffle the sequence to randomize the cards on the board
    shuffleArray(sequence);
}

// Function to shuffle the array (card order)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
}

// Handle card click and reveal the letter
function handleCardClick(card, index) {
    if (userSequence.length === 0) {
        // Show the letter or image when the card is clicked
        card.classList.add('revealed');
        card.querySelector('span').style.display = 'block'; // Reveal the letter
        card.querySelector('img').style.display = 'block'; // Reveal the image

        userSequence.push(index); // Add the clicked card's index to the user's sequence

        // Check if the clicked card is correct based on the player's sequence
        if (userSequence.length === sequence.length) {
            // Implement the logic for checking the player's answer (e.g., if they match the word)
            alert('Game Over!');
        }
    }
}

// Function to check the user's prediction
function checkPrediction() {
    const userInput = predictionInput.value.trim().toUpperCase(); // Get the user's input and make it uppercase

    // Check if the user predicts the word correctly
    if (userInput === word) {
        predictionFeedback.textContent = "Correct! You've guessed the word!";
        predictionFeedback.style.color = "green";
        score = 100; // Update score to 100 for correct word guess
        scoreDisplay.textContent = score; // Update score display
        alert("Congratulations! You've won the game!");
        disableGame();
    } 
    // Check if the user predicts a correct letter
    else if (userInput.length === 1 && word.includes(userInput)) {
        predictionFeedback.textContent = `Good guess! The letter "${userInput}" is in the word.`;
        predictionFeedback.style.color = "blue";
        score += 20; // Increase score for correct letter guess
        scoreDisplay.textContent = score; // Update score display

        // Reveal the letter on the board
        document.querySelectorAll('.card').forEach(card => {
            if (card.textContent === userInput) {
                card.classList.add('revealed');
            }
        });
    } 
    // Incorrect letter prediction
    else if (userInput.length === 1) {
        predictionFeedback.textContent = `Incorrect! The letter "${userInput}" is not in the word.`;
        predictionFeedback.style.color = "red";
        lives -= 1; // Decrease lives for incorrect guess
        updateLivesDisplay();

        // Check if the player has lost the game
        if (lives <= 0) {
            predictionFeedback.textContent = "Game Over! You ran out of lives.";
            predictionFeedback.style.color = "red";
            alert("You lost! Try again.");
            disableGame();
        }
    } 
    // Incorrect word prediction
    else if (userInput.length > 1) {
        predictionFeedback.textContent = `Incorrect! "${userInput}" is not the correct word.`;
        predictionFeedback.style.color = "red";
        lives = 0; // Set lives to 0 for an incorrect word
        updateLivesDisplay();
        alert("You lost! Incorrect word prediction.");
        disableGame();
    }

    // Clear the input field after submission
    predictionInput.value = '';

    // Show the reset button after the first guess
    resetButton.style.display = "inline-block"; 
}

// Update the lives display with heart images
function updateLivesDisplay() {
    livesDisplay.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        let heart = document.createElement('img');
        heart.src = "heart.svg"; // Replace with the path to your heart SVG
        heart.alt = "Heart";
        heart.classList.add('heart');
        livesDisplay.appendChild(heart);
    }
}

// Function to disable the game when it’s over
function disableGame() {
    document.querySelector('button').disabled = true; // Disable the submit button
    predictionInput.disabled = true; // Disable the input field
}

// Function to reset the game
function resetGame() {
    // Reset the game state
    score = 0;
    lives = 3;
    scoreDisplay.textContent = score;
    updateLivesDisplay();

    // Hide the Reset Game button and prepare for a new game
    resetButton.style.display = "none";
    predictionFeedback.textContent = "";

    // Reset the cards on the board (hide letters and reset their styles)
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('revealed');
        card.querySelector('span').style.display = 'none'; // Hide the letter again
        card.querySelector('img').style.display = 'none'; // Hide the image again
    });

    // Recreate the board for a new game
    createBoard();

    // Re-enable the game controls
    enableGame();
}

// Function to enable the game after resetting
function enableGame() {
    document.querySelector('button').disabled = false; // Re-enable the submit button
    predictionInput.disabled = false; // Re-enable the input field
}

// Initialize the board when the page loads
window.onload = createBoard; 

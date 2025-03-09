const navigateButton = document.getElementById('navigateButton');

// Add a click event listener to the button
navigateButton.addEventListener('click', function() {
    // Perform any custom logic before navigation (e.g., show a message)
    alert('Navigating to the Word Prediction Game...');

    // Navigate to the Word Prediction Game page
    window.location.href = 'word-prediction-game.html';
});

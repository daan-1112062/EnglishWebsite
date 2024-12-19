// Game variables
let flippedCards = [];
let matchedPairs = 0;
let cards = document.querySelectorAll('.card');

// Shuffle function for random card order
function shuffleCards() {
    let shuffledCards = Array.from(cards);
    shuffledCards.sort(() => Math.random() - 0.5);
    let container = document.querySelector('.game-options');
    shuffledCards.forEach(card => container.appendChild(card)); // Append shuffled cards
}

// Start game logic
document.getElementById('start-button').addEventListener('click', function () {
    document.getElementById('message').textContent = '';
    matchedPairs = 0;
    flippedCards = [];
    shuffleCards();
    this.textContent = 'Game On! Match the voices!';
    // Reset all cards to their initial state
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'auto';
    });
});

// Card click event to flip the card
cards.forEach(card => {
    card.addEventListener('click', function () {
        if (flippedCards.length === 2) return; // Prevent flipping more than two cards at once
        if (flippedCards.includes(this)) return; // Prevent flipping the same card twice

        this.classList.add('flipped');
        flippedCards.push(this);

        const audio = new Audio(this.getAttribute('data-audio'));
        audio.play(); // Play the audio for the card

        // Check if two cards are flipped
        if (flippedCards.length === 2) {
            setTimeout(() => {
                if (flippedCards[0].getAttribute('data-name') === flippedCards[1].getAttribute('data-name')) {
                    // Cards match
                    flippedCards.forEach(card => card.style.pointerEvents = 'none');
                    matchedPairs++;
                    if (matchedPairs === cards.length / 2) {
                        triggerWin(); // Trigger win logic when all matches are found
                    }
                } else {
                    // Cards do not match, flip them back
                    flippedCards.forEach(card => card.classList.remove('flipped'));
                }
                flippedCards = [];
            }, 1000);
        }
    });
});

// Trigger Win logic
function triggerWin() {
    // Display You Win message
    const winMessage = document.getElementById('win-message');
    winMessage.style.display = 'block'; // Show the message
    console.log('Confetti triggered!');
    confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#ff0', '#0f0', '#00f', '#f00']
    });


    // Play victory audio
    const winAudio = new Audio('audio/victory-sound.mp3');
    winAudio.play();

    // Hide the message after 4 seconds
    setTimeout(() => {
        winMessage.style.display = 'none';
    }, 4000); // Hide after 4 seconds
}


// Confetti Effect
function confetti() {
    canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }
    });
}
// Restart Game Logic
document.getElementById('restart-button').addEventListener('click', function () {
    // Hide the "You Win!" message when restarting
    const winMessage = document.getElementById('win-message');
    winMessage.style.display = 'none'; // Hide win message on restart

    // Reset all cards
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'auto';
    });

    // Reset game variables
    matchedPairs = 0;
    flippedCards = [];
    shuffleCards();

    // Change start button text back to "Start Game"
    document.getElementById('start-button').textContent = 'Start Game';

    // Reset the message
    document.getElementById('message').textContent = '';
});

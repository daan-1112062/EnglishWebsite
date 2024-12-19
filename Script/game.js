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
                        document.getElementById('message').textContent = 'You Win! All matches found!';
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

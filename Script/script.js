// Existing Audio Player Functionality
const playPauseButton = document.getElementById('playPauseButton');
const replayButton = document.getElementById('replayButton');
const audio = new Audio('media/mia.mp3'); // Replace with your audio file

// Function to toggle play/pause
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change icon to "Pause"
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Change icon to "Play"
    }
});

// Function to replay the audio
replayButton.addEventListener('click', () => {
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Set to "Pause" icon once replay starts
});

// Reset the play/pause button icon when audio ends
audio.addEventListener('ended', () => {
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Reset button to "Play" icon when audio ends
});


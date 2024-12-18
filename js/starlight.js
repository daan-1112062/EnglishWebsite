const canvas = document.getElementById('starlight-bg');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 150; // Number of stars
const STAR_SPEED = 0.5; // Speed of movement

// Resize canvas to fit the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Initialize stars
function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5, // Random star size
            dx: (Math.random() - 0.5) * STAR_SPEED,
            dy: (Math.random() - 0.5) * STAR_SPEED,
        });
    }
}

// Draw a star
function drawStar(star) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
}

// Update star positions
function updateStars() {
    for (let star of stars) {
        star.x += star.dx;
        star.y += star.dy;

        // Wrap around if stars move off screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
    }
}

// Animate stars
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        drawStar(star);
    }
    updateStars();
    requestAnimationFrame(animate);
}

// Start animation
initStars();
animate();

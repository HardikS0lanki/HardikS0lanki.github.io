// Particle Network Background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Create Particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let dx = (Math.random() - 0.5) * 0.5;
        let dy = (Math.random() - 0.5) * 0.5;
        particlesArray.push({ x, y, dx, dy, size });
    }
}

// Draw and Move Particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f7ff';

    particlesArray.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
        if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
    });

    // Draw connections
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = 'rgba(0, 247, 255, 0.1)';
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

// Scroll Animation
const fadeEls = document.querySelectorAll('.fade-in');
function checkFadeIn() {
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

window.addEventListener('scroll', checkFadeIn);

// Init
initParticles();
animateParticles();
checkFadeIn();

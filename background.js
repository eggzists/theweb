const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Force a resize and redraw when the page loads
window.addEventListener('load', () => {
    resizeCanvas();
    animate();
});

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle class
class Particle {
    constructor() {
        this.reset();
        this.pulseAngle = Math.random() * Math.PI * 2;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.baseSize = Math.random() * 3 + 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Add mouse interaction
        if (mouse.x) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.speedX += dx * 0.001;
                this.speedY += dy * 0.001;
            }
        }

        // Add some randomness to movement
        this.speedX += (Math.random() - 0.5) * 0.01;
        this.speedY += (Math.random() - 0.5) * 0.01;
        
        // Limit speed
        this.speedX = Math.min(Math.max(this.speedX, -2), 2);
        this.speedY = Math.min(Math.max(this.speedY, -2), 2);

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
            this.reset();
        }

        this.pulseAngle += this.pulseSpeed;
        this.size = this.baseSize + Math.sin(this.pulseAngle) * 1;
    }

    draw() {
        ctx.beginPath();
        const hue = 250 + Math.sin(this.pulseAngle) * 10; // Slight color variation
        ctx.fillStyle = `hsla(${hue}, 65%, 63%, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines to nearby particles
        particles.forEach(particle => {
            const dx = this.x - particle.x;
            const dy = this.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) { // Connect particles within 100px
                ctx.beginPath();
                ctx.strokeStyle = `rgba(116, 96, 224, ${0.2 * (1 - distance/100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.stroke();
            }
        });
    }
}

// Add Ripple class for click effects
class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0;
        this.maxSize = 100;
        this.speed = 3;
        this.opacity = 1;
        this.color = `hsla(${Math.random() * 30 + 235}, 65%, 63%`; // Slight random color variation
    }

    update() {
        this.size += this.speed;
        this.opacity = 1 - (this.size / this.maxSize);
        return this.size < this.maxSize;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = `${this.color}, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Create arrays for particles and ripples
const particles = [];
const ripples = [];
const particleCount = 100;

// Add click event listener
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create ripple effect
    ripples.push(new Ripple(x, y));
    
    // Create burst of particles
    for (let i = 0; i < 8; i++) {
        const particle = new Particle();
        particle.x = x;
        particle.y = y;
        particle.speedX = (Math.random() - 0.5) * 4;
        particle.speedY = (Math.random() - 0.5) * 4;
        particles.push(particle);
    }
});

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Modified animation loop to include ripples
function animate() {
    // Clear the canvas completely instead of fade effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
    });

    // Update and draw ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        if (!ripple.update()) {
            ripples.splice(i, 1); // Remove finished ripples
        } else {
            ripple.draw();
        }
    }

    requestAnimationFrame(animate);
}

animate(); 
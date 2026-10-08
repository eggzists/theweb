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
        this.size = Math.random() * 2.5 + 1.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.3; // Slightly more visible (0.3-0.6)
        this.baseSize = Math.random() * 2.5 + 1.5;
        this.pulseSpeed = 0.01 + Math.random() * 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Add mouse interaction (more subtle, disabled on mobile)
        if (!isMobile && mouse.x) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                this.speedX += dx * 0.0005;
                this.speedY += dy * 0.0005;
            }
        }

        // Add some randomness to movement (slower)
        this.speedX += (Math.random() - 0.5) * 0.005;
        this.speedY += (Math.random() - 0.5) * 0.005;
        
        // Limit speed (slower max speed)
        this.speedX = Math.min(Math.max(this.speedX, -1), 1);
        this.speedY = Math.min(Math.max(this.speedY, -1), 1);

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
            this.reset();
        }

        this.pulseAngle += this.pulseSpeed;
        this.size = this.baseSize + Math.sin(this.pulseAngle) * 1;
    }

    draw() {
        ctx.beginPath();
        const hue = 250 + Math.sin(this.pulseAngle) * 8; // Slight color variation
        ctx.fillStyle = `hsla(${hue}, 65%, 65%, ${this.opacity * 0.75})`; // More visible but still subtle
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines to nearby particles (slightly more visible)
        // Skip on mobile for better performance
        if (!isMobile) {
            particles.forEach(particle => {
                const dx = this.x - particle.x;
                const dy = this.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) { // Connect particles within 120px
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(116, 96, 224, ${0.18 * (1 - distance/120)})`; // Slightly more visible
                    ctx.lineWidth = 0.4;
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(particle.x, particle.y);
                    ctx.stroke();
                }
            });
        }
    }
}

// Add Ripple class for click effects (more subtle)
class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0;
        this.maxSize = 80;
        this.speed = 2;
        this.opacity = 0.6;
        this.color = `hsla(${Math.random() * 20 + 240}, 60%, 60%`; // Slight random color variation
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

// Reduce particles on mobile for better performance
const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const particleCount = isMobile ? 35 : 70; // Slightly more particles for better visibility

// Add click/touch event listener (reduced effects on mobile)
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create ripple effect (fewer on mobile)
    if (!isMobile) {
        ripples.push(new Ripple(x, y));
    }
    
    // Create burst of particles (more subtle, fewer on mobile)
    const burstCount = isMobile ? 2 : 5;
    for (let i = 0; i < burstCount; i++) {
        const particle = new Particle();
        particle.x = x;
        particle.y = y;
        particle.speedX = (Math.random() - 0.5) * 2;
        particle.speedY = (Math.random() - 0.5) * 2;
        particles.push(particle);
    }
    
    // Limit total particles on mobile
    if (isMobile && particles.length > 40) {
        particles.splice(0, particles.length - 40);
    }
});

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Modified animation loop to include ripples (optimized for mobile)
function animate() {
    // Clear the canvas completely instead of fade effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
    });

    // Update and draw ripples (skip on mobile for performance)
    if (!isMobile) {
        for (let i = ripples.length - 1; i >= 0; i--) {
            const ripple = ripples[i];
            if (!ripple.update()) {
                ripples.splice(i, 1); // Remove finished ripples
            } else {
                ripple.draw();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate(); 
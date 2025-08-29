// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = [];
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const columnCount = Math.floor(this.canvas.width / this.fontSize);
        
        for (let i = 0; i < columnCount; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(text, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        this.init();
    }
}

// Particles Configuration
const particlesConfig = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00ff41'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff41',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

// Typing Animation
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.currentText = '';
    }
    
    start() {
        if (this.index < this.text.length) {
            this.currentText += this.text.charAt(this.index);
            this.element.textContent = this.currentText;
            this.index++;
            setTimeout(() => this.start(), this.speed);
        }
    }
}

// Smooth Scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Glitch Effect
function createGlitchEffect(element) {
    const original = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.textContent = original
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return original[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        if (iterations >= original.length) {
            clearInterval(interval);
            element.textContent = original;
        }
        
        iterations += 1/3;
    }, 30);
}

// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.trails = [];
        this.maxTrails = 10;
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrail(e.clientX, e.clientY);
        });
        
        this.animate();
    }
    
    addTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #00ff41;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
        `;
        
        document.body.appendChild(trail);
        this.trails.push(trail);
        
        if (this.trails.length > this.maxTrails) {
            const oldTrail = this.trails.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
    }
    
    animate() {
        this.trails.forEach((trail, index) => {
            if (trail && trail.style) {
                const opacity = (index + 1) / this.trails.length;
                trail.style.opacity = opacity * 0.5;
                trail.style.transform = `scale(${opacity})`;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Audio Feedback
class AudioFeedback {
    constructor() {
        this.audioContext = null;
        this.init();
    }
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    playBeep(frequency = 800, duration = 100) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }
}

// Form Validation with Glow Effect
function addGlowEffect(element, color = '#00ff41') {
    element.style.boxShadow = `0 0 20px ${color}`;
    element.style.borderColor = color;
}

function removeGlowEffect(element) {
    element.style.boxShadow = '';
    element.style.borderColor = '';
}

// Progressive Loading
function progressiveLoad() {
    const elements = document.querySelectorAll('.skill-item, .project-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// CV Download Handler
function handleCVDownload() {
    const audio = new AudioFeedback();
    audio.playBeep(1000, 200);
    
    // Create a placeholder PDF blob for demonstration
    const pdfContent = `
        %PDF-1.4
        1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
        2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
        3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >> endobj
        4 0 obj << /Length 44 >> stream
        BT /F1 12 Tf 100 700 Td (Guilherme Perlasca - CV) Tj ET
        endstream endobj
        xref
        0 5
        0000000000 65535 f 
        0000000010 00000 n 
        0000000079 00000 n 
        0000000173 00000 n 
        0000000301 00000 n 
        trailer << /Size 5 /Root 1 0 R >>
        startxref
        380
        %%EOF
    `;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Guilherme_Perlasca_CV.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show feedback
    showNotification('Currículo baixado com sucesso!');
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 65, 0.1);
        border: 1px solid #00ff41;
        color: #00ff41;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Matrix Rain
    const matrixRain = new MatrixRain();
    
    // Initialize Particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    }
    
    // Initialize Cursor Trail
    const cursorTrail = new CursorTrail();
    
    // Initialize Audio Feedback
    const audioFeedback = new AudioFeedback();
    
    // Progressive loading
    setTimeout(progressiveLoad, 500);
    
    // Add intersection observer to elements
    const animatedElements = document.querySelectorAll('.project-card, .skill-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
    
    // CV Download Button
    const downloadBtn = document.querySelector('.download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', handleCVDownload);
    }
    
    // Button hover effects with audio
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            audioFeedback.playBeep(600, 50);
            addGlowEffect(btn);
        });
        
        btn.addEventListener('mouseleave', () => {
            removeGlowEffect(btn);
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            audioFeedback.playBeep(400, 30);
        });
    });
    
    // Skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            audioFeedback.playBeep(500, 40);
        });
    });
    
    // Handle window resize for Matrix Rain
    window.addEventListener('resize', () => {
        matrixRain.resize();
    });
    
    // Glitch effect on title hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            createGlitchEffect(heroTitle);
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Handle contact button clicks
    const contactButtons = document.querySelectorAll('.contact-buttons .btn-icon');
    contactButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            audioFeedback.playBeep(800, 100);
            
            // Show notification for email
            if (btn.href && btn.href.includes('mailto:')) {
                e.preventDefault();
                showNotification('E-mail copiado para a área de transferência!');
                navigator.clipboard.writeText('guilherme.perlasca@email.com');
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            handleCVDownload();
        }
    });
    
    // Performance optimization
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
    
    console.log('🚀 Portfólio carregado com sucesso!');
    console.log('💻 Desenvolvido por Guilherme Perlasca');
    console.log('🔧 Pressione Ctrl+D para baixar o currículo');
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

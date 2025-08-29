/* ===== MATRIX REVOLUTION 2025 - GUILHERME PERLASCA ===== */
/* Next Generation Portfolio Matrix - JavaScript Revolution */

// Matrix Code Rain System - Multiple Layers
class MatrixRealm {
    constructor() {
        this.backgroundCanvas = document.getElementById('matrix-background');
        this.foregroundCanvas = document.getElementById('matrix-foreground');
        this.particlesCanvas = document.getElementById('matrix-particles');
        
        this.backgroundCtx = this.backgroundCanvas.getContext('2d');
        this.foregroundCtx = this.foregroundCanvas.getContext('2d');
        this.particlesCtx = this.particlesCanvas.getContext('2d');
        
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        this.fontSize = 14;
        this.columns = [];
        this.drops = [];
        this.particles = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        [this.backgroundCanvas, this.foregroundCanvas, this.particlesCanvas].forEach(canvas => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        const columnCount = Math.floor(this.backgroundCanvas.width / this.fontSize);
        this.drops = [];
        
        for (let i = 0; i < columnCount; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    createParticles() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.particlesCanvas.width,
                y: Math.random() * this.particlesCanvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    drawBackground() {
        this.backgroundCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.backgroundCtx.fillRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        
        this.backgroundCtx.fillStyle = '#00ff41';
        this.backgroundCtx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.backgroundCtx.fillText(text, x, y);
            
            if (y > this.backgroundCanvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }
    
    drawForeground() {
        this.foregroundCtx.clearRect(0, 0, this.foregroundCanvas.width, this.foregroundCanvas.height);
        
        // Draw scanning lines
        const time = Date.now() * 0.001;
        const scanY = (Math.sin(time) * 0.5 + 0.5) * this.foregroundCanvas.height;
        
        this.foregroundCtx.strokeStyle = 'rgba(0, 255, 65, 0.3)';
        this.foregroundCtx.lineWidth = 2;
        this.foregroundCtx.beginPath();
        this.foregroundCtx.moveTo(0, scanY);
        this.foregroundCtx.lineTo(this.foregroundCanvas.width, scanY);
        this.foregroundCtx.stroke();
        
        // Draw data streams
        for (let i = 0; i < 20; i++) {
            const x = (i / 20) * this.foregroundCanvas.width;
            const y = (Math.sin(time * 2 + i) * 0.3 + 0.5) * this.foregroundCanvas.height;
            
            this.foregroundCtx.fillStyle = `rgba(0, 255, 65, ${0.1 + Math.sin(time + i) * 0.1})`;
            this.foregroundCtx.fillRect(x, y, 2, 20);
        }
    }
    
    drawParticles() {
        this.particlesCtx.clearRect(0, 0, this.particlesCanvas.width, this.particlesCanvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.particlesCanvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.particlesCanvas.height) particle.vy *= -1;
            
            this.particlesCtx.fillStyle = `rgba(0, 255, 65, ${particle.opacity})`;
            this.particlesCtx.beginPath();
            this.particlesCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.particlesCtx.fill();
        });
    }
    
    animate() {
        this.drawBackground();
        this.drawForeground();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// 3D Holographic Grid System
class HolographicGrid {
    constructor() {
        this.container = document.getElementById('holographic-space');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.grid = null;
        this.animate = this.animate.bind(this);
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        this.createGrid();
        this.camera.position.z = 5;
        
        this.animate();
    }
    
    createGrid() {
        const geometry = new THREE.PlaneGeometry(20, 20, 20, 20);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff41,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        
        this.grid = new THREE.Mesh(geometry, material);
        this.scene.add(this.grid);
    }
    
    animate() {
        requestAnimationFrame(this.animate);
        
        if (this.grid) {
            this.grid.rotation.x += 0.001;
            this.grid.rotation.y += 0.002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Quantum Field Animation
class QuantumField {
    constructor() {
        this.container = document.getElementById('quantum-field');
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        // Create quantum particles
        for (let i = 0; i < 50; i++) {
            this.createQuantumParticle();
        }
    }
    
    createQuantumParticle() {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00e6ff;
            border-radius: 50%;
            pointer-events: none;
            animation: quantum-float 8s linear infinite;
            animation-delay: ${Math.random() * 8}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        this.container.appendChild(particle);
    }
}

// Neural Network Animation
class NeuralNetwork {
    constructor() {
        this.container = document.querySelector('.neural-grid');
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        // Create neural connections
        this.createNeuralConnections();
    }
    
    createNeuralConnections() {
        const connections = document.createElement('div');
        connections.className = 'neural-connections';
        connections.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;
        
        for (let i = 0; i < 30; i++) {
            const connection = document.createElement('div');
            connection.className = 'neural-connection';
            connection.style.cssText = `
                position: absolute;
                width: 1px;
                height: 1px;
                background: rgba(0, 255, 65, 0.3);
                animation: neural-pulse 4s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
            `;
            
            connection.style.left = Math.random() * 100 + '%';
            connection.style.top = Math.random() * 100 + '%';
            
            connections.appendChild(connection);
        }
        
        this.container.appendChild(connections);
    }
}

// Dynamic Name Typing Effect
class MatrixNameTyping {
    constructor() {
        this.nameChars = document.querySelectorAll('.name-char');
        this.currentIndex = 0;
        this.typingSpeed = 150;
        this.glitchInterval = null;
        
        this.init();
    }
    
    init() {
        this.startTyping();
        this.startGlitchEffect();
    }
    
    startTyping() {
        this.nameChars.forEach((char, index) => {
            char.style.opacity = '0';
            char.style.transform = 'scale(0)';
            
            setTimeout(() => {
                this.typeChar(char, index);
            }, index * this.typingSpeed);
        });
    }
    
    typeChar(char, index) {
        char.style.transition = 'all 0.3s ease';
        char.style.opacity = '1';
        char.style.transform = 'scale(1)';
        
        // Add typing sound effect
        this.playTypingSound();
        
        // Add glitch effect
        setTimeout(() => {
            this.addGlitchEffect(char);
        }, 500);
    }
    
    addGlitchEffect(char) {
        const originalText = char.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
        
        let glitchCount = 0;
        const glitchInterval = setInterval(() => {
            char.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            char.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            
            glitchCount++;
            if (glitchCount > 5) {
                clearInterval(glitchInterval);
                char.textContent = originalText;
                char.style.color = '';
            }
        }, 50);
    }
    
    startGlitchEffect() {
        this.glitchInterval = setInterval(() => {
            const randomChar = this.nameChars[Math.floor(Math.random() * this.nameChars.length)];
            this.addGlitchEffect(randomChar);
        }, 3000);
    }
    
    playTypingSound() {
        // Create audio context for typing sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800 + Math.random() * 400;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not supported
        }
    }
}

// Role Text Cycling System
class RoleCycler {
    constructor() {
        this.roleElement = document.getElementById('role-cycler');
        this.roles = [
            'BACKEND_DEVELOPER',
            'JAVA_SPECIALIST',
            'CLOUD_ARCHITECT',
            'PYTHON_DEVELOPER',
            'SYSTEM_ENGINEER',
            'DEVOPS_SPECIALIST'
        ];
        this.currentIndex = 0;
        this.typingSpeed = 100;
        this.pauseTime = 2000;
        
        this.init();
    }
    
    init() {
        this.cycleRoles();
    }
    
    async cycleRoles() {
        while (true) {
            await this.typeRole(this.roles[this.currentIndex]);
            await this.wait(this.pauseTime);
            await this.deleteRole();
            this.currentIndex = (this.currentIndex + 1) % this.roles.length;
        }
    }
    
    async typeRole(role) {
        this.roleElement.textContent = '';
        
        for (let i = 0; i < role.length; i++) {
            this.roleElement.textContent += role[i];
            await this.wait(this.typingSpeed);
        }
    }
    
    async deleteRole() {
        const currentText = this.roleElement.textContent;
        
        for (let i = currentText.length; i > 0; i--) {
            this.roleElement.textContent = currentText.substring(0, i);
            await this.wait(this.typingSpeed / 2);
        }
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Skill Orbs Animation System
class SkillOrbsAnimation {
    constructor() {
        this.skillOrbs = document.querySelectorAll('.skill-orb');
        this.connections = document.querySelector('.skill-connections');
        this.init();
    }
    
    init() {
        this.createConnections();
        this.addHoverEffects();
        this.startFloatingAnimation();
    }
    
    createConnections() {
        if (!this.connections) return;
        
        // Create SVG for connections
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        this.connections.appendChild(svg);
        
        // Create connections between skills
        this.skillOrbs.forEach((orb, index) => {
            if (index < this.skillOrbs.length - 1) {
                const nextOrb = this.skillOrbs[index + 1];
                this.createConnection(svg, orb, nextOrb);
            }
        });
    }
    
    createConnection(svg, orb1, orb2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', '#00ff41');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('opacity', '0.3');
        line.setAttribute('stroke-dasharray', '5,5');
        
        // Animate the line
        line.style.animation = 'dash 3s linear infinite';
        
        svg.appendChild(line);
        
        // Update line position
        this.updateConnectionPosition(line, orb1, orb2);
    }
    
    updateConnectionPosition(line, orb1, orb2) {
        const rect1 = orb1.getBoundingClientRect();
        const rect2 = orb2.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
        
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
    }
    
    addHoverEffects() {
        this.skillOrbs.forEach(orb => {
            orb.addEventListener('mouseenter', () => {
                orb.style.animationPlayState = 'paused';
                orb.style.transform = 'translateY(-50px) scale(1.2) rotateY(360deg)';
                
                // Add particle burst effect
                this.createParticleBurst(orb);
            });
            
            orb.addEventListener('mouseleave', () => {
                orb.style.animationPlayState = 'running';
                orb.style.transform = '';
            });
        });
    }
    
    createParticleBurst(orb) {
        const rect = orb.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: #00ff41;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 10) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    }
    
    startFloatingAnimation() {
        // Add CSS animation for floating
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dash {
                to {
                    stroke-dashoffset: -10;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Timestamp Updater
class TimestampUpdater {
    constructor() {
        this.timestampElement = document.getElementById('timestamp');
        this.init();
    }
    
    init() {
        this.updateTimestamp();
        setInterval(() => this.updateTimestamp(), 1000);
    }
    
    updateTimestamp() {
        const now = new Date();
        const timestamp = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}.${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}.${String(now.getSeconds()).padStart(2, '0')}`;
        
        if (this.timestampElement) {
            this.timestampElement.textContent = timestamp;
        }
    }
}

// Project Quantum Animation
class ProjectQuantumAnimation {
    constructor() {
        this.projects = document.querySelectorAll('.project-quantum');
        this.init();
    }
    
    init() {
        this.addHoverEffects();
        this.createHolographicEffects();
    }
    
    addHoverEffects() {
        this.projects.forEach(project => {
            project.addEventListener('mouseenter', () => {
                project.style.animationPlayState = 'paused';
                
                // Add quantum distortion effect
                this.addQuantumDistortion(project);
            });
            
            project.addEventListener('mouseleave', () => {
                project.style.animationPlayState = 'running';
                this.removeQuantumDistortion(project);
            });
        });
    }
    
    addQuantumDistortion(project) {
        const shell = project.querySelector('.quantum-shell');
        if (shell) {
            shell.style.filter = 'hue-rotate(90deg) brightness(1.2)';
            shell.style.transform = 'translateY(-20px) rotateX(10deg) rotateY(10deg) scale(1.05)';
        }
    }
    
    removeQuantumDistortion(project) {
        const shell = project.querySelector('.quantum-shell');
        if (shell) {
            shell.style.filter = '';
            shell.style.transform = '';
        }
    }
    
    createHolographicEffects() {
        this.projects.forEach(project => {
            const holoIcon = project.querySelector('.holo-icon');
            if (holoIcon) {
                // Add scanning effect
                this.addScanningEffect(holoIcon);
            }
        });
    }
    
    addScanningEffect(element) {
        const scanner = document.createElement('div');
        scanner.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #39ff14, transparent);
            animation: holo-scan 3s ease-in-out infinite;
        `;
        
        element.appendChild(scanner);
    }
}

// CV Download System
function initiateCVDownload() {
    // Create quantum download effect
    const downloadBtn = document.querySelector('.matrix-download-btn');
    if (downloadBtn) {
        downloadBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            downloadBtn.style.transform = '';
        }, 150);
    }
    
    // Create download animation
    createDownloadAnimation();
    
    // Simulate file download
    setTimeout(() => {
        downloadComplete();
    }, 2000);
}

function createDownloadAnimation() {
    const animation = document.createElement('div');
    animation.className = 'download-animation';
    animation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(0, 255, 65, 0.2), transparent);
        border: 2px solid #00ff41;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: download-pulse 2s ease-in-out;
    `;
    
    document.body.appendChild(animation);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes download-pulse {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.5; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.removeChild(animation);
    }, 2000);
}

function downloadComplete() {
    // Show completion notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.textContent = 'DOWNLOAD_COMPLETE.exe';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 65, 0.1);
        border: 1px solid #00ff41;
        color: #00ff41;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'Share Tech Mono', monospace;
        z-index: 10000;
        animation: notification-slide 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notification-slide {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        notification.style.animation = 'notification-slide 0.5s ease-in reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MATRIX REVOLUTION 2025 - INITIALIZING...');
    
    // Initialize Matrix Systems
    const matrixRealm = new MatrixRealm();
    const holographicGrid = new HolographicGrid();
    const quantumField = new QuantumField();
    const neuralNetwork = new NeuralNetwork();
    
    // Initialize Interface Systems
    const matrixNameTyping = new MatrixNameTyping();
    const roleCycler = new RoleCycler();
    const skillOrbsAnimation = new SkillOrbsAnimation();
    const timestampUpdater = new TimestampUpdater();
    const projectQuantumAnimation = new ProjectQuantumAnimation();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        matrixRealm.resize();
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            initiateCVDownload();
        }
        
        if (e.key === 'Escape') {
            // Reset all animations
            document.querySelectorAll('*').forEach(el => {
                if (el.style.animation) {
                    el.style.animationPlayState = 'running';
                }
            });
        }
    });
    
    // Add mouse trail effect
    let mouseTrail = [];
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: #00ff41;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
        `;
        
        document.body.appendChild(trail);
        mouseTrail.push(trail);
        
        if (mouseTrail.length > 10) {
            const oldTrail = mouseTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        // Animate trail fade
        setTimeout(() => {
            if (trail.parentNode) {
                trail.style.transition = 'opacity 0.5s ease';
                trail.style.opacity = '0';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 500);
            }
        }, 100);
    });
    
    console.log('✅ MATRIX REVOLUTION 2025 - INITIALIZATION COMPLETE');
    console.log('🌐 Welcome to the Next Generation Portfolio Matrix');
    console.log('💻 Developed by Guilherme Perlasca - 2025');
    console.log('🔧 Press Ctrl+D to download CV, ESC to reset animations');
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('🔧 SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('❌ SW registration failed: ', registrationError);
            });
    });
}

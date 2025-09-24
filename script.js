
/* ===== MATRIX RAIN ANIMATION ===== */
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Matrix characters
        this.matrix = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.fontSize = 14;
        this.columns = [];
        this.drops = [];

        this.init();
        this.animate();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const columns = Math.floor(this.canvas.width / this.fontSize);

        // Initialize drops
        this.drops = [];
        for (let i = 0; i < columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    animate() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Matrix green color
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = this.fontSize + 'px monospace';

        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.matrix[Math.floor(Math.random() * this.matrix.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            // Reset drop to top randomly
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

/* ===== TYPING ANIMATION ===== */
class TypeWriter {
    constructor(elementId, text, speed = 100) {
        this.element = document.getElementById(elementId);
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isTyping = false;
        this.cursor = document.querySelector('.cursor');

        this.init();
    }

    init() {
        this.startTyping();
    }

    async startTyping() {
        this.isTyping = true;

        for (let i = 0; i <= this.text.length; i++) {
            this.element.textContent = this.text.slice(0, i);

            // Add typing sound effect
            if (i < this.text.length) {
                this.playTypingSound();
            }

            await this.delay(this.speed);
        }

        this.isTyping = false;

        // Keep cursor blinking
        setInterval(() => {
            if (this.cursor) {
                this.cursor.style.opacity = this.cursor.style.opacity === '0' ? '1' : '0';
            }
        }, 500);
    }

    playTypingSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(600 + Math.random() * 200, audioContext.currentTime);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not supported or blocked
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/* ===== SMOOTH SCROLLING ===== */
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

/* ===== PROJECT CARDS ANIMATION ===== */
class ProjectCards {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
        });
    }

    setupHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                // Add subtle glow effect
                card.style.boxShadow = '0 10px 40px rgba(0, 255, 65, 0.2)';
            });

            card.addEventListener('mouseleave', (e) => {
                card.style.boxShadow = '';
            });
        });
    }
}

/* ===== SKILLS MARQUEE ANIMATION ===== */
class SkillsMarquee {
    constructor() {
        this.tracks = document.querySelectorAll('.skills-track');
        this.init();
    }

    init() {
        this.pauseOnHover();
    }

    pauseOnHover() {
        this.tracks.forEach(track => {
            track.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });

            track.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
        });
    }
}

/* ===== LANGUAGE TRANSLATION SYSTEM ===== */
class LanguageTranslator {
    constructor() {
        this.currentLanguage = 'pt';
        this.languageBtn = document.getElementById('language-btn');
        this.langText = document.getElementById('lang-text');
        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.loadSavedLanguage();
    }

    setupLanguageToggle() {
        this.languageBtn.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('portfolio-language');
        if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
            this.currentLanguage = savedLang;
            this.updateLanguage();
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'pt' ? 'en' : 'pt';
        this.updateLanguage();
        this.saveLanguage();
    }

    updateLanguage() {
        // Update button text
        this.langText.textContent = this.currentLanguage === 'pt' ? 'EN' : 'PT';
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage === 'pt' ? 'pt-BR' : 'en-US';
        
        // Update page title
        document.title = this.currentLanguage === 'pt' 
            ? 'Guilherme Perlasca - Desenvolvedor Backend'
            : 'Guilherme Perlasca - Backend Developer';
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.currentLanguage === 'pt'
                ? 'Portfólio de Guilherme Perlasca - Desenvolvedor Backend especializado em Java, Spring Boot, Python e tecnologias modernas'
                : 'Guilherme Perlasca Portfolio - Backend Developer specialized in Java, Spring Boot, Python and modern technologies';
        }

        // Translate all elements with data attributes
        this.translateElements();
        
        // Update CV download link
        this.updateCVLink();
    }

    translateElements() {
        const elementsToTranslate = document.querySelectorAll('[data-pt][data-en]');
        
        elementsToTranslate.forEach(element => {
            const text = this.currentLanguage === 'pt' 
                ? element.getAttribute('data-pt') 
                : element.getAttribute('data-en');
            
            if (text) {
                element.textContent = text;
            }
        });
    }

    updateCVLink() {
        const cvLink = document.querySelector('.download-cv');
        if (cvLink) {
            const newHref = this.currentLanguage === 'pt' 
                ? cvLink.getAttribute('data-pt-href')
                : cvLink.getAttribute('data-en-href');
            
            if (newHref) {
                cvLink.setAttribute('href', newHref);
            }
        }
    }

    saveLanguage() {
        localStorage.setItem('portfolio-language', this.currentLanguage);
    }
}

/* ===== CONTACT LINKS ANIMATION ===== */
class ContactLinks {
    constructor() {
        this.links = document.querySelectorAll('.contact-link');
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
    }

    setupHoverEffects() {
        this.links.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;

            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-5px) scale(1.05)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupClickEffects() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('download-cv')) {
                    e.preventDefault(); // Impede o comportamento padrão para controlarmos a ação
                    this.handleCVDownload(link);
                }
            });
        });
    }

    handleCVDownload(button) {
        const originalText = button.innerHTML;
        const cvPath = button.getAttribute('href');
        
        if (button.dataset.downloading === 'true') return;
        
        button.dataset.downloading = 'true';
        
        // Get current language for appropriate loading text
        const currentLang = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';
        const loadingText = currentLang === 'pt' ? 'Baixando...' : 'Downloading...';
        const successText = currentLang === 'pt' ? 'Baixado!' : 'Downloaded!';
        
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i><span>${loadingText}</span>`;
        button.style.pointerEvents = 'none';

        // Cria um link temporário para iniciar o download real do arquivo
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = cvPath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Simula o tempo de "download" para o efeito visual
        setTimeout(() => {
            button.innerHTML = `<i class="fas fa-check"></i><span>${successText}</span>`;

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.pointerEvents = 'auto';
                button.dataset.downloading = 'false';
            }, 2000);
        }, 1500);
    }
}

/* ===== INITIALIZE ALL COMPONENTS ===== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Portfolio...');

    // Initialize all components
    new MatrixRain();
    new TypeWriter('typed-name', 'Guilherme Perlasca');
    new SmoothScroll();
    new ProjectCards();
    new SkillsMarquee();
    new ContactLinks();
    new LanguageTranslator();

    console.log('✅ Matrix Portfolio Ready!');
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
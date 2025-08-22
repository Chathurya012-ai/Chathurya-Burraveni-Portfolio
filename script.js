// Developer-themed animations and effects
class DeveloperAnimations {
    constructor() {
        // Disabled visual effects that create dots
        // this.initMatrixRain();
        // this.initBinaryRain();
        this.initScrollProgress();
        this.initTypingEffect();
        this.initProjectCardEffects();
        // this.initCircuitBoardEffect();
        this.initCodeSyntaxHighlighting();
        this.initGitCommitHashes();
        this.initLoadingAnimations();
        this.initInteractiveElements();
    }

    // Matrix rain effect
    initMatrixRain() {
        const matrixBg = document.getElementById('matrixBg');
        if (!matrixBg) return;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        const columns = Math.floor(window.innerWidth / 20);

        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = i * 20 + 'px';
            column.style.animationDelay = Math.random() * 8 + 's';
            
            // Populate column with random characters
            for (let j = 0; j < 20; j++) {
                const char = document.createElement('span');
                char.textContent = characters[Math.floor(Math.random() * characters.length)];
                char.style.opacity = Math.random();
                column.appendChild(char);
            }
            
            matrixBg.appendChild(column);
        }
    }

    // Binary rain effect
    initBinaryRain() {
        const binaryRain = document.getElementById('binaryRain');
        if (!binaryRain) return;

        setInterval(() => {
            const digit = document.createElement('div');
            digit.className = 'binary-digit';
            digit.textContent = Math.random() > 0.5 ? '1' : '0';
            digit.style.left = Math.random() * 100 + '%';
            digit.style.animationDelay = Math.random() * 10 + 's';
            
            binaryRain.appendChild(digit);
            
            // Remove after animation
            setTimeout(() => {
                if (digit.parentNode) {
                    digit.parentNode.removeChild(digit);
                }
            }, 10000);
        }, 200);
    }

    // Scroll progress bar
    initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Enhanced typing effect
    initTypingEffect() {
        const typewriterElement = document.querySelector('.hero-subtitle.typewriter');
        if (!typewriterElement) return;

        const text = typewriterElement.getAttribute('data-text');
        if (!text) return;

        // Clear the element first
        typewriterElement.innerHTML = '';

        let i = 0;
        const speed = 100;
        let currentText = '';

        function typeWriter() {
            if (i < text.length) {
                const char = text.charAt(i);
                
                if (char === '|') {
                    currentText += '<br>';
                } else {
                    currentText += char;
                }
                
                typewriterElement.innerHTML = currentText;
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Project card hover effects
    initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const title = card.querySelector('h3').textContent;
                const techChips = Array.from(card.querySelectorAll('.tech-chip')).map(chip => chip.textContent);
                const codeContent = `// ${title}\nconst tech = [${techChips.map(tech => `'${tech}'`).join(', ')}];\nconsole.log('Project loaded:', tech);`;
                
                card.style.setProperty('--code-content', `"${codeContent}"`);
            });
        });
    }

    // NEW: Circuit board effect
    initCircuitBoardEffect() {
        const circuitBg = document.querySelector('.circuit-bg');
        if (!circuitBg) return;

        // Add dynamic circuit connections
        for (let i = 0; i < 10; i++) {
            const connection = document.createElement('div');
            connection.style.position = 'absolute';
            connection.style.width = '2px';
            connection.style.height = '50px';
            connection.style.background = 'linear-gradient(180deg, var(--primary), var(--accent))';
            connection.style.left = Math.random() * 100 + '%';
            connection.style.top = Math.random() * 100 + '%';
            connection.style.opacity = '0.3';
            connection.style.animation = `pulse ${2 + Math.random() * 3}s ease-in-out infinite`;
            
            circuitBg.appendChild(connection);
        }
    }

    // NEW: Code syntax highlighting
    initCodeSyntaxHighlighting() {
        const techChips = document.querySelectorAll('.tech-chip');
        techChips.forEach(chip => {
            const text = chip.textContent.toLowerCase();
            
            if (text.includes('java') || text.includes('python') || text.includes('javascript') || text.includes('typescript')) {
                chip.setAttribute('data-type', 'language');
            } else if (text.includes('spring') || text.includes('react') || text.includes('angular') || text.includes('vue')) {
                chip.setAttribute('data-type', 'framework');
            } else if (text.includes('mysql') || text.includes('postgresql') || text.includes('oracle') || text.includes('redis')) {
                chip.setAttribute('data-type', 'database');
            } else {
                chip.setAttribute('data-type', 'tool');
            }
        });
    }

    // NEW: Git commit hashes for experience cards
    initGitCommitHashes() {
        const experienceCards = document.querySelectorAll('.experience-card');
        experienceCards.forEach(card => {
            const hash = this.generateGitHash();
            card.setAttribute('data-hash', hash);
        });
    }

    // NEW: Loading animations
    initLoadingAnimations() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loading');
                        setTimeout(() => {
                            entry.target.classList.remove('loading');
                        }, 1500);
                    }
                });
            });
            observer.observe(section);
        });
    }

    // NEW: Interactive elements
    initInteractiveElements() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        this.showSearchModal();
                        break;
                    case 's':
                        e.preventDefault();
                        this.saveToLocalStorage();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.reloadWithAnimation();
                        break;
                }
            }
        });

        // Add click effects
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn') || e.target.classList.contains('contact-btn')) {
                this.createRippleEffect(e);
            }
        });
    }

    // Helper methods
    generateGitHash() {
        const chars = '0123456789abcdef';
        let hash = '';
        for (let i = 0; i < 7; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
    }

    createRippleEffect(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
        ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';

        e.target.style.position = 'relative';
        e.target.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    showSearchModal() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div style="background: var(--surface); padding: 20px; border-radius: 8px; min-width: 300px;">
                    <h3>Search Portfolio</h3>
                    <input type="text" placeholder="Search sections..." style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid var(--color-border); border-radius: 4px;">
                    <button onclick="this.parentElement.parentElement.remove()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    saveToLocalStorage() {
        localStorage.setItem('portfolioLastVisit', new Date().toISOString());
        this.showNotification('Portfolio state saved!', 'success');
    }

    reloadWithAnimation() {
        document.body.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            window.location.reload();
        }, 300);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 15px; border-radius: 8px; 
            background: var(--surface); border: 2px solid var(--primary); z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// PortfolioApp class for navigation
class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'skills', 'experience', 'projects', 'education', 'certificates', 'resume', 'contact'];
        this.init();
    }

    init() {
        this.loadTheme(); // Load saved theme
        this.setupEventListeners();
        this.handleInitialRoute();
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = e.target.getAttribute('href').substring(1);
                
                // Special handling for contact - scroll to get in touch section
                if (target === 'contact') {
                    e.preventDefault();
                    
                    // Find contact block in the currently active section
                    const activeSection = document.querySelector('.section.active');
                    let contactBlock = null;
                    
                    if (activeSection) {
                        contactBlock = activeSection.querySelector('.contact-block');
                    }
                    
                    // If not found in active section, find the first one on the page
                    if (!contactBlock) {
                        contactBlock = document.querySelector('.contact-block');
                    }
                    
                    if (contactBlock) {
                        contactBlock.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    return;
                }
                
                e.preventDefault();
                this.navigateToSection(target);
            });
        });

        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
                const isExpanded = navLinks.classList.contains('active');
                navToggle.setAttribute('aria-expanded', isExpanded);
            });
        }

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navLinks = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleInitialRoute();
        });
    }

    handleInitialRoute() {
        const hash = window.location.hash.substring(1);
        if (hash && this.sections.includes(hash)) {
            this.showSection(hash, false);
        } else {
            this.showSection('home', false);
        }
    }

    navigateToSection(sectionId) {
        if (this.sections.includes(sectionId)) {
            this.showSection(sectionId, true);
            this.updateNavigation(sectionId);
            this.updateDocumentTitle(sectionId);
            this.focusSectionHeading(sectionId);
            this.announceSectionChange(sectionId);
        }
    }

    showSection(sectionId, updateHistory = true) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        // Update URL
        if (updateHistory) {
            window.history.pushState({}, '', `#${sectionId}`);
        }
    }

    updateNavigation(activeSection) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.removeAttribute('aria-current');
        });

        const activeLink = document.querySelector(`[href="#${activeSection}"]`);
        if (activeLink) {
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    updateDocumentTitle(sectionId) {
        const sectionNames = {
            'home': 'Home',
            'skills': 'Skills',
            'experience': 'Experience',
            'projects': 'Projects',
            'education': 'Education',
            'certificates': 'Certificates',
            'resume': 'Resume',
            'contact': 'Contact'
        };

        const sectionName = sectionNames[sectionId] || 'Portfolio';
        document.title = `Chathurya Burraveni | ${sectionName}`;
    }

    focusSectionHeading(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const heading = section.querySelector('h1, h2');
            if (heading) {
                heading.focus();
            }
        }
    }

    announceSectionChange(sectionId) {
        const announcement = document.getElementById('section-announcement');
        if (announcement) {
            const sectionNames = {
                'home': 'Home',
                'skills': 'Skills',
                'experience': 'Experience',
                'projects': 'Projects',
                'education': 'Education',
                'certificates': 'Certificates',
                'resume': 'Resume',
                'contact': 'Contact'
            };

            const sectionName = sectionNames[sectionId] || 'Section';
            announcement.textContent = `Now viewing ${sectionName} section`;
        }
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }
}

// Enhanced confetti with tech symbols
function createTechConfetti() {
    const symbols = ['⚛️', '☕', '🐍', '⚡', '🔧', '🚀', '💻', '🔮', '⚙️', '🎯'];
    const colors = ['#00ff41', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.fontSize = '20px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        };
    }
}

// Enhanced popup with terminal effect
function showEmailPopup() {
    const popup = document.getElementById('celebrationPopup');
    const popupIcon = document.getElementById('popupIcon');
    const popupTitle = document.getElementById('popupTitle');
    const popupInfo = document.getElementById('popupInfo');
    const copyBtn = document.getElementById('copyBtn');
    
    popupIcon.textContent = '📧';
    popupTitle.textContent = 'Email Address';
    
    popup.style.display = 'flex';
    popup.classList.add('show');
    
    // Add terminal typing effect
    const email = 'bchathurya78@gmail.com';
    popupInfo.textContent = '';
    let index = 0;
    
    const typeEmail = () => {
        if (index < email.length) {
            popupInfo.textContent += email.charAt(index);
            index++;
            setTimeout(typeEmail, 100);
        }
    };
    
    setTimeout(typeEmail, 500);
    
    createTechConfetti();
}

function showPhonePopup() {
    const popup = document.getElementById('celebrationPopup');
    const popupIcon = document.getElementById('popupIcon');
    const popupTitle = document.getElementById('popupTitle');
    const popupInfo = document.getElementById('popupInfo');
    const copyBtn = document.getElementById('copyBtn');
    
    popupIcon.textContent = '📞';
    popupTitle.textContent = 'Phone Number';
    
    popup.style.display = 'flex';
    popup.classList.add('show');
    
    // Add terminal typing effect
    const phone = '+1 850-816-0994';
    popupInfo.textContent = '';
    let index = 0;
    
    const typePhone = () => {
        if (index < phone.length) {
            popupInfo.textContent += phone.charAt(index);
            index++;
            setTimeout(typePhone, 100);
        }
    };
    
    setTimeout(typePhone, 500);
    
    createTechConfetti();
}

function closePopup() {
    const popup = document.getElementById('celebrationPopup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

function copyToClipboard() {
    const popupInfo = document.getElementById('popupInfo');
    const text = popupInfo.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
}

function createConfetti() {
    const popup = document.getElementById('celebrationPopup');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        popup.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target); // reveal once
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Initialize AI animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new DeveloperAnimations();
    new PortfolioApp();
});

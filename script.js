// ==================== SCROLL PROGRESS BAR ====================
const scrollProgress = document.getElementById('scrollProgress');

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

// ==================== MOBILE MENU TOGGLE ====================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

// Scroll navigation highlight linked in consolidated listener below

// ==================== TYPED TEXT EFFECT ====================
const typedTextElement = document.querySelector('.typed-text');
const textArray = ['Engineer', 'Developer', 'Problem Solver', 'System Architect'];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.getElementById('scrollTop');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
function initScrollAnimations() {
    const animElements = document.querySelectorAll(
        '.timeline-item, .project-card, .skill-category, .award-item, .glass-card, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom'
    );
    
    animElements.forEach(el => {
        // If it doesn't already have a reveal class, add the default animate-on-scroll
        if (!el.classList.contains('reveal-up') && 
            !el.classList.contains('reveal-down') && 
            !el.classList.contains('reveal-left') && 
            !el.classList.contains('reveal-right') && 
            !el.classList.contains('reveal-zoom')) {
            el.classList.add('animate-on-scroll');
        }
        observer.observe(el);
    });
}

// Stagger delays dynamically inside grids
function initStaggeredDelays() {
    document.querySelectorAll('.projects-grid, .skills-grid, .awards-grid, .timeline').forEach(grid => {
        const children = Array.from(grid.children).filter(child => child.nodeType === 1);
        let delay = 0;
        children.forEach(child => {
            const target = child.classList.contains('glass-card') || 
                           child.classList.contains('project-card') || 
                           child.classList.contains('timeline-item') ||
                           child.classList.contains('skill-category') ||
                           child.classList.contains('award-item') ||
                           child.classList.contains('reveal-up') ||
                           child.classList.contains('reveal-left') ||
                           child.classList.contains('reveal-right') ||
                           child.classList.contains('reveal-zoom')
                           ? child 
                           : child.querySelector('.glass-card, .timeline-content');
            
            if (target) {
                target.style.transitionDelay = `${delay}s`;
                delay += 0.12; // Cascading delay
            }
        });
    });
}

// ==================== SKILL BARS ANIMATION ====================
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }, index * 80); // Stagger animation
    });
}

// ==================== STATS COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.stats-grid');
    if (!statsSection) return;

    // Use getBoundingClientRect for viewport checking
    const rect = statsSection.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    
    const isVisible = (elemTop < window.innerHeight) && (elemBottom >= 0);

    if (isVisible) {
        statNumbers.forEach(stat => {
            const text = stat.textContent.trim();
            const hasPlus = text.endsWith('+');
            const target = parseFloat(text);
            const isDecimal = text.includes('.');
            const increment = target / 50;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (isDecimal) {
                        stat.textContent = current.toFixed(2);
                    } else {
                        stat.textContent = Math.ceil(current) + (hasPlus ? '+' : '');
                    }
                    setTimeout(updateCounter, 30);
                } else {
                    if (isDecimal) {
                        stat.textContent = target.toFixed(2);
                    } else {
                        stat.textContent = target + (hasPlus ? '+' : '');
                    }
                }
            };

            updateCounter();
        });
        statsAnimated = true;
    }
}

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Show success message
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In production, send this data to your backend
        console.log('Form submitted:', formData);
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== CONSOLIDATED SCROLL HANDLER ====================
// Fast-path scroll updates (lightweight styles)
function handleScrollHeavy() {
    const scrolled = window.pageYOffset;
    
    // 1. Scroll Progress Bar
    if (scrollProgress) {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercent = height > 0 ? (scrolled / height) * 100 : 0;
        scrollProgress.style.width = scrolledPercent + '%';
    }
    
    // 2. Navbar scrolled effect
    if (navbar) {
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // 3. Scroll to Top Button
    if (scrollTopBtn) {
        if (scrolled > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    // 4. Hero Parallax (Subtle upward shift, only when hero is visible)
    const hero = document.getElementById('home');
    const profileCard = document.querySelector('.profile-card');
    if (hero && profileCard) {
        const heroHeight = hero.offsetHeight;
        if (scrolled <= heroHeight) {
            profileCard.style.transform = `translateY(${scrolled * -0.15}px)`;
        }
    }
}

// Slow-path scroll checks (heavy updates, layout triggers)
const handleScrollLight = debounce(() => {
    highlightNavLink();
    animateStats();
}, 15);

// Consolidated window scroll listener
window.addEventListener('scroll', () => {
    handleScrollHeavy();
    handleScrollLight();
}, { passive: true });

// ==================== COPY EMAIL ON CLICK ====================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');
        
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!', 'success');
        });
    });
});

// ==================== DEBOUNCE FUNCTION ====================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== PROJECT CARD TILT EFFECT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== CONSOLE GREETING ====================
console.log('%c👋 Hey there, Developer!', 'font-size: 24px; color: #ffffff; font-weight: bold; background: #0a0a0a; padding: 20px;');
console.log('%c🚀 Software Development Engineer | DSA • System Design • Backend Architecture', 'font-size: 16px; color: #a3a3a3; background: #0a0a0a; padding: 10px;');
console.log('%c💼 Email: joshikrishna2125@gmail.com', 'font-size: 14px; color: #22c55e; background: #0a0a0a; padding: 10px;');
console.log('%c🌐 GitHub: https://github.com/krishnajoshi', 'font-size: 14px; color: #22c55e; background: #0a0a0a; padding: 10px;');

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    highlightNavLink();
    
    // Add subtle entrance animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease';
    }
});

// ==================== EASTER EGG: KONAMI CODE ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    showNotification('🎮 Konami Code Activated! You\'re awesome!', 'success');
    
    // Add fun effect
    document.body.style.animation = 'rainbow 2s ease';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images when they're about to enter viewport
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== ACCESSIBILITY IMPROVEMENTS ====================
// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 2px solid #ffffff;
        outline-offset: 4px;
    }
`;
document.head.appendChild(focusStyle);

// ==================== PRELOAD CRITICAL RESOURCES ====================
// Preload fonts
const fontPreload = document.createElement('link');
fontPreload.rel = 'preload';
fontPreload.as = 'font';
fontPreload.type = 'font/woff2';
fontPreload.crossOrigin = 'anonymous';
document.head.appendChild(fontPreload);

// ==================== SERVICE WORKER (PWA READY) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you add a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ==================== INITIALIZE ON DOM LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! ✨');
    
    // Initialize reveal elements and stagger delays
    initStaggeredDelays();
    initScrollAnimations();
    
    // Run initial positioning check
    handleScrollHeavy();
    highlightNavLink();
    animateStats();
    
    // Add entrance animations
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
});

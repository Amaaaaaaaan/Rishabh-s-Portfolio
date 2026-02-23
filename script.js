// ===== Navigation Active Link Update =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function highlightActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Update navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

// Highlight active link on page load
highlightActiveLink();

// Update on scroll
window.addEventListener('scroll', highlightActiveLink);

// Update on click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu if open
        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.display = 'none';
            const hamburger = document.querySelector('.hamburger');
            hamburger.classList.remove('active');
        }
    });
});

// ===== Smooth Scrolling ===== 
function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// ===== Skill Bar Animation on Scroll =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.parentElement.parentElement.querySelector('.skill-name').textContent;
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all skill progress bars
document.querySelectorAll('.skill-progress').forEach(bar => {
    observer.observe(bar);
});

// ===== Scroll Indicator Click =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        scrollTo('about');
    });
}

// ===== Counter Animation for Stats =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.textContent);
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat h4').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== Event Card Animation on Scroll =====
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.event-card').forEach(card => {
    cardObserver.observe(card);
});

// ===== Highlight Card Stagger Animation =====
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.highlight-card');
            cards.forEach((card, index) => {
                card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-highlights').forEach(container => {
    highlightObserver.observe(container);
});

// ===== Navbar Mobile Style =====
if (window.innerWidth <= 768) {
    const navLink = document.querySelector('.nav-links');
    navLink.style.position = 'absolute';
    navLink.style.top = '60px';
    navLink.style.left = '0';
    navLink.style.right = '0';
    navLink.style.flexDirection = 'column';
    navLink.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    navLink.style.padding = '1rem 0';
    navLink.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    navLink.style.display = 'none';
    navLink.style.zIndex = '999';
}

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate hero text on load
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.style.animation = 'fadeInUp 0.8s ease-out';
    }
    if (heroImage) {
        heroImage.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
    }
});

// ===== Parallax Effect on Scroll =====
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundPosition = `0% ${window.scrollY * 0.5}px`;
    }
});

// ===== Add Smooth Scroll Behavior Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and interactions
    console.log('Portfolio loaded successfully!');
});

// ===== Keyboard Navigation Support =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on Escape
        if (hamburger && navLinksContainer) {
            navLinksContainer.style.display = 'none';
            hamburger.classList.remove('active');
        }
    }
});

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeInUp 0.8s ease-out';
});

// ===== Fade In on Scroll Elements =====
const fadeElements = document.querySelectorAll('[class*="fade"]');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    fadeObserver.observe(element);
});

// ===== Provide Feedback Function =====
function showFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideInLeft 0.5s ease-out reverse';
        setTimeout(() => feedback.remove(), 500);
    }, 3000);
}

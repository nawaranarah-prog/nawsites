// Modal functionality
const modal = document.getElementById('quote-modal');
const openModalBtn = document.getElementById('open-quote-modal');
const closeModalBtn = document.querySelector('.close-modal');

openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links with active state
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update active navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 18, 34, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(#home)').forEach(section => {
    observer.observe(section);
});

// REAL Language toggle logic
document.getElementById('lang-toggle').addEventListener('click', function() {
    const btn = this;
    const heroTitle = document.querySelector('.hero-content h1');
    
    if (btn.textContent === 'EN') {
        btn.textContent = 'AR';
        heroTitle.textContent = "تصميم مواقع احترافية في دبي"; 
        document.body.style.direction = 'rtl';
    } else {
        btn.textContent = 'EN';
        heroTitle.textContent = "Premium Web Development in Dubai";
        document.body.style.direction = 'ltr';
    }
});

// REAL Currency toggle logic
document.getElementById('currency-toggle').addEventListener('click', function() {
    const button = this;
    const priceElements = document.querySelectorAll('.price, .price-range');
    
    if (button.textContent === 'AED') {
        button.textContent = 'USD';
        priceElements.forEach(el => {
            if (el.textContent.includes('AED')) {
                let aedVal = parseInt(el.textContent.replace(/[^0-9]/g, ''));
                let usdVal = Math.round(aedVal / 3.67);
                el.textContent = el.textContent.replace('AED', '$').replace(/[0-9,]+/, usdVal.toLocaleString());
            }
        });
    } else {
        button.textContent = 'AED';
        location.reload(); 
    }
});

// Formspree handles form submission automatically

// Add hover effects to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click tracking for WhatsApp buttons
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        // Could add analytics tracking here
        console.log('WhatsApp link clicked');
    });
});

// Mobile menu toggle (placeholder for hamburger menu)
function initMobileMenu() {
    // This would be implemented if we add a hamburger menu
    // For now, navigation links are hidden on mobile
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();

    // 1. Make the Hero show up immediately
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.classList.add('fade-in-up');
        hero.style.opacity = "1"; // Force it!
    }

    // 2. This is the magic fix for your "Empty" sections:
    // It tells every section to stop being invisible the moment the page loads.
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-up');
        section.style.opacity = "1"; 
        section.style.transform = "translateY(0)";
    });
    
    console.log("Nawsites is fully loaded and forced to be visible!");
});
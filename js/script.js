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

// Language toggle (placeholder)
document.getElementById('lang-toggle').addEventListener('click', function() {
    // Placeholder for language switching
    alert('Language switching functionality would be implemented here');
});

// Currency toggle
document.getElementById('currency-toggle').addEventListener('click', function() {
    const button = this;
    if (button.textContent === 'AED') {
        button.textContent = 'USD';
        // Placeholder for currency conversion
        alert('Currency switching to USD (placeholder)');
    } else {
        button.textContent = 'AED';
        alert('Currency switching to AED (placeholder)');
    }
});

// Form submission for both forms
document.addEventListener('submit', function(e) {
    if (e.target.id === 'quote-form' || e.target.id === 'quote-form-modal') {
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Get checkbox values
        const features = [];
        e.target.querySelectorAll('input[name="features"]:checked').forEach(checkbox => {
            features.push(checkbox.value);
        });
        data.features = features;

        // Basic validation
        if (!data['full-name'] || !data.email || !data.phone || !data['business-name'] || !data.description) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // In a real application, this would send data to a server
        console.log('Quote request data:', data);

        // Show success message
        showNotification('Thank you for your quote request! We will get back to you within 24 hours.', 'success');

        // Close modal if it's the modal form
        if (e.target.id === 'quote-form-modal') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Reset form
        e.target.reset();
    }
});

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '6px';
    notification.style.color = '#ffffff';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '3000';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.animation = 'slideInRight 0.3s ease';

    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
    } else {
        notification.style.backgroundColor = '#dc3545';
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

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

    // Add fade-in animation to hero content
    document.querySelector('.hero-content').classList.add('fade-in-up');
});
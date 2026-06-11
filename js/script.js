// Modal functionality
const modal = document.getElementById('quote-modal');
const openModalBtn = document.getElementById('open-quote-modal');
const closeModalBtn = document.querySelector('.close-modal');

if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (!href) return;
        // exact file match
        if (href === currentPath) {
            link.classList.add('active');
            return;
        }
        // anchor on home
        if (href.startsWith('index.html#') && currentPath === 'index.html') {
            link.classList.add('active');
            return;
        }
        // anchor fragments
        if (href.startsWith('#') && currentPath === 'index.html') {
            link.classList.add('active');
            return;
        }
    });
}

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

// Language toggle logic
const translations = {
    en: {
        navHome: 'Home',
        navSkills: 'Skills',
        navServices: 'Services',
        navAbout: 'About',
        navPortfolio: 'Portfolio',
        navPricing: 'Pricing',
        navQuote: 'Request Quote',
        navTestimonials: 'Testimonials',
        navContact: 'Contact',
        heroTag: 'Dubai • Full Stack Web Development • Backend Systems',
        heroTitle: 'Nawsites',
        heroText: 'Building premium web platforms, secure backend systems, and high-converting digital experiences for ambitious businesses in Dubai and worldwide.',
        heroCTA1: 'Request a Quote',
        heroCTA2: 'Chat on WhatsApp',
        heroSectionTitle: 'Comprehensive Web Development for Growing Brands',
        heroSectionText: 'From enterprise-grade backend systems to polished frontend design, Nawsites delivers fully integrated web projects with the attention to detail and reliability expected from a dedicated development partner.'
    },
    ar: {
        navHome: 'الرئيسية',
        navSkills: 'المهارات',
        navServices: 'الخدمات',
        navAbout: 'من نحن',
        navPortfolio: 'المعرض',
        navPricing: 'الأسعار',
        navQuote: 'طلب عرض سعر',
        navTestimonials: 'الشهادات',
        navContact: 'تواصل',
        heroTag: 'دبي • تطوير ويب شامل • أنظمة خلفية',
        heroTitle: 'نوازيتس',
        heroText: 'نبني منصات ويب مميزة، أنظمة خلفية آمنة، وتجارب رقمية عالية التحويل للشركات الطموحة في دبي والعالم.',
        heroCTA1: 'طلب عرض سعر',
        heroCTA2: 'الدردشة عبر واتساب',
        heroSectionTitle: 'تطوير ويب شامل للعلامات التجارية النامية',
        heroSectionText: 'من أنظمة خلفية احترافية إلى تصميم واجهة أمامية مصقول، نوازيتس تقدم مشاريع متكاملة بجودة ومصداقية عالية.'
    }
};

function translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const value = translations[lang] && translations[lang][key];
        if (value) {
            el.textContent = value;
        }
    });
    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

const langButton = document.getElementById('lang-toggle');
if (langButton) {
    langButton.addEventListener('click', function() {
        const nextLang = this.textContent === 'EN' ? 'ar' : 'en';
        this.textContent = nextLang === 'en' ? 'EN' : 'AR';
        translatePage(nextLang);
    });
}

// Currency toggle logic
const currencyData = {
    AED: { symbol: 'AED', rate: 1 },
    USD: { symbol: '$', rate: 0.272 },
    EUR: { symbol: '€', rate: 0.244 },
    GBP: { symbol: '£', rate: 0.21 }
};
const currencyOrder = ['AED', 'USD', 'EUR', 'GBP'];
let currencyIndex = 0;

function formatPrice(value, symbol) {
    return `${symbol} ${value.toLocaleString()}`;
}

function updatePrices(currency) {
    document.querySelectorAll('[data-price-aed]').forEach(el => {
        const baseValue = Number(el.dataset.priceAed);
        if (!Number.isFinite(baseValue)) return;
        const converted = Math.round(baseValue * currencyData[currency].rate);
        el.textContent = formatPrice(converted, currencyData[currency].symbol);
    });
    document.querySelectorAll('[data-price-range-aed]').forEach(el => {
        const min = Number(el.dataset.priceRangeMinAed);
        const max = Number(el.dataset.priceRangeMaxAed);
        if (!Number.isFinite(min) || !Number.isFinite(max)) return;
        const minConverted = Math.round(min * currencyData[currency].rate);
        const maxConverted = Math.round(max * currencyData[currency].rate);
        el.textContent = `${formatPrice(minConverted, currencyData[currency].symbol)} - ${formatPrice(maxConverted, currencyData[currency].symbol)}`;
    });
}

const currencyButton = document.getElementById('currency-toggle');
if (currencyButton) {
    currencyButton.addEventListener('click', function() {
        currencyIndex = (currencyIndex + 1) % currencyOrder.length;
        const nextCurrency = currencyOrder[currencyIndex];
        this.textContent = nextCurrency;
        updatePrices(nextCurrency);
    });
}

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
    setActiveNavLink();

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
    // Intro overlay handling: click to enter
    const intro = document.getElementById('intro');
    const logo = document.querySelector('.logo');
    function hideIntro() {
        if (!intro) return;
        intro.classList.add('hidden');
        // after animation remove intro and scroll to #start
        setTimeout(() => {
            if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
            const start = document.getElementById('start');
            if (start) {
                start.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 700);
    }
    if (intro) {
        intro.addEventListener('click', hideIntro);
        // allow pressing Enter/Space to enter
        intro.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') hideIntro();
        });
    }
    if (logo) {
        logo.addEventListener('click', function(e) {
            // If on index, trigger intro animation to mimic opening
            if (window.location.pathname.split('/').pop() === 'index.html' || window.location.pathname.split('/').pop() === '') {
                const existingIntro = document.getElementById('intro');
                if (existingIntro) {
                    // do nothing if intro visible
                    return;
                }
                // create a quick overlay mimic
                const temp = document.createElement('div');
                temp.className = 'intro';
                temp.innerHTML = '<h1 class="intro-title">Nawsites</h1><p class="intro-sub">Click to enter</p>';
                document.body.appendChild(temp);
                setTimeout(() => temp.classList.add('hidden'), 1200);
                setTimeout(() => { if (temp.parentNode) temp.parentNode.removeChild(temp); }, 1900);
            } else {
                // navigate home
                window.location.href = 'index.html';
            }
        });
    }
});
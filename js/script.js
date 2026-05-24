// ==================== DOM Elements ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

// ==================== Backend Configuration ====================
const BACKEND_URL = 'https://interior-uz2r.onrender.com';

// ==================== Hamburger Menu Toggle ====================
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ==================== Close Menu on Link Click ====================
const allMenuLinks = document.querySelectorAll('.nav-link, .dropdown-item, .all-services-link');
allMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // If clicking the dropdown link on mobile, toggle the dropdown instead of closing the menu
        if (window.innerWidth <= 992 && link.classList.contains('nav-link') && link.parentElement.classList.contains('dropdown')) {
            e.preventDefault();
            link.parentElement.classList.toggle('active');
            return;
        }
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        
        // Also close the dropdown itself so it's not open next time
        const dropdownParent = document.querySelector('.nav-item.dropdown');
        if (dropdownParent) dropdownParent.classList.remove('active');
    });
});

// ==================== Sticky Navbar ====================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== Set Active Nav Link ====================
function getCurrentPageFile() {
    const raw = window.location.pathname || '';
    const file = raw.split('/').filter(Boolean).pop() || 'index.html';
    if (file === '/' || file === '') return 'index.html';
    return file;
}

function normalizeHrefToFile(href) {
    if (!href) return '';
    if (href.startsWith('#')) return '';
    const withoutHash = href.split('#')[0];
    const withoutQuery = withoutHash.split('?')[0];
    const file = withoutQuery.split('/').filter(Boolean).pop() || '';
    if (file === '' || file === '/') return 'index.html';
    return file;
}

function isServicePage(file) {
    const servicePages = new Set([
        'services.html',
        'service-detail.html',
        'pvc-panel.html',
        'wpc-panel.html',
        'uv-marble.html',
        '3d-panels.html',
        'wallpaper.html',
        'wooden-flooring.html',
        'window-curtains.html',
        'pvc-flooring.html',
        'artificial-grass.html',
        'mosaic-glass.html',
        'wall-molding.html',
        'sofit-panel.html'
    ]);
    return servicePages.has(file);
}

function setActiveNavLink() {
    const currentFile = getCurrentPageFile();

    navLinks.forEach(link => link.classList.remove('active'));

    navLinks.forEach(link => {
        const hrefFile = normalizeHrefToFile(link.getAttribute('href'));
        if (!hrefFile) return;

        if (hrefFile === currentFile) {
            link.classList.add('active');
            return;
        }

        if (hrefFile === 'services.html' && isServicePage(currentFile)) {
            link.classList.add('active');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveNavLink);
} else {
    setActiveNavLink();
}

// ==================== Scroll to Top Button ====================
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== Smooth Scroll for Navigation Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Gallery Filter ====================
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });
}

// ==================== Lightbox Functionality ====================
let currentLightboxIndex = 0;
const allImages = Array.from(galleryItems).map(item => item.querySelector('img').src);

function openLightbox(btn) {
    const img = btn.closest('.gallery-item').querySelector('img');
    lightboxImage.src = img.src;
    lightbox.classList.add('active');
    currentLightboxIndex = allImages.indexOf(img.src);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % allImages.length;
    lightboxImage.src = allImages[currentLightboxIndex];
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + allImages.length) % allImages.length;
    lightboxImage.src = allImages[currentLightboxIndex];
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

// ==================== Animated Counter ====================
function animateCounter() {
    const statCards = document.querySelectorAll('.stat-number');
    
    statCards.forEach(card => {
        const finalValue = parseInt(card.getAttribute('data-target'));
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 30);
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                card.innerHTML = finalValue + '<span>+</span>';
                clearInterval(counter);
            } else {
                card.innerHTML = currentValue + '<span>+</span>';
            }
        }, 30);
    });
}

// Trigger counter animation when section is in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-section')) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// ==================== Scroll Animation for Elements ====================
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .feature-card, .blog-card, .team-card').forEach(element => {
    element.style.opacity = '0';
    scrollAnimationObserver.observe(element);
});

// ==================== Hero Slider ====================
let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const prevArrow = document.querySelector('.hero-arrow.prev');
const nextArrow = document.querySelector('.hero-arrow.next');
const sliderDots = document.querySelectorAll('.hero-dots .dot');
const heroSection = document.querySelector('.hero');
let slideInterval;

function showSlide(n) {
    if (heroSlides.length === 0) return;
    
    // Normalize index
    if (n >= heroSlides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = heroSlides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Update slides active state
    heroSlides.forEach((slide, idx) => {
        if (idx === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update dots active state
    sliderDots.forEach((dot, idx) => {
        if (idx === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Start auto rotation
function startSlideShow() {
    stopSlideShow();
    if (heroSlides.length > 1) {
        slideInterval = setInterval(nextSlide, 8000);
    }
}

function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function resetSlideShow() {
    startSlideShow();
}

// Event Listeners for controls
if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        prevSlide();
        resetSlideShow();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        nextSlide();
        resetSlideShow();
    });
}

if (sliderDots.length > 0) {
    sliderDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetSlideShow();
        });
    });
}

// Keyboard Navigation for Slider
document.addEventListener('keydown', (e) => {
    // Only scroll slider if lightbox is not active
    const isLightboxActive = lightbox && lightbox.classList.contains('active');
    if (!isLightboxActive) {
        // Also check if slider is in view or user is not inside an input/textarea
        const activeElem = document.activeElement;
        const isInput = activeElem && (activeElem.tagName === 'INPUT' || activeElem.tagName === 'TEXTAREA' || activeElem.tagName === 'SELECT');
        
        if (!isInput) {
            if (e.key === 'ArrowRight') {
                nextSlide();
                resetSlideShow();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                resetSlideShow();
            }
        }
    }
});

// Swipe gestures for touch screens
if (heroSection) {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Ensure swipe was horizontal and significant enough
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swiped right -> show previous slide
                prevSlide();
            } else {
                // Swiped left -> show next slide
                nextSlide();
            }
            resetSlideShow();
        }
    }
}

// Initialize slideshow
startSlideShow();

// ==================== FAQ Accordion ====================
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close other open items
        faqItems.forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// ==================== Contact Form Handling ====================
const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        const payload = {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            phone: formData.get('phone')?.trim(),
            city: formData.get('city')?.trim(),
            service: formData.get('service')?.trim(),
            message: formData.get('message')?.trim(),
        };

        if (!payload.name || !payload.email || !payload.phone || !payload.message) {
            if (contactMessage) {
                contactMessage.textContent = 'Please fill in all required fields.';
                contactMessage.style.color = '#d93025';
            }
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)) {
            if (contactMessage) {
                contactMessage.textContent = 'Please enter a valid email address.';
                contactMessage.style.color = '#d93025';
            }
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            // Use deployed backend server URL so this works from any frontend host.
            const response = await fetch(`${BACKEND_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            let result;
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                try {
                    result = await response.json();
                } catch (parseError) {
                    result = {};
                    console.warn('Failed to parse JSON response:', parseError);
                }
            } else {
                const text = await response.text();
                result = text ? { error: text } : {};
            }

            if (!response.ok) {
                const errorMessage = result.error || result.message || response.statusText || 'Unable to send your inquiry.';
                throw new Error(errorMessage);
            }

            if (contactMessage) {
                contactMessage.textContent = result.message || 'Your message has been sent successfully.';
                contactMessage.style.color = '#0f5132';
            }
            contactForm.reset();
        } catch (error) {
            if (contactMessage) {
                contactMessage.textContent = error.message || 'Server error. Please try again later.';
                contactMessage.style.color = '#d93025';
            }
            console.error('Contact form submission failed:', error);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    });
}

// ==================== Newsletter Form Handling ====================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! Check your email.');
        newsletterForm.reset();
    });
}

// ==================== Testimonial Slider ====================
function setupTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 1) {
        let currentTestimonial = 0;
        
        // You can add auto-rotation here if needed
        // setInterval(() => {
        //     currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        // }, 5000);
    }
}

setupTestimonialSlider();

// ==================== Utility Functions ====================

// Debounce function for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== Initialize AOS (Animate On Scroll) Alternative ====================
function observeElements() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        elementObserver.observe(element);
    });
}

// ==================== Pagination (if needed) ====================
function setupPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            paginationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Implement actual pagination logic here
        });
    });
}

setupPagination();

// ==================== Dark Mode Toggle (Optional) ====================
// Uncomment if you want to add dark mode functionality
/*
function setupDarkMode() {
    const darkModeBtn = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }
}

setupDarkMode();
*/

// ==================== Image Lazy Loading ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== Smooth Scroll Behavior ====================
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==================== Initialize on DOM Ready ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    setActiveNavLink();
    observeElements();
    setupTestimonialSlider();
    setupPagination();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 50
        });
    }
    
    // Log that script is loaded
    console.log('Krishna Interior House - Website Initialized');
});

// ==================== Performance Optimization ====================
// Debounce window resize events
window.addEventListener('resize', debounce(() => {
    // Re-calculate layout if needed
}, 250));

// Throttle scroll events
window.addEventListener('scroll', throttle(() => {
    // Perform scroll-based calculations
}, 100));

// ==================== Service Worker Registration (Optional) ====================
/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service Worker registered');
    }).catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}
*/

// ==================== Error Handling ====================
window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
});

// ==================== Prevent Default Behaviors ====================
document.addEventListener('contextmenu', (e) => {
    // Allow right-click context menu (uncomment to disable)
    // e.preventDefault();
});

// ==================== Export Functions for Testing ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smoothScroll,
        debounce,
        throttle,
        animateCounter,
        openLightbox,
        closeLightbox,
        nextImage,
        prevImage
    };
}

// ==================== Home Page Services Toggle ====================
const toggleServicesBtn = document.getElementById('toggle-services-btn');
const servicesGrid = document.querySelector('.services-preview .services-grid');

if (toggleServicesBtn && servicesGrid) {
    // Initially collapse the grid
    servicesGrid.classList.add('collapsed');

    toggleServicesBtn.addEventListener('click', () => {
        if (servicesGrid.classList.contains('collapsed')) {
            servicesGrid.classList.remove('collapsed');
            toggleServicesBtn.textContent = 'Show Less';
            toggleServicesBtn.style.background = 'linear-gradient(45deg, var(--primary-color), #16213e)';
            toggleServicesBtn.style.color = 'var(--gold)';
        } else {
            servicesGrid.classList.add('collapsed');
            toggleServicesBtn.textContent = 'See More';
            toggleServicesBtn.style.background = '';
            toggleServicesBtn.style.color = '';
            
            // Scroll back to the top of the services section
            const servicesSection = document.querySelector('.services-preview');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ==================== Service Card Click to Navigate ====================
// Homepage Service Cards
document.querySelectorAll('.services-preview .service-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't navigate if the "Learn More" link was clicked (it handles itself)
        if (e.target.closest('.read-more')) return;
        
        const serviceId = card.getAttribute('id');
        if (serviceId) {
            window.location.href = 'service-detail.html?id=' + serviceId;
        }
    });
});

// Services Page Service Cards
document.querySelectorAll('.services-grid-full .service-card-full').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't navigate if any CTA button was clicked (it handles itself)
        if (e.target.closest('.btn')) return;
        
        const serviceId = card.getAttribute('id');
        if (serviceId) {
            window.location.href = 'service-detail.html?id=' + serviceId;
        }
    });
});


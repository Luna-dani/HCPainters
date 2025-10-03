// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, #304B54 0%, #000000 20%, #000000 80%, #304B54 100%)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #304B54 0%, #000000 20%, #000000 80%, #304B54 100%)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    }
});

// Service Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding tab content
        const tabId = button.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Validate form data
        if (!name || !email || !service || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`New Contact Form Submission - ${service}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Service: ${service}\n\n` +
            `Message:\n${message}`
        );
        
        const mailtoLink = `mailto:hcpaintershomeimprovements@gmail.com?subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            alert('Your email client will open. Please send the email to submit your message.');
            contactForm.reset();
        }, 500);
    });
}

// Simulate form submission (replace with actual backend integration)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% success rate)
            if (Math.random() > 0.1) {
                resolve(data);
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success/error messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Insert message after form
    contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.display = 'none';
        }
    }, 5000);
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .feature');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery lightbox functionality (placeholder)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Placeholder for lightbox functionality
        console.log('Gallery item clicked - lightbox would open here');
    });
});

// Service cards hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
`;

scrollToTopBtn.addEventListener('click', scrollToTop);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

document.body.appendChild(scrollToTopBtn);

// Add hover effects to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.background = '#1d4ed8';
    scrollToTopBtn.style.transform = 'translateY(-2px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.background = '#2563eb';
    scrollToTopBtn.style.transform = 'translateY(0)';
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });
}

// Form field validation styling
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#e2e8f0';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#2563eb';
    });
});

// Lazy loading for gallery images (placeholder)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading animation for page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingCSS = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;

const style = document.createElement('style');
style.textContent = loadingCSS;
document.head.appendChild(style);

// Teddies Hair Design - Main JavaScript

// ===================================
// NAVIGATION
// ===================================

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===================================
// SERVICE CATEGORY ACCORDION
// ===================================

const serviceCategories = document.querySelectorAll('.service-category__header');

serviceCategories.forEach(header => {
    header.addEventListener('click', () => {
        const category = header.parentElement;

        // Toggle current category
        category.classList.toggle('active');

        // Optional: Close other categories (uncomment if you want accordion behavior)
        // const allCategories = document.querySelectorAll('.service-category');
        // allCategories.forEach(cat => {
        //     if (cat !== category) {
        //         cat.classList.remove('active');
        //     }
        // });
    });
});

// Open first category by default
if (serviceCategories.length > 0) {
    serviceCategories[0].parentElement.classList.add('active');
}

// ===================================
// GALLERY FILTERING
// ===================================

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery__item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Get filter value
        const filterValue = btn.getAttribute('data-filter');

        // Filter gallery items
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.style.display = 'none';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 10);
                }
            }
        });
    });
});

// ===================================
// LIGHTBOX
// ===================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxPrev = document.querySelector('.lightbox__prev');
const lightboxNext = document.querySelector('.lightbox__next');

let currentImageIndex = 0;
let visibleImages = [];

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Get all visible images
        visibleImages = Array.from(galleryItems).filter(img => !img.classList.contains('hide'));
        currentImageIndex = visibleImages.indexOf(item);

        const imgSrc = item.querySelector('img').src;
        const imgAlt = item.querySelector('img').alt;

        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navigate lightbox
function showImage(index) {
    if (index >= visibleImages.length) {
        currentImageIndex = 0;
    } else if (index < 0) {
        currentImageIndex = visibleImages.length - 1;
    } else {
        currentImageIndex = index;
    }

    const imgSrc = visibleImages[currentImageIndex].querySelector('img').src;
    const imgAlt = visibleImages[currentImageIndex].querySelector('img').alt;

    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
        showImage(currentImageIndex - 1);
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
        showImage(currentImageIndex + 1);
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentImageIndex + 1);
        }
    }
});

// ===================================
// TESTIMONIALS CAROUSEL
// ===================================

const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showTestimonial(currentSlide);
    });
});

// Auto-rotate testimonials
function rotateTestimonials() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showTestimonial(currentSlide);
}

// Start auto-rotation
let testimonialInterval = setInterval(rotateTestimonials, 5000);

// Pause on hover
const testimonialsSection = document.querySelector('.testimonials__slider');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialsSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(rotateTestimonials, 5000);
    });
}

// Show first testimonial
if (testimonials.length > 0) {
    showTestimonial(0);
}

// ===================================
// BOOKING FORM - MULTI-STEP
// ===================================

const bookingSteps = document.querySelectorAll('.booking-step');
const progressSteps = document.querySelectorAll('.progress-step');
let currentStep = 1;

function showStep(stepNumber) {
    // Hide all steps
    bookingSteps.forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    const currentStepElement = document.querySelector(`.booking-step[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }

    // Update progress indicator
    progressSteps.forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nextStep(stepNumber) {
    // Validate current step before proceeding
    if (validateStep(currentStep)) {
        currentStep = stepNumber;
        showStep(currentStep);
    }
}

function prevStep(stepNumber) {
    currentStep = stepNumber;
    showStep(currentStep);
}

function validateStep(step) {
    const currentStepElement = document.querySelector(`.booking-step[data-step="${step}"]`);

    switch (step) {
        case 1:
            // Check if service is selected
            const serviceSelected = currentStepElement.querySelector('input[name="service"]:checked');
            if (!serviceSelected) {
                alert('Please select a service');
                return false;
            }
            break;
        case 2:
            // Stylist selection is optional (no preference is default)
            break;
        case 3:
            // Check if date and time are selected
            const date = document.getElementById('booking-date').value;
            const time = document.getElementById('booking-time').value;

            if (!date || !time) {
                alert('Please select both date and time');
                return false;
            }

            // Check if date is not in the past
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                alert('Please select a future date');
                return false;
            }
            break;
        case 4:
            // Validate contact details
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const privacy = document.querySelector('input[name="privacy"]:checked');

            if (!firstName || !lastName || !email || !phone) {
                alert('Please fill in all required fields');
                return false;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return false;
            }

            // Validate UK phone number format (basic validation)
            const phoneRegex = /^[\d\s()-]+$/;
            if (!phoneRegex.test(phone) || phone.length < 10) {
                alert('Please enter a valid UK phone number');
                return false;
            }

            if (!privacy) {
                alert('Please agree to the privacy policy');
                return false;
            }

            // Update summary
            updateSummary();
            break;
    }

    return true;
}

function updateSummary() {
    // Get selected service
    const service = document.querySelector('input[name="service"]:checked');
    const serviceName = service ? service.value : '';

    // Get selected stylist
    const stylist = document.querySelector('input[name="stylist"]:checked');
    const stylistName = stylist ? stylist.value : '';

    // Get date and time
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;

    // Get customer details
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Format date
    const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : '';

    // Format time
    const formattedTime = time ? formatTime(time) : '';

    // Update summary fields
    document.getElementById('summary-service').textContent = serviceName;
    document.getElementById('summary-stylist').textContent = stylistName;
    document.getElementById('summary-date').textContent = formattedDate;
    document.getElementById('summary-time').textContent = formattedTime;
    document.getElementById('summary-name').textContent = `${firstName} ${lastName}`;
    document.getElementById('summary-email').textContent = email;
    document.getElementById('summary-phone').textContent = phone;
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minutes}${ampm}`;
}

// Set minimum date to today
const dateInput = document.getElementById('booking-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===================================
// FORM SUBMISSION
// ===================================

const bookingForm = document.getElementById('booking-form');
const contactForm = document.getElementById('contact-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate final step
        if (!validateStep(4)) {
            return;
        }

        // Get form data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());

        // In a real application, you would send this data to a server
        // For now, we'll just show the confirmation
        console.log('Booking data:', data);

        // Update confirmation details
        updateConfirmation();

        // Show confirmation
        showConfirmation();

        // Here you would typically send the email using a service like EmailJS
        // sendBookingEmail(data);
    });
}

function updateConfirmation() {
    const service = document.querySelector('input[name="service"]:checked').value;
    const stylist = document.querySelector('input[name="stylist"]:checked').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const email = document.getElementById('email').value;

    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formattedTime = formatTime(time);

    document.getElementById('confirm-service').textContent = service;
    document.getElementById('confirm-stylist').textContent = stylist;
    document.getElementById('confirm-date').textContent = formattedDate;
    document.getElementById('confirm-time').textContent = formattedTime;
    document.getElementById('confirm-email').textContent = email;
}

function showConfirmation() {
    // Hide all booking steps
    bookingSteps.forEach(step => {
        step.classList.remove('active');
    });

    // Show confirmation
    const confirmation = document.getElementById('booking-confirmation');
    if (confirmation) {
        confirmation.style.display = 'block';
    }

    // Scroll to top of booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function resetBookingForm() {
    bookingForm.reset();
    currentStep = 1;
    showStep(1);
    document.getElementById('booking-confirmation').style.display = 'none';
}

// Contact Form
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        console.log('Contact form data:', data);

        // Show success message
        alert('Thank you for your enquiry! We\'ll get back to you within 24 hours.');

        // Reset form
        contactForm.reset();

        // In a real application, send email here
        // sendContactEmail(data);
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
const fadeElements = document.querySelectorAll('.service-card, .feature-card, .value-item, .gallery__item');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// EMAIL INTEGRATION (Template)
// ===================================

// This is a template for email integration using EmailJS or similar service
// You would need to set up an account and configure your service

/*
function sendBookingEmail(data) {
    // Example using EmailJS
    emailjs.send("service_id", "template_id", {
        service: data.service,
        stylist: data.stylist,
        date: data.date,
        time: data.time,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        firstVisit: data.firstVisit,
        notes: data.notes
    }).then(
        function(response) {
            console.log("Booking email sent!", response.status, response.text);
        },
        function(error) {
            console.log("Failed to send booking email", error);
            alert("There was an error submitting your booking. Please call us at 01543 500566");
        }
    );
}

function sendContactEmail(data) {
    // Example using EmailJS
    emailjs.send("service_id", "contact_template_id", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
    }).then(
        function(response) {
            console.log("Contact email sent!", response.status, response.text);
        },
        function(error) {
            console.log("Failed to send contact email", error);
        }
    );
}
*/

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't smooth scroll for empty anchors or #
        if (href === '#' || href === '') {
            return;
        }

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading for images (if not using native lazy loading)
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('Teddies Hair Design website loaded successfully!');

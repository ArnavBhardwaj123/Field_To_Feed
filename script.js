// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your backend
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add animation to mission cards
const cards = document.querySelectorAll('.card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle (for responsive design)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '☰';
    
    // Add click event to toggle menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
    
    // Add button to navbar
    navbar.insertBefore(mobileMenuBtn, navLinks);
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    } else {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.remove();
        }
        document.querySelector('.nav-links').classList.remove('show');
    }
});

// Farmer page modals and scroll logic
if (window.location.pathname.includes('farmer.html')) {
    // Modal logic
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const body = document.body;

    loginBtn.onclick = () => { loginModal.style.display = 'block'; body.classList.add('modal-open'); };
    registerBtn.onclick = () => { registerModal.style.display = 'block'; body.classList.add('modal-open'); };
    closeLogin.onclick = () => { loginModal.style.display = 'none'; body.classList.remove('modal-open'); };
    closeRegister.onclick = () => { registerModal.style.display = 'none'; body.classList.remove('modal-open'); };
    window.onclick = (event) => {
        if (event.target === loginModal) { loginModal.style.display = 'none'; body.classList.remove('modal-open'); }
        if (event.target === registerModal) { registerModal.style.display = 'none'; body.classList.remove('modal-open'); }
    };

    // Simulate login/register
    function showModalMessage(modal, message, success = true) {
        const msg = document.createElement('div');
        msg.className = success ? 'modal-success' : 'modal-error';
        msg.innerText = message;
        modal.querySelector('form').style.display = 'none';
        modal.querySelector('h2').after(msg);
        setTimeout(() => {
            modal.style.display = 'none';
            body.classList.remove('modal-open');
            msg.remove();
            modal.querySelector('form').reset();
            modal.querySelector('form').style.display = '';
        }, 2000);
    }
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            loginForm.querySelector('button').disabled = true;
            setTimeout(() => {
                showModalMessage(loginModal, 'Welcome back, Farmer!');
                loginForm.querySelector('button').disabled = false;
            }, 1200);
        };
    }
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.onsubmit = function(e) {
            e.preventDefault();
            registerForm.querySelector('button').disabled = true;
            setTimeout(() => {
                showModalMessage(registerModal, 'Registration successful! Welcome to FEID.');
                registerForm.querySelector('button').disabled = false;
            }, 1500);
        };
    }

    // Registration form (main page)
    const farmerForm = document.getElementById('farmerForm');
    if (farmerForm) {
        farmerForm.onsubmit = function(e) {
            e.preventDefault();
            const btn = farmerForm.querySelector('button');
            btn.disabled = true;
            const msg = document.createElement('div');
            msg.className = 'form-success';
            msg.innerText = 'Thank you! Your application has been received.';
            farmerForm.parentElement.appendChild(msg);
            setTimeout(() => {
                msg.remove();
                farmerForm.reset();
                btn.disabled = false;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        };
    }

    // Scroll and highlight logic
    function scrollAndHighlight(targetId) {
        const section = document.getElementById(targetId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            section.classList.add('highlighted');
            setTimeout(() => section.classList.remove('highlighted'), 2000);
        }
    }
    const startSellingBtn = document.getElementById('startSellingBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (startSellingBtn) {
        startSellingBtn.onclick = () => scrollAndHighlight('contact');
    }
    if (learnMoreBtn) {
        learnMoreBtn.onclick = () => scrollAndHighlight('benefits');
    }

    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    let testimonialIndex = 0;
    function showTestimonial(idx) {
        testimonials.forEach((el, i) => {
            el.style.display = i === idx ? 'block' : 'none';
        });
    }
    if (testimonials.length) {
        showTestimonial(testimonialIndex);
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        }, 4000);
    }

    // WhatsApp/help floating button
    const waBtn = document.getElementById('waHelpBtn');
    if (waBtn) {
        waBtn.onclick = function() {
            window.open('https://wa.me/1234567890?text=Hi%20FEID%20Support!%20I%20need%20help%20with%20selling%20my%20residues.', '_blank');
        };
    }
} 
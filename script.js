console.log('FitZone script loaded');

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Initialize language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Found language buttons:', langButtons.length);
    
    // Set English as active by default
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === 'en') {
            btn.classList.add('active');
        }
    });
    
    // Add click handlers to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Switch language
            currentLang = lang;
            applyLanguage(lang);
        });
    });
    
    // Apply default language
    applyLanguage('en');
    
    // Initialize other features
    initMobileMenu();
    initMembershipForm();
});

function applyLanguage(lang) {
    console.log('Applying language:', lang);
    
    // Find all elements with language data
    const allElements = document.querySelectorAll('[data-en][data-gr]');
    console.log('Found translatable elements:', allElements.length);
    
    allElements.forEach(element => {
        const text = element.getAttribute('data-' + lang);
        
        if (element.tagName === 'INPUT' && element.type === 'text') {
            element.placeholder = text;
        } else if (element.tagName === 'INPUT' && element.type === 'tel') {
            // Don't translate phone placeholders
        } else if (element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'SELECT') {
            // For select options
            if (element.options) {
                Array.from(element.options).forEach(option => {
                    const optionText = option.getAttribute('data-' + lang);
                    if (optionText) {
                        option.textContent = optionText;
                    }
                });
            }
        } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            // For buttons and links, update text content
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });
    
    console.log('Language applied successfully');
}

// Mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Membership form
function initMembershipForm() {
    const form = document.getElementById('membershipForm');
    
    if (form) {
        console.log('Membership form found, adding handler');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const plan = document.getElementById('plan');
            const planValue = plan ? plan.options[plan.selectedIndex].text : '';
            
            let message;
            if (currentLang === 'en') {
                message = `Welcome to FitZone, ${name}!\n\nYour free week trial is confirmed!\n\nDetails:\n• Email: ${email}\n• Phone: ${phone}${planValue ? '\n• Plan: ' + planValue : ''}\n\nOur team will contact you within 24 hours to schedule your orientation and fitness assessment.\n\nGet ready to transform!`;
            } else {
                message = `Καλώς ήρθες στο FitZone, ${name}!\n\nΗ δωρεάν δοκιμαστική εβδομάδα επιβεβαιώθηκε!\n\nΛεπτομέρειες:\n• Email: ${email}\n• Τηλέφωνο: ${phone}${planValue ? '\n• Πακέτο: ' + planValue : ''}\n\nΗ ομάδα μας θα επικοινωνήσει μαζί σου εντός 24 ωρών για να προγραμματίσει τον προσανατολισμό και την αξιολόγηση φυσικής κατάστασης.\n\nΕτοιμάσου για μετασχηματισμό!`;
            }
            
            alert(message);
            form.reset();
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 13, 13, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(220, 20, 60, 0.5)';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Pricing card click handlers
const pricingButtons = document.querySelectorAll('.pricing-card .btn');
pricingButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;
        let message;
        if (currentLang === 'en') {
            message = `You selected: ${planName}\n\nScroll down to fill out the form or visit our gym to sign up in person!`;
        } else {
            message = `Επέλεξες: ${planName}\n\nΚατέβα για να συμπληρώσεις τη φόρμα ή επισκέψου το γυμναστήριό μας για εγγραφή!`;
        }
        alert(message);
        
        // Scroll to form if it exists
        const form = document.getElementById('membershipForm');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
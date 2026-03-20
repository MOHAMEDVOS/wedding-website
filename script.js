// ===================================
// Wedding Invitation - Interactive Features
// Mohamed & Aya | محمد و آية
// ===================================

// ===================================
// Envelope Opening Animation
// ===================================
class EnvelopeAnimation {
    constructor() {
        this.screen = document.getElementById('envelope-screen');
        this.envelope = document.getElementById('envelope');
        this.mainContent = document.getElementById('main-content');
        this.init();
    }

    init() {
        if (!this.envelope || !this.screen || !this.mainContent) return;

        this.envelope.addEventListener('click', () => {
            this.openEnvelope();
        });
    }

    openEnvelope() {
        // Add opening class to trigger flap animation
        this.envelope.classList.add('opening');

        // Wait for envelope animation, then fade out screen
        setTimeout(() => {
            this.screen.classList.add('fade-out');
        }, 1000);

        // Show main content after screen fades
        setTimeout(() => {
            this.mainContent.classList.remove('hidden');
            this.screen.style.display = 'none';
        }, 1800);
    }
}

// ===================================
// Countdown Timer
// ===================================
class CountdownTimer {
    constructor() {
        this.weddingDate = new Date('June 28, 2026 18:00:00').getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.init();
    }

    init() {
        if (!this.elements.days) return;
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date().getTime();
        const distance = this.weddingDate - now;

        if (distance < 0) {
            this.displayZero();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.elements.days.textContent = String(days).padStart(3, '0');
        this.elements.hours.textContent = String(hours).padStart(2, '0');
        this.elements.minutes.textContent = String(minutes).padStart(2, '0');
        this.elements.seconds.textContent = String(seconds).padStart(2, '0');
    }

    displayZero() {
        this.elements.days.textContent = '000';
        this.elements.hours.textContent = '00';
        this.elements.minutes.textContent = '00';
        this.elements.seconds.textContent = '00';
    }
}

// ===================================
// Scroll Animations
// ===================================
class ScrollAnimator {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for fade-in animations
        this.observeElements();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe timeline items and countdown items
        const elementsToAnimate = document.querySelectorAll(
            '.timeline-item, .countdown-item, .venue-content, .rsvp-content'
        );

        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }
}

// ===================================
// RSVP WhatsApp Integration
// ===================================
class RSVPHandler {
    constructor() {
        this.button = document.getElementById('rsvp-button');
        this.phoneNumber = '201063772580'; // +20 106 377 2580
        this.init();
    }

    init() {
        if (!this.button) return;

        this.button.addEventListener('click', () => {
            this.openWhatsApp();
        });
    }

    openWhatsApp() {
        const message = encodeURIComponent(
            `Hello Mohamed & Aya,\n\nI confirm my attendance at your wedding!\n\nName: \nNumber of guests: \n\nLooking forward to celebrating with you.`
        );
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
}

// ===================================
// Mobile Performance Optimization
// ===================================
class MobileOptimizer {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        if (this.isMobile) {
            // Disable parallax and heavy animations on mobile
            document.body.classList.add('mobile-device');
        }

        // Update on resize
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth < 768;
            if (this.isMobile) {
                document.body.classList.add('mobile-device');
            } else {
                document.body.classList.remove('mobile-device');
            }
        });
    }
}

// ===================================
// Initialize All Features
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new EnvelopeAnimation();
    new CountdownTimer();
    new ScrollAnimator();
    new RSVPHandler();
    new MobileOptimizer();

    // Add subtle entrance animation to envelope screen
    const envelopeScreen = document.getElementById('envelope-screen');
    if (envelopeScreen) {
        envelopeScreen.style.opacity = '0';
        setTimeout(() => {
            envelopeScreen.style.transition = 'opacity 1s ease';
            envelopeScreen.style.opacity = '1';
        }, 100);
    }
});

// ===================================
// Prevent scroll on envelope screen
// ===================================
window.addEventListener('load', () => {
    const envelopeScreen = document.getElementById('envelope-screen');
    if (envelopeScreen && !envelopeScreen.classList.contains('fade-out')) {
        document.body.style.overflow = 'hidden';
    }

    // Re-enable scroll when envelope opens
    const observer = new MutationObserver(() => {
        if (envelopeScreen.classList.contains('fade-out')) {
            document.body.style.overflow = 'auto';
            observer.disconnect();
        }
    });

    if (envelopeScreen) {
        observer.observe(envelopeScreen, { attributes: true, attributeFilter: ['class'] });
    }
});


// Global state management
const AppState = {
    theme: 'light',
    currentPage: 'home',
    scrollPositions: {},
    
    // Initialize the application
    init() {
        this.loadTheme();
        this.setupEventListeners();
        this.setupPageSpecificFeatures();
        this.restoreScrollPosition();
    },
    
    // Theme management
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    },
    
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    },
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },
    
    // Scroll position management
    saveScrollPosition() {
        const page = window.location.pathname;
        this.scrollPositions[page] = window.scrollY;
        localStorage.setItem('scrollPositions', JSON.stringify(this.scrollPositions));
    },
    
    restoreScrollPosition() {
        const savedPositions = localStorage.getItem('scrollPositions');
        if (savedPositions) {
            this.scrollPositions = JSON.parse(savedPositions);
            const page = window.location.pathname;
            const position = this.scrollPositions[page];
            if (position !== undefined) {
                setTimeout(() => {
                    window.scrollTo({
                        top: position,
                        behavior: 'instant'
                    });
                }, 100);
            }
        }
    },
    
    // Event listeners setup
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // Save scroll position on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                this.saveScrollPosition();
            }, 150);
        }, { passive: true });
        
        // Save scroll position before page unload
        window.addEventListener('beforeunload', () => {
            this.saveScrollPosition();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.getElementById('navMenu');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            
            if (navMenu && mobileMenuToggle && 
                !navMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    },
    
    // Page-specific feature setup
    setupPageSpecificFeatures() {
        // Service modals (for services page)
        this.setupServiceModals();
        
        // Form handling
        this.setupForms();
        
        // Gallery features
        this.setupGallery();
        
        // Add fade-in animation to sections
        this.addScrollAnimations();
    },
    
    // Service modals functionality
    setupServiceModals() {
        const serviceCards = document.querySelectorAll('.service-card[data-service]');
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceType = card.dataset.service;
                this.openServiceModal(serviceType);
            });
        });
        
        // Modal close functionality
        const modalCloses = document.querySelectorAll('.modal-close, .modal');
        modalCloses.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target === element) {
                    this.closeModals();
                }
            });
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    },
    
    openServiceModal(serviceType) {
        const services = {
            termite: {
                title: 'Termite Control',
                image: '/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png',
                problems: [
                    'Structural damage to wooden furniture and buildings',
                    'Weakened foundations and support beams',
                    'Hidden damage that\'s difficult to detect early',
                    'Costly repairs if left untreated'
                ],
                solutions: [
                    'Pre-construction termite treatment for new buildings',
                    'Post-construction soil and wood treatment',
                    'Regular inspection and monitoring systems',
                    'Eco-friendly liquid barrier treatments'
                ],
                details: [
                    '5-year warranty on all termite treatments',
                    'Free annual inspections included',
                    'Emergency response within 24 hours',
                    'Safe for families and pets'
                ]
            },
            cockroach: {
                title: 'Cockroach Control',
                image: '/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png',
                problems: [
                    'Health risks from bacteria and allergens',
                    'Food contamination in kitchens',
                    'Rapid reproduction and infestation',
                    'Unpleasant odors and unsanitary conditions'
                ],
                solutions: [
                    'Targeted gel baiting systems',
                    'Crack and crevice treatments',
                    'Residual spray applications',
                    'Integrated pest management approach'
                ],
                details: [
                    'Same-day service available',
                    'Follow-up treatments included',
                    'Kitchen-safe treatment methods',
                    '90% reduction guaranteed within 7 days'
                ]
            },
            ant: {
                title: 'Ant Control',
                image: '/lovable-uploads/162eefb3-cdc3-43e1-858e-ba5f5f2166a2.png',
                problems: [
                    'Food contamination and storage issues',
                    'Structural damage from carpenter ants',
                    'Painful bites from fire ants',
                    'Persistent trails and colonies'
                ],
                solutions: [
                    'Colony elimination at the source',
                    'Perimeter barrier treatments',
                    'Specialized baiting systems',
                    'Nest location and destruction'
                ],
                details: [
                    'Species-specific treatment plans',
                    'Outdoor and indoor protection',
                    'Monthly monitoring options',
                    'Guaranteed results or retreatment'
                ]
            }
        };
        
        const service = services[serviceType];
        if (!service) return;
        
        // Create modal if it doesn't exist
        let modal = document.getElementById('serviceModal');
        if (!modal) {
            modal = this.createServiceModal();
            document.body.appendChild(modal);
        }
        
        // Populate modal content
        this.populateServiceModal(modal, service);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    createServiceModal() {
        const modal = document.createElement('div');
        modal.id = 'serviceModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2 class="modal-title" id="modalTitle"></h2>
                <div class="modal-image-container" id="modalImageContainer"></div>
                <div class="modal-section problems">
                    <h3>Problems We Address:</h3>
                    <ul class="modal-list" id="modalProblems"></ul>
                </div>
                <div class="modal-section solutions">
                    <h3>How We Remove Them:</h3>
                    <ul class="modal-list" id="modalSolutions"></ul>
                </div>
                <div class="modal-section details">
                    <h3>Additional Details:</h3>
                    <ul class="modal-list" id="modalDetails"></ul>
                </div>
                <div class="modal-buttons">
                    <a href="tel:+919492309305" class="btn btn-primary">Call Now</a>
                    <button class="btn btn-outline" onclick="openWhatsApp()">WhatsApp Us</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModals());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModals();
            }
        });
        
        return modal;
    },
    
    populateServiceModal(modal, service) {
        modal.querySelector('#modalTitle').textContent = service.title;
        
        // Handle image
        const imageContainer = modal.querySelector('#modalImageContainer');
        if (service.image) {
            imageContainer.innerHTML = `<img src="${service.image}" alt="${service.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius); margin-bottom: 1.5rem;">`;
        } else {
            imageContainer.innerHTML = '';
        }
        
        // Populate problems
        const problemsList = modal.querySelector('#modalProblems');
        problemsList.innerHTML = service.problems.map(problem => 
            `<li><span style="color: #ef4444; margin-right: 0.5rem;">•</span>${problem}</li>`
        ).join('');
        
        // Populate solutions
        const solutionsList = modal.querySelector('#modalSolutions');
        solutionsList.innerHTML = service.solutions.map(solution => 
            `<li><svg style="width: 1rem; height: 1rem; color: #22c55e; margin-right: 0.5rem; margin-top: 0.125rem; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>${solution}</li>`
        ).join('');
        
        // Populate details
        const detailsList = modal.querySelector('#modalDetails');
        detailsList.innerHTML = service.details.map(detail => 
            `<li><svg style="width: 1rem; height: 1rem; color: var(--primary); margin-right: 0.5rem; margin-top: 0.125rem; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>${detail}</li>`
        ).join('');
    },
    
    closeModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    },
    
    // Form handling
    setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    },
    
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            this.showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showNotification('Thank you! We will contact you soon.', 'success');
        form.reset();
    },
    
    // Gallery functionality
    setupGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.classList.add('fade-in');
        });
    },
    
    // Scroll animations
    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .gallery-item');
        animatedElements.forEach(el => observer.observe(el));
    },
    
    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : '#22c55e'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// Global utility functions
function openWhatsApp() {
    const url = "https://wa.me/919492309305?text=Hello%2C%20I%20visited%20your%20website%20Quality%20Pest%20Control%20Services%20and%20would%20like%20to%20know%20more%20about%20your%20pest%20control%20solutions.";
    window.open(url, '_blank');
}

function openLocation() {
    window.open('https://maps.app.goo.gl/8MpyNDkYeHgAG3mB9', '_blank');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AppState.init();
});

// Additional CSS for animations
const additionalStyles = `
@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

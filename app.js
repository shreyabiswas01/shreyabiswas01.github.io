// Personal Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    // Other elements
    const downloadCvBtn = document.getElementById('download-cv');
    const contactForm = document.querySelector('.form');
    
    // Sticky navbar on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        // Animate elements on scroll
        animateOnScroll();
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when link is clicked
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // // Smooth scrolling for navigation links
    // navLinkElements.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         if (targetId.startsWith('#')) {
    //             const targetSection = document.querySelector(targetId);
    //             if (targetSection) {
    //                 const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
    //                 window.scrollTo({
    //                     top: offsetTop,
    //                     behavior: 'smooth'
    //                 });
    //             }
    //         }
    //     });
    // });

    // Smooth scrolling for navigation links (with snap support)
    // navLinkElements.forEach(link => {
    //     link.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     const targetId = this.getAttribute('href');
    //     if (targetId.startsWith('#')) {
    //         const targetSection = document.querySelector(targetId);
    //         if (targetSection) {
    //         targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //         }
    //     }
    //     });
    // });


    navLinkElements.forEach(link => {
        link.addEventListener('click', function (e) {
          const href = this.getAttribute('href') || '';
          const isHash = href.startsWith('#');
      
          if (isHash) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // close mobile menu after navigating
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
          } else {
            // external link → open in new tab
            e.preventDefault(); // stop default same-tab navigation
            window.open(href, '_blank', 'noopener,noreferrer');
            // close mobile menu
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
          }
        });
      });
      
    // Smooth scrolling for hash links; let external links work normally (e.g., CV)
        
  
  
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Download CV functionality
    downloadCvBtn.addEventListener('click', function() {
        // Create a temporary CV content (since we don't have an actual file)
        const cvContent = `
SHREYA BISWAS
PhD Student in Computer Science
SUNY Stony Brook

EDUCATION:
• PhD in Computer Science, SUNY Stony Brook (2023-2028)
• B.E. in Electronics and Telecommunication, Jadavpur University (2019-2023) - GPA: 9.29/10

RESEARCH INTERESTS:
• Computer Vision
• Deep Learning  
• Medical Imaging

PUBLICATIONS:
• An Ensemble of CNN Models for Parkinson's Disease Detection Using DaTscan Images (Diagnostics, 2022)
• SCENIC: An Area and Energy-Efficient CNN-based Hardware Accelerator (VLSID 2022)
• Breast cancer detection from thermal images using Dragonfly algorithm (Computers in Biology and Medicine, 2021)
• Prediction of COVID-19 from Chest CT Images Using Deep Learning (Applied Sciences, 2021)
• Multi-Level Image Segmentation Using Kapur Entropy Based Dragonfly Algorithm (ISDA 2022)

EXPERIENCE:
• Summer Research Intern, Machine Intelligence Research Labs (April 2022 – November 2022)
• Undergraduate Research Intern, Indian Statistical Institute (January 2022 – September 2022)
• Winter Research Intern, IIT Kharagpur (October 2020 – January 2021)

TECHNICAL SKILLS:
• Programming: Python, Java, C, Matlab, HTML/CSS, JavaScript, NodeJS
• Libraries: TensorFlow, PyTorch, Keras, OpenCV
• Tools: VS Code, Google Cloud Platform, GitHub

CONTACT:
• University: SUNY Stony Brook
• Location: Stony Brook, NY, USA
• Phone: +91 9330660210
        `;
        
        // Create and download the file
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Shreya_Biswas_CV.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Show feedback
        const originalText = downloadCvBtn.textContent;
        downloadCvBtn.textContent = 'Downloaded!';
        downloadCvBtn.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            downloadCvBtn.textContent = originalText;
            downloadCvBtn.style.background = '';
        }, 2000);
    });
    
    // Contact form handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const subject = formData.get('subject') || document.getElementById('subject').value;
        const message = formData.get('message') || document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (since this is a static site)
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show notification function
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles for notification
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                min-width: 300px;
                padding: var(--space-16) var(--space-20);
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                z-index: 1001;
                transform: translateX(400px);
                transition: transform var(--duration-normal) var(--ease-standard);
            }
            
            .notification--success {
                background: rgba(var(--color-success-rgb), 0.1);
                border: 1px solid rgba(var(--color-success-rgb), 0.3);
                color: var(--color-success);
            }
            
            .notification--error {
                background: rgba(var(--color-error-rgb), 0.1);
                border: 1px solid rgba(var(--color-error-rgb), 0.3);
                color: var(--color-error);
            }
            
            .notification--info {
                background: rgba(var(--color-info-rgb), 0.1);
                border: 1px solid rgba(var(--color-info-rgb), 0.3);
                color: var(--color-info);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--space-12);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
                transition: opacity var(--duration-fast) var(--ease-standard);
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        
        // Add style to head if not already present
        if (!document.querySelector('#notification-styles')) {
            style.id = 'notification-styles';
            document.head.appendChild(style);
        }
        
        // Add notification to body
        document.body.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.research-card, .publication-item, .project-card, .timeline-item, .leadership-item, .skill-category');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.research-card, .project-card, .publication-item, #projects .timeline-content, #experience-research .timeline-content, #experience-leadership .timeline-content');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading effect
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroElements = document.querySelectorAll('.hero-text h1, .hero-text h2, .hero-subtitle, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    });
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            // Close any open notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
    });
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    function updateOnScroll() {
        updateActiveNavLink();
        animateOnScroll();
        ticking = false;
    }
    
    // Replace the scroll event listener with throttled version
    window.removeEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', requestTick);
    
    // Initialize page
    updateActiveNavLink();
    
    console.log('Personal website loaded successfully!');
});

// Show the footer only while the Skills section is on screen
(function () {
    const skills = document.querySelector('#skills');
    if (!skills || !('IntersectionObserver' in window)) return;
  
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        document.body.classList.toggle('show-footer', entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: [0.5] } // show once at least half of #skills is visible
    );
  
    io.observe(skills);
  })();
  
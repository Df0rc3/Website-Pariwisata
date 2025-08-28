// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.loader-wrapper').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loader-wrapper').style.display = 'none';
        }, 500);
    }, 1000);
});

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideBtns = document.querySelectorAll('.slide-btn');
const totalSlides = slides.length;

function changeSlide(index) {
    slides[currentSlide].classList.remove('active');
    slideBtns[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    slideBtns[currentSlide].classList.add('active');
    
    // Update background
    const slideData = slides[currentSlide].getAttribute('data-bg');
    document.querySelector('.hero-slider').style.background = slideData;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    changeSlide(next);
}

// Auto-advance slides
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
document.querySelector('.hero-slider').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.hero-slider').addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Initialize first slide
changeSlide(0);

// ===== SMOOTH SCROLLING =====
function scrollToDestinations() {
    document.getElementById('destinations').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMATED COUNTERS =====
let counterStarted = false;

function animateCounters() {
    if (counterStarted) return;
    counterStarted = true;
    
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += step;
                if (target >= 1000000) {
                    counter.innerText = (current / 1000000).toFixed(1) + 'M+';
                } else if (target >= 1000) {
                    counter.innerText = Math.floor(current / 1000) + 'K+';
                } else {
                    counter.innerText = Math.floor(current) + '+';
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target >= 1000000) {
                    counter.innerText = (target / 1000000).toFixed(1) + 'M+';
                } else if (target >= 1000) {
                    counter.innerText = Math.floor(target / 1000) + 'K+';
                } else {
                    counter.innerText = target + '+';
                }
            }
        };
        
        updateCounter();
    });
}

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
                observer.unobserve(entry.target);
            } else {
                entry.target.classList.add('fade-in');
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.destination-card').forEach(card => {
    observer.observe(card);
});

observer.observe(document.querySelector('.stats-section'));

// ===== FILTER FUNCTIONALITY =====
const filterBtns = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter cards
        destinationCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== MODAL FUNCTIONALITY =====
function openModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('contactModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ===== VIDEO MODAL =====
function playVideo() {
    // This would open a video modal in a real implementation
    showNotification('Video akan segera hadir! 🎬', 'info');
}

// ===== FORM HANDLING =====
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerText;
    
    submitBtn.innerText = 'Mengirim...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
        closeModal();
        this.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        
        // Clear saved form data
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        formInputs.forEach(input => {
            localStorage.removeItem(`form_${input.name || input.type}`);
        });
    }, 2000);
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.cta-bg');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// ===== CARD INTERACTIONS =====
document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const cardTitle = this.parentElement.querySelector('.card-title').innerText;
        showNotification(`Anda akan menjelajahi ${cardTitle}! Fitur ini akan segera hadir. 🌟`, 'info');
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    
    if (e.key === 'ArrowLeft') {
        const prevSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        changeSlide(prevSlide);
    }
    
    if (e.key === 'ArrowRight') {
        const nextSlide = (currentSlide + 1) % totalSlides;
        changeSlide(nextSlide);
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images when they come into viewport
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== EASTER EGGS =====
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: Special animation
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
            showNotification('🎉 Selamat! Anda menemukan easter egg Banyuwangi! Dapatkan diskon 30% untuk paket wisata berikutnya!', 'success');
        }, 2000);
        konamiCode = [];
    }
});

// ===== WEATHER WIDGET (Simulated) =====
function updateWeather() {
    const weatherElement = document.querySelector('.weather-widget');
    if (weatherElement) {
        // Simulated weather data for Banyuwangi
        const weather = {
            temp: Math.floor(Math.random() * 8) + 25, // 25-33°C
            condition: ['Cerah', 'Berawan', 'Hujan Ringan'][Math.floor(Math.random() * 3)]
        };
        weatherElement.innerHTML = `
            <div class="weather-info">
                <span class="temp">${weather.temp}°C</span>
                <span class="condition">${weather.condition}</span>
            </div>
        `;
    }
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }
});

// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';

let isDarkMode = false;

darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        darkModeToggle.innerHTML = '☀️';
        darkModeToggle.style.background = '#f7fafc';
        darkModeToggle.style.color = '#f6ad55';
        showNotification('Mode gelap diaktifkan! 🌙', 'info');
    } else {
        document.body.style.filter = '';
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.style.background = '#2d3748';
        darkModeToggle.style.color = '#ffd700';
        showNotification('Mode terang diaktifkan! ☀️', 'info');
    }
});

document.body.appendChild(darkModeToggle);

// ===== VOICE COMMANDS (Experimental) =====
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'id-ID';

    const voiceBtn = document.createElement('button');
    voiceBtn.innerHTML = '🎤';
    voiceBtn.className = 'voice-btn';

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.style.background = 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
        voiceBtn.innerHTML = '🔴';
        showNotification('Mendengarkan... Katakan "home", "destinasi", atau "kontak"', 'info');
    });

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        
        if (command.includes('home') || command.includes('beranda')) {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
            showNotification('Navigasi ke halaman utama', 'success');
        } else if (command.includes('destinasi') || command.includes('tempat wisata')) {
            document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
            showNotification('Navigasi ke destinasi wisata', 'success');
        } else if (command.includes('kontak') || command.includes('hubungi')) {
            openModal();
            showNotification('Membuka formulir kontak', 'success');
        } else if (command.includes('video')) {
            playVideo();
        } else {
            showNotification('Perintah tidak dikenali. Coba: "home", "destinasi", atau "kontak"', 'error');
        }
    };

    recognition.onend = () => {
        voiceBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        voiceBtn.innerHTML = '🎤';
    };

    recognition.onerror = () => {
        showNotification('Terjadi kesalahan pada pengenalan suara', 'error');
        voiceBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        voiceBtn.innerHTML = '🎤';
    };

    document.body.appendChild(voiceBtn);
} else {
    console.log('Speech Recognition tidak didukung di browser ini');
}

// ===== SHARE FUNCTIONALITY =====
if (navigator.share) {
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = '📤';
    shareBtn.className = 'share-btn';

    shareBtn.addEventListener('click', async () => {
        try {
            await navigator.share({
                title: 'Pariwisata Banyuwangi',
                text: 'Jelajahi keindahan wisata Banyuwangi yang menakjubkan!',
                url: window.location.href
            });
            showNotification('Berhasil membagikan halaman!', 'success');
        } catch (error) {
            console.log('Error sharing:', error);
            showNotification('Gagal membagikan halaman', 'error');
        }
    });

    document.body.appendChild(shareBtn);
}

// ===== PRELOADER FOR IMAGES =====
function preloadImages() {
    const imageUrls = [
        // Add your actual image URLs here when available
        // 'images/kawah-ijen.jpg',
        // 'images/pulau-bedil.jpg',
        // 'images/pulau-merah.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const bgColor = {
        success: '#48bb78',
        error: '#f56565',
        info: '#4299e1',
        warning: '#ed8936'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${bgColor[type] || bgColor.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== AUTO-SAVE FORM DATA =====
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    // Restore saved data on page load
    const savedValue = localStorage.getItem(`form_${input.name || input.type}`);
    if (savedValue) {
        input.value = savedValue;
    }
    
    // Save data on input
    input.addEventListener('input', () => {
        localStorage.setItem(`form_${input.name || input.type}`, input.value);
    });
});

// ===== ANALYTICS SIMULATION =====
function trackEvent(eventName, properties = {}) {
    console.log('📊 Event tracked:', eventName, properties);
    // In a real implementation, this would send data to your analytics service
}

// Track page views
trackEvent('page_view', {
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_class: e.target.className,
            timestamp: new Date().toISOString()
        });
    }
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => {
    showNotification('Koneksi internet kembali normal! 🌐', 'success');
});

window.addEventListener('offline', () => {
    showNotification('Koneksi internet terputus. Mode offline aktif.', 'warning');
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`📈 Page loaded in ${loadTime}ms`);
        
        trackEvent('page_load_time', {
            load_time: loadTime,
            timestamp: new Date().toISOString()
        });
        
        if (loadTime > 3000) {
            setTimeout(() => {
                showNotification('Koneksi internet lambat terdeteksi. Beberapa fitur mungkin tidak optimal.', 'warning');
            }, 2000);
        }
    });
}

// ===== TOUCH GESTURES FOR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.hero-slider').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.hero-slider').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        const prevSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        changeSlide(prevSlide);
    }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏝️ Initializing Banyuwangi Tourism Website...');
    
    // Preload images
    preloadImages();
    
    // Initialize weather (if widget exists)
    updateWeather();
    
    // Show welcome notification after page loads
    setTimeout(() => {
        showNotification('Selamat datang di Pariwisata Banyuwangi! 🌟', 'success');
    }, 2500);
    
    // Update weather every 30 minutes
    setInterval(updateWeather, 30 * 60 * 1000);
    
    // Track user engagement
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Date.now() - startTime;
        trackEvent('session_time', {
            time_spent: Math.round(timeSpent / 1000), // in seconds
            timestamp: new Date().toISOString()
        });
    });
    
    console.log('✨ Website initialized successfully!');
    console.log('🔥 Features loaded:');
    console.log('   - Responsive design with mobile navigation');
    console.log('   - Interactive hero slider with touch support');
    console.log('   - Smooth animations and transitions');
    console.log('   - Modal system for contact forms');
    console.log('   - Filter functionality for destinations');
    console.log('   - Voice commands (if supported)');
    console.log('   - Dark mode toggle');
    console.log('   - Share functionality');
    console.log('   - Offline detection');
    console.log('   - Auto-save forms');
    console.log('   - Performance monitoring');
    console.log('   - Easter egg (try Konami code: ↑↑↓↓←→←→BA)');
    console.log('   - Touch gestures for mobile');
    console.log('   - Scroll to top button');
    console.log('   - Notification system');
    console.log('🌟 Selamat menjelajahi Banyuwangi!');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', e.error);
    showNotification('Terjadi kesalahan pada halaman. Silakan refresh browser Anda.', 'error');
    
    trackEvent('javascript_error', {
        error_message: e.message,
        error_file: e.filename,
        error_line: e.lineno,
        timestamp: new Date().toISOString()
    });
});

// ===== UNHANDLED PROMISE REJECTION =====
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Unhandled Promise Rejection:', e.reason);
    trackEvent('promise_rejection', {
        reason: e.reason.toString(),
        timestamp: new Date().toISOString()
    });
});

// ===== SERVICE WORKER FOR PWA (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('🔧 SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('❌ SW registration failed: ', registrationError);
            });
    });
}

// ===== FINAL CONSOLE MESSAGE =====
console.log(`
🏝️ =====================================
   PARIWISATA BANYUWANGI WEBSITE
   Version: 1.0.0
   Build: ${new Date().toISOString()}
   
   Dibuat dengan ❤️ untuk traveler
   
   Fitur unggulan:
   ✅ Modern responsive design
   ✅ Interactive user experience  
   ✅ Touch & voice controls
   ✅ Offline support
   ✅ Performance optimized
   
   Selamat menjelajahi Banyuwangi! 🌟
=====================================
`);

// Export functions for global access (if needed)
window.BanyuwangiTourism = {
    changeSlide,
    openModal,
    closeModal,
    showNotification,
    scrollToDestinations,
    trackEvent
};
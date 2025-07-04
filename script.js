emailjs.init("Ab5GprGyGoeN6uTxO");

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const currentLocationSpan = document.getElementById('currentLocation');
    const contactForm = document.getElementById('contactForm');

    // Initialize cart - using memory instead of localStorage for Claude.ai compatibility
    let cart = [];
    let currentLocationIndex = 0;
    let activeOverlay = null;

    // Location data
    const locations = [
        'Sanjay Palace',
        'Civil Lines',
        'Kamla Nagar',
        'Madhu Nagar',
        'I Love Agra'
    ];

    // Initialize animations
    initAnimations();
    updateCartDisplay();

    // Event Listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', filterMenu);
    });

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Initialize location rotation
    setInterval(updateLocation, 10000);

    // Scroll animations
    window.addEventListener('scroll', animateOnScroll);

    // Functions
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    }

    function filterMenu(e) {
        const filter = e.target.getAttribute('data-filter');

        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        menuItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const navbar = document.querySelector('.navbar');
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const sectionTop = section.offsetTop - navHeight;

        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }

    function addToCart(itemName, price) {
        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: itemName,
                price: price,
                quantity: 1
            });
        }

        updateCartDisplay();
        showCartNotification(itemName);
        hideConflictingElements();
    }

    function removeFromCart(itemName) {
        cart = cart.filter(item => item.name !== itemName);
        updateCartDisplay();
    }

    function updateCartQuantity(itemName, change) {
        const item = cart.find(item => item.name === itemName);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(itemName);
            }
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        if (!cartCount || !cartTotal || !cartItems) return;

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartCount.textContent = totalItems;
        cartTotal.textContent = totalPrice.toFixed(2);

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.name}', -1)" aria-label="Decrease quantity">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.name}', 1)" aria-label="Increase quantity">+</button>
                    </div>
                </div>
            `).join('');
        }
    }

    function toggleCart() {
        if (!cartSidebar) return;
        
        if (activeOverlay === 'cart') {
            cartSidebar.classList.remove('open');
            document.body.classList.remove('cart-open');
            activeOverlay = null;
            showConflictingElements();
        } else {
            closeAllOverlays();
            cartSidebar.classList.add('open');
            document.body.classList.add('cart-open');
            activeOverlay = 'cart';
            hideConflictingElements();
        }
    }

    function hideConflictingElements() {
        const chatWidgets = document.querySelectorAll('.chat-widget, [class*="chat"], .chef-tray, [id*="chat"]');
        chatWidgets.forEach(widget => {
            if (widget && !widget.closest('.cart-sidebar')) {
                widget.style.display = 'none';
                widget.setAttribute('data-hidden-by-cart', 'true');
            }
        });

        const modals = document.querySelectorAll('.modal, .popup, [class*="modal"], [class*="popup"]');
        modals.forEach(modal => {
            if (modal && !modal.closest('.cart-sidebar')) {
                modal.style.display = 'none';
                modal.setAttribute('data-hidden-by-cart', 'true');
            }
        });
    }

    function showConflictingElements() {
        const hiddenElements = document.querySelectorAll('[data-hidden-by-cart="true"]');
        hiddenElements.forEach(element => {
            element.style.display = '';
            element.removeAttribute('data-hidden-by-cart');
        });
    }

    function closeAllOverlays() {
        if (cartSidebar) {
            cartSidebar.classList.remove('open');
        }
        document.body.classList.remove('cart-open');

        const overlays = document.querySelectorAll('.modal.show, .popup.active, [class*="overlay"].active');
        overlays.forEach(overlay => {
            overlay.classList.remove('show', 'active', 'open');
        });

        showConflictingElements();
        activeOverlay = null;
    }

    function showCartNotification(itemName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1002;
            animation: slideIn 0.3s ease-out;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle" aria-hidden="true"></i>
            ${itemName} added to cart!
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const userName = prompt("Please enter your name:");
        if (!userName) {
            alert("Name is required to proceed.");
            return;
        }

        const userEmail = prompt("Please enter your email:");
        if (!userEmail || !validateEmail(userEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        const orderSummary = cart.map(item =>
            `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const order_id = 'FT-' + Date.now();

        const confirmed = confirm(`Order Summary:\n\n${orderSummary}\n\nTotal: ₹${total.toFixed(2)}\n\nProceed to checkout?`);

        if (!confirmed) {
            return;
        }

        emailjs.send("service_0m899ue", "template_llyxe8g", {
            name: userName,
            email: userEmail,
            order: orderSummary,
            total: total.toFixed(2),
            order_id: order_id
        })
        .then(() => {
            alert(`Thank you for your order, ${userName}! We'll prepare it shortly. You can pick it up at our current location.`);
            cart = [];
            updateCartDisplay();
            toggleCart();
        })
        .catch(error => {
            alert('Oops! Something went wrong while sending your order. Please try again.');
            console.error('EmailJS error:', error);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
function trackLocation() {
    window.location.href = "location.html";

        popup.innerHTML = `
            <div style="margin-bottom: 20px;">
                <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: #27ae60;" aria-hidden="true"></i>
            </div>
            <h3 style="margin-bottom: 15px; color: #333;">Live Tracking</h3>
            <p style="color: #666; margin-bottom: 20px;">
                We're currently at <strong>${locations[currentLocationIndex]}</strong>
            </p>
            <p style="color: #666; margin-bottom: 20px; font-size: 0.9rem;">
                📍 Estimated arrival: 5-10 minutes<br>
                🚚 Van #FT001 - Fresh Tray
            </p>
            <button onclick="this.parentElement.remove()" style="
                background: #27ae60;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
            ">Close</button>
        `;

        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 5000);
    }

    function updateLocation() {
        if (!currentLocationSpan) return;
        
        currentLocationIndex = (currentLocationIndex + 1) % locations.length;
        currentLocationSpan.textContent = locations[currentLocationIndex];

        currentLocationSpan.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            currentLocationSpan.style.animation = '';
        }, 500);
    }

    function handleContactForm(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        emailjs.send("service_0m899ue", "template_wq15yq9", {
            from_name: name,
            reply_to: email,
            message: message
        })
        .then(() => {
            alert("✅ Message sent successfully!");
            e.target.reset();
        })
        .catch(err => {
            console.error("❌ EmailJS Error:", err);
            alert("Failed to send message. Please try again.");
        });
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature, .menu-item, .stat, .contact-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'all 0.6s ease-out';
            }
        });
    }

    function initAnimations() {
        const elements = document.querySelectorAll('.feature, .menu-item, .stat, .contact-item');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
        });
    }

    // Nav link click handlers
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substr(1);
                scrollToSection(targetId);

                if (navMenu && navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (activeOverlay === 'cart' && cartSidebar) {
            if (!cartSidebar.contains(e.target) &&
                !e.target.closest('.cart-toggle') &&
                !e.target.closest('.add-to-cart')) {
                closeAllOverlays();
            }
        }
    });

    // Close overlays with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeOverlay) {
            closeAllOverlays();
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }

        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        }
    });

    // Menu grid animation observer
    const menuGridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        menuGridObserver.observe(item);
    });

    // Stats counter animation
    const statsCountAnimation = () => {
        const stats = document.querySelectorAll('.stat-number');
        const targets = [500, 30, 1];

        stats.forEach((stat, index) => {
            if (index >= targets.length) return;
            
            let current = 0;
            const target = targets[index];
            const increment = target / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (index === 0 ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (index === 0 ? '+' : '');
                }
            }, 50);
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statsCountAnimation();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Chat widget observer
    const chatObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    if (node.matches &&
                        (node.matches('.chat-widget') ||
                        node.matches('[class*="chat"]') ||
                        node.matches('.chef-tray') ||
                        (node.querySelector && node.querySelector('.chat-widget')))
                    ) {
                        if (activeOverlay === 'cart') {
                            node.style.display = 'none';
                            node.setAttribute('data-hidden-by-cart', 'true');
                        }

                        node.addEventListener('click', (e) => {
                            if (activeOverlay === 'cart') {
                                closeAllOverlays();
                            }
                        });
                    }
                }
            });
        });
    });

    chatObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Window focus handler
    window.addEventListener('focus', () => {
        if (activeOverlay === 'cart') {
            hideConflictingElements();
        }
    });

    // Make functions available globally
    window.scrollToSection = scrollToSection;
    window.addToCart = addToCart;
    window.updateCartQuantity = updateCartQuantity;
    window.toggleCart = toggleCart;
    window.checkout = checkout;
    window.trackLocation = trackLocation;
    window.closeAllOverlays = closeAllOverlays;

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        @keyframes overlaySlideIn {
            from { right: -400px; opacity: 0; }
            to { right: 0; opacity: 1; }
        }

        @keyframes overlaySlideOut {
            from { right: 0; opacity: 1; }
            to { right: -400px; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
// === Floating Mic Element ===
const micButton = document.createElement("div");
micButton.id = "voiceMic";
micButton.innerHTML = "🎤";
Object.assign(micButton.style, {
  position: "fixed",
  bottom: "275px",
  right: "20px",
  fontSize: "24px",
  padding: "16px",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
  cursor: "pointer",
  zIndex: 9999,
  boxShadow: "0 8px 32px rgba(118, 75, 162, 0.25)",
  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
  border: "2px solid rgba(255, 255, 255, 0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(20px)",
});

// Voice Commands Configuration
const voiceCommands = {
  navigation: {
    "go to menu": () => navigateToSection("#menu", "menu"),
    "menu": () => navigateToSection("#menu", "menu"),
    "show menu": () => navigateToSection("#menu", "menu"),
    "go to contact": () => navigateToSection("#contact", "contact"),
    "contact": () => navigateToSection("#contact", "contact"),
    "contact us": () => navigateToSection("#contact", "contact"),
    "go to about": () => navigateToSection("#about", "about"),
    "about": () => navigateToSection("#about", "about"),
    "about us": () => navigateToSection("#about", "about"),
    "go home": () => window.scrollTo({ top: 0, behavior: "smooth" }),
    "home": () => window.scrollTo({ top: 0, behavior: "smooth" }),
    "top": () => window.scrollTo({ top: 0, behavior: "smooth" }),
    "go to top": () => window.scrollTo({ top: 0, behavior: "smooth" })
  },
  
  scrolling: {
    "scroll down": () => window.scrollBy({ top: 400, behavior: "smooth" }),
    "scroll up": () => window.scrollBy({ top: -400, behavior: "smooth" }),
    "page down": () => window.scrollBy({ top: window.innerHeight, behavior: "smooth" }),
    "page up": () => window.scrollBy({ top: -window.innerHeight, behavior: "smooth" }),
    "scroll to bottom": () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
    "bottom": () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  },
  
  interaction: {
    "click button": () => clickFirstButton(),
    "submit": () => submitForm(),
    "submit form": () => submitForm(),
    "search": () => focusSearch(),
    "focus search": () => focusSearch(),
    "open cart": () => openCart(),
    "cart": () => openCart(),
    "shopping cart": () => openCart(),
    "close": () => closeModal(),
    "close modal": () => closeModal(),
    "go back": () => window.history.back(),
    "back": () => window.history.back()
  },
  
  accessibility: {
    "increase font": () => adjustFontSize(1.1),
    "decrease font": () => adjustFontSize(0.9),
    "bigger text": () => adjustFontSize(1.2),
    "smaller text": () => adjustFontSize(0.8),
    "high contrast": () => toggleHighContrast(),
    "toggle contrast": () => toggleHighContrast(),
    "dark mode": () => toggleDarkMode(),
    "light mode": () => toggleLightMode()
  },
  
  utility: {
    "refresh": () => location.reload(),
    "reload": () => location.reload(),
    "refresh page": () => location.reload(),
    "full screen": () => toggleFullscreen(),
    "fullscreen": () => toggleFullscreen(),
    "print": () => window.print(),
    "print page": () => window.print(),
    "what time": () => speakTime(),
    "time": () => speakTime(),
    "help": () => showVoiceHelp(),
    "voice help": () => showVoiceHelp(),
    "commands": () => showVoiceHelp()
  }
};

// Voice feedback system
let speechSynthesis = window.speechSynthesis;
let voiceEnabled = true;

function speak(text) {
  if (!voiceEnabled || !speechSynthesis) return;
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  utterance.volume = 0.7;
  speechSynthesis.speak(utterance);
}

// Enhanced navigation function
function navigateToSection(selector, sectionName) {
  const element = document.querySelector(`a[href="${selector}"]`) || document.querySelector(selector);
  if (element) {
    if (element.tagName === 'A') {
      element.click();
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    speak(`Navigating to ${sectionName}`);
    showFeedback(`📍 Going to ${sectionName.toUpperCase()}`, "success");
  } else {
    speak(`${sectionName} section not found`);
    showFeedback(`❌ ${sectionName} section not found`, "error");
  }
}

// Utility functions
function clickFirstButton() {
  const buttons = document.querySelectorAll(`
    button:not([disabled]):not([aria-hidden="true"]), 
    [role="button"]:not([disabled]):not([aria-hidden="true"]),
    .btn:not([disabled]):not([aria-hidden="true"]),
    input[type="button"]:not([disabled]):not([aria-hidden="true"]),
    input[type="submit"]:not([disabled]):not([aria-hidden="true"])
  `);
  
  const visibleButtons = Array.from(buttons).filter(btn => {
    const style = window.getComputedStyle(btn);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  });
  
  if (visibleButtons.length > 0) {
    visibleButtons[0].click();
    speak("Button clicked");
    showFeedback("🔘 Button clicked", "success");
  } else {
    speak("No clickable button found");
    showFeedback("❌ No button found", "error");
  }
}

function submitForm() {
  const form = document.querySelector('form');
  if (form) {
    form.submit();
    speak("Form submitted");
    showFeedback("📤 Form submitted", "success");
  } else {
    speak("No form found");
    showFeedback("❌ No form found", "error");
  }
}

function focusSearch() {
  const searchSelectors = [
    'input[type="search"]',
    'input[placeholder*="search" i]',
    'input[name*="search" i]',
    'input[id*="search" i]',
    '#search',
    '.search-input',
    '.search-field',
    '[aria-label*="search" i]'
  ];
  
  let searchInput = null;
  
  for (const selector of searchSelectors) {
    const elements = document.querySelectorAll(selector);
    const visibleElements = Array.from(elements).filter(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    });
    
    if (visibleElements.length > 0) {
      searchInput = visibleElements[0];
      break;
    }
  }
  
  if (searchInput) {
    searchInput.focus();
    searchInput.select();
    speak("Search focused");
    showFeedback("🔍 Search activated", "success");
  } else {
    speak("No search box found");
    showFeedback("❌ No search found", "error");
  }
}
function openCart() {
  const cartSelectors = [
    // Shopping cart icons/buttons (NOT add to cart buttons)
    '.cart-icon',
    '.shopping-cart-icon',
    '.cart-button:not([class*="add" i])',
    '.minicart-icon',
    '.basket-icon',
    
    // Cart links in header/navigation
    'a[href*="/cart" i]:not([href*="add" i])',
    'a[href*="/shopping-cart" i]',
    'a[href*="/basket" i]',
    
    // Cart by ID (avoiding add-to-cart IDs)
    '#cart:not([id*="add" i])',
    '#shopping-cart',
    '#minicart',
    '#cart-icon',
    '#basket',
    
    // Cart by class (excluding add-to-cart classes)
    '.cart:not([class*="add" i]):not([class*="product" i])',
    '.shopping-cart:not([class*="add" i])',
    '.minicart:not([class*="add" i])',
    '.basket:not([class*="add" i])',
    
    // Cart by aria-label (view cart, not add to cart)
    '[aria-label*="view cart" i]',
    '[aria-label*="shopping cart" i]:not([aria-label*="add" i])',
    '[aria-label*="open cart" i]',
    '[aria-label*="cart items" i]',
    
    // Cart by data attributes
    '[data-cart-toggle]',
    '[data-cart-open]',
    '[data-toggle="cart"]',
    
    // Cart by title
    '[title*="view cart" i]',
    '[title*="shopping cart" i]:not([title*="add" i])',
    '[title*="open cart" i]',
    
    // Header cart elements
    'header .cart, header .shopping-cart, header .minicart',
    'nav .cart, nav .shopping-cart, nav .minicart',
    '.header-cart, .nav-cart, .top-cart'
  ];
  
  let cartElement = null;
  
  for (const selector of cartSelectors) {
    try {
      const elements = document.querySelectorAll(selector);
      const visibleElements = Array.from(elements).filter(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const text = el.textContent || el.getAttribute('aria-label') || el.getAttribute('title') || '';
        
        // Exclude elements with "add" in their text/attributes
        const hasAddText = text.toLowerCase().includes('add');
        const hasAddClass = el.className.toLowerCase().includes('add');
        const hasAddId = el.id.toLowerCase().includes('add');
        
        return (
          style.display !== 'none' && 
          style.visibility !== 'hidden' && 
          style.opacity !== '0' &&
          rect.width > 0 && 
          rect.height > 0 &&
          !hasAddText &&
          !hasAddClass &&
          !hasAddId
        );
      });
      
      if (visibleElements.length > 0) {
        cartElement = visibleElements[0];
        break;
      }
    } catch (e) {
      // Continue to next selector if this one fails
      continue;
    }
  }
  
  if (cartElement) {
    // Double-check it's not an "add to cart" button
    const elementText = (cartElement.textContent || '').toLowerCase();
    const elementClass = cartElement.className.toLowerCase();
    const elementId = cartElement.id.toLowerCase();
    
    if (elementText.includes('add') || elementClass.includes('add') || elementId.includes('add')) {
      speak("Cart icon not found, only add to cart buttons available");
      showFeedback("❌ Cart icon not found", "error");
      return;
    }
    
    // Click the cart element
    cartElement.click();
    
    speak("Opening cart");
    showFeedback("🛒 Cart opened", "success");
    
    // Check if cart modal/sidebar opened
    setTimeout(() => {
      const cartModal = document.querySelector(`
        .cart-modal, .cart-sidebar, .cart-dropdown, .cart-popup,
        [id*="cart-modal" i], [id*="cart-sidebar" i], [id*="cart-dropdown" i],
        .minicart-modal, .shopping-cart-modal, .cart-overlay
      `);
      
      if (cartModal) {
        const style = window.getComputedStyle(cartModal);
        if (style.display !== 'none' && style.visibility !== 'hidden') {
          showFeedback("🛒 Cart contents displayed", "info", 2000);
        }
      }
    }, 500);
    
  } else {
    speak("Cart icon not found");
    showFeedback("❌ Cart icon not found", "error");
  }
}

function closeModal() {
  const closeBtn = document.querySelector('.modal .close, [aria-label="close"], .modal-close');
  const modal = document.querySelector('.modal[style*="block"], .modal.show');
  
  if (closeBtn) {
    closeBtn.click();
    speak("Modal closed");
    showFeedback("❌ Modal closed", "success");
  } else if (modal) {
    modal.style.display = 'none';
    speak("Modal closed");
    showFeedback("❌ Modal closed", "success");
  } else {
    speak("No modal to close");
    showFeedback("❌ No modal found", "error");
  }
}

function adjustFontSize(factor) {
  document.body.style.fontSize = `${(parseFloat(getComputedStyle(document.body).fontSize) * factor)}px`;
  speak(`Font size ${factor > 1 ? 'increased' : 'decreased'}`);
  showFeedback(`📝 Font size ${factor > 1 ? 'increased' : 'decreased'}`, "success");
}

function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
  const isHighContrast = document.body.classList.contains('high-contrast');
  
  if (isHighContrast) {
    document.body.style.setProperty('filter', 'contrast(150%) brightness(1.2)');
  } else {
    document.body.style.removeProperty('filter');
  }
  
  speak(`High contrast ${isHighContrast ? 'enabled' : 'disabled'}`);
  showFeedback(`🎨 High contrast ${isHighContrast ? 'ON' : 'OFF'}`, "success");
}

function toggleDarkMode() {
  document.body.style.setProperty('background-color', '#1a1a1a', 'important');
  document.body.style.setProperty('color', '#ffffff', 'important');
  speak("Dark mode activated");
  showFeedback("🌙 Dark mode ON", "success");
}

function toggleLightMode() {
  document.body.style.removeProperty('background-color');
  document.body.style.removeProperty('color');
  speak("Light mode activated");
  showFeedback("☀️ Light mode ON", "success");
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      speak("Fullscreen enabled");
      showFeedback("🖥️ Fullscreen ON", "success");
    });
  } else {
    document.exitFullscreen().then(() => {
      speak("Fullscreen disabled");
      showFeedback("🖥️ Fullscreen OFF", "success");
    });
  }
}

function speakTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  speak(`The time is ${timeString}`);
  showFeedback(`⏰ ${timeString}`, "info");
}

function showVoiceHelp() {
  const helpText = `
    <div style="max-height: 300px; overflow-y: auto;">
      <h3 style="margin-top: 0; color: #00f5ff;">🎤 Voice Commands</h3>
      <div style="display: grid; gap: 8px; font-size: 13px;">
        <div><strong>📍 Navigation:</strong> "menu", "contact", "about", "home", "top"</div>
        <div><strong>📜 Scrolling:</strong> "scroll down/up", "page down/up", "bottom"</div>
        <div><strong>🔧 Actions:</strong> "click button", "submit", "search", "cart", "back"</div>
        <div><strong>♿ Accessibility:</strong> "bigger text", "high contrast", "dark mode"</div>
        <div><strong>🛠️ Utility:</strong> "refresh", "fullscreen", "print", "time", "help"</div>
        <div style="margin-top: 10px; padding: 8px; background: rgba(0,245,255,0.1); border-radius: 6px;">
          <strong>💡 Tip:</strong> Press 'V' key or click the mic to start listening
        </div>
      </div>
    </div>
  `;
  
  showFeedback(helpText, "info", 8000);
  speak("Voice commands help displayed");
}

// Enhanced feedback system
function showFeedback(message, type = "info", duration = 4000) {
  const existingFeedback = document.getElementById('voice-feedback');
  if (existingFeedback) existingFeedback.remove();
  
  const colors = {
    success: { bg: '#00d084', border: '#00f5a0', glow: '0, 245, 160' },
    error: { bg: '#ff4757', border: '#ff6b7d', glow: '255, 107, 125' },
    info: { bg: '#1a1a2e', border: '#00f5ff', glow: '0, 245, 255' },
    warning: { bg: '#ffa502', border: '#ff6348', glow: '255, 163, 2' }
  };
  
  const color = colors[type] || colors.info;
  
  const feedback = document.createElement("div");
  feedback.id = 'voice-feedback';
  feedback.innerHTML = message;
  feedback.style.cssText = `
    position: fixed; bottom: 345px; right: 20px; 
    background: linear-gradient(135deg, ${color.bg} 0%, ${color.border} 100%); 
    color: white; padding: 16px 20px; border-radius: 12px; 
    font-size: 14px; z-index: 10001; max-width: 280px; 
    font-weight: 500; backdrop-filter: blur(10px);
    animation: slideInBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: 0 8px 32px rgba(${color.glow}, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(${color.glow}, 0.4);
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    if (feedback.parentNode) {
      feedback.style.animation = "slideOutFade 0.5s ease-in forwards";
      setTimeout(() => feedback.remove(), 500);
    }
  }, duration);
}

// Enhanced hover effects
micButton.addEventListener("mouseenter", () => {
  if (!micButton.classList.contains("recording")) {
    micButton.style.transform = "scale(1.08) rotate(5deg)";
    micButton.style.boxShadow = "0 12px 40px rgba(0, 255, 204, 0.4)";
    micButton.style.background = "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)";
    micButton.style.border = "2px solid rgba(0, 255, 204, 0.3)";
  }
});

micButton.addEventListener("mouseleave", () => {
  if (!micButton.classList.contains("recording")) {
    micButton.style.transform = "scale(1) rotate(0deg)";
    micButton.style.boxShadow = "0 8px 32px rgba(118, 75, 162, 0.25)";
    micButton.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    micButton.style.border = "2px solid rgba(255, 255, 255, 0.15)";
  }
});

document.body.appendChild(micButton);

// Enhanced Voice Navigation Function
function startVoiceNavigation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showFeedback("❌ Voice navigation not supported in this browser", "error");
    return;
  }
  
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  recognition.continuous = false;
  
  // Enhanced recording state
  micButton.classList.add("recording");
  micButton.innerHTML = "🔴";
  micButton.style.background = "linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)";
  micButton.style.boxShadow = "0 0 30px #ff0080, 0 0 60px #ff0080, 0 0 90px #ff0080";
  micButton.style.transform = "scale(1.12)";
  micButton.style.border = "2px solid #ff0080";
  micButton.style.animation = "neonPulse 1s ease-in-out infinite alternate";
  
  // Show listening indicator
  showFeedback("🎤 Listening... Speak now!", "info", 10000);
  
  recognition.start();
  
  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase().trim();
    console.log("🎤 Voice Command:", command);
    
    let commandExecuted = false;
    
    // Check all command categories
    for (const category of Object.values(voiceCommands)) {
      for (const [trigger, action] of Object.entries(category)) {
        if (command.includes(trigger) || command === trigger) {
          try {
            action();
            commandExecuted = true;
            break;
          } catch (error) {
            console.error("Command execution error:", error);
            showFeedback("❌ Command failed to execute", "error");
          }
        }
      }
      if (commandExecuted) break;
    }
    
    // If no command matched
    if (!commandExecuted) {
      speak("Command not recognized. Say 'help' for available commands.");
      showFeedback(`❓ Unknown command: "${command}"<br><small>Say "help" for available commands</small>`, "warning");
    }
  };
  
  recognition.onerror = (event) => {
    console.error("🎤 Voice Recognition Error:", event.error);
    let errorMessage = "Voice recognition error";
    
    switch (event.error) {
      case 'no-speech':
        errorMessage = "No speech detected. Try again.";
        break;
      case 'audio-capture':
        errorMessage = "Microphone not accessible";
        break;
      case 'not-allowed':
        errorMessage = "Microphone permission denied";
        break;
      case 'network':
        errorMessage = "Network error occurred";
        break;
      default:
        errorMessage = `Recognition error: ${event.error}`;
    }
    
    showFeedback(`❌ ${errorMessage}`, "error");
    speak(errorMessage);
  };
  
  recognition.onend = () => {
    // Reset mic button state
    micButton.classList.remove("recording");
    micButton.innerHTML = "🎤";
    micButton.style.boxShadow = "0 8px 32px rgba(118, 75, 162, 0.25)";
    micButton.style.transform = "scale(1)";
    micButton.style.animation = "none";
    micButton.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    micButton.style.border = "2px solid rgba(255, 255, 255, 0.15)";
    
    // Remove listening feedback if still visible
    const listeningFeedback = document.getElementById('voice-feedback');
    if (listeningFeedback && listeningFeedback.textContent.includes('Listening')) {
      listeningFeedback.remove();
    }
  };
}

// Enhanced keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Prevent triggering when user is typing in input fields
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
    return;
  }
  
  switch (e.key.toLowerCase()) {
    case "v":
      if (!micButton.classList.contains("recording")) {
        e.preventDefault();
        startVoiceNavigation();
      }
      break;
    case "h":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        showVoiceHelp();
      }
      break;
    case "m":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        voiceEnabled = !voiceEnabled;
        showFeedback(`🔊 Voice feedback ${voiceEnabled ? 'ON' : 'OFF'}`, "info");
      }
      break;
  }
});

// Click to trigger voice
micButton.addEventListener("click", startVoiceNavigation);

// Enhanced CSS animations and styles
const style = document.createElement('style');
style.textContent = `
  @keyframes neonPulse {
    0% { 
      box-shadow: 0 0 30px #ff0080, 0 0 60px #ff0080, 0 0 90px #ff0080;
      filter: brightness(1);
    }
    100% { 
      box-shadow: 0 0 40px #ff0080, 0 0 80px #ff0080, 0 0 120px #ff0080;
      filter: brightness(1.2);
    }
  }
  
  @keyframes slideInBounce {
    0% { 
      transform: translateX(120%) scale(0.3); 
      opacity: 0; 
    }
    50% { 
      transform: translateX(-10%) scale(1.05); 
    }
    70% { 
      transform: translateX(5%) scale(0.95); 
    }
    100% { 
      transform: translateX(0%) scale(1); 
      opacity: 1; 
    }
  }
  
  @keyframes slideOutFade {
    0% { 
      transform: translateX(0%) scale(1); 
      opacity: 1; 
    }
    100% { 
      transform: translateX(120%) scale(0.8); 
      opacity: 0; 
    }
  }
  
  .high-contrast {
    filter: contrast(150%) brightness(1.2) !important;
  }
  
  #voiceMic {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;
document.head.appendChild(style);

// Initialize welcome message
setTimeout(() => {
  showFeedback("🎤 Voice navigation ready!<br><small>Press 'V' or click mic to start</small>", "success", 2000);
}, 1000);
// Improved function to toggle button visibility
function toggleButtonVisibility(isCartOpen) {
    // Multiple selectors to find the buttons more reliably
    const chefSelectors = [
        '#chefBtn',
        '.chef-btn',
        '[id*="chef"]',
        '[class*="chef"]',
        'button[onclick*="chef"]'
    ];
    
    const micSelectors = [
        '#voiceMic',
        '.voice-mic',
        '.mic-btn',
        '[id*="mic"]',
        '[class*="mic"]',
        'button[onclick*="voice"]'
    ];
    
    // Function to find element using multiple selectors
    function findElement(selectors) {
        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        return null;
    }
    
    // Try multiple times with different delays
    function attemptToggle(attempt = 0) {
        const chefBtn = findElement(chefSelectors);
        const micBtn = findElement(micSelectors);
        
        console.log(`Attempt ${attempt + 1}:`);
        console.log('Cart open:', isCartOpen);
        console.log('Chef button found:', chefBtn);
        console.log('Mic button found:', micBtn);
        
        if (chefBtn || micBtn) {
            // At least one button found, proceed with toggle
            if (chefBtn) {
                chefBtn.style.display = isCartOpen ? 'none' : 'block';
                chefBtn.style.visibility = isCartOpen ? 'hidden' : 'visible';
                console.log('Chef button', isCartOpen ? 'hidden' : 'shown');
            }
            
            if (micBtn) {
                micBtn.style.display = isCartOpen ? 'none' : 'block';
                micBtn.style.visibility = isCartOpen ? 'hidden' : 'visible';
                console.log('Mic button', isCartOpen ? 'hidden' : 'shown');
            }
        } else if (attempt < 3) {
            // Try again with longer delay
            setTimeout(() => attemptToggle(attempt + 1), 500);
        } else {
            console.warn('Could not find chef or mic buttons after multiple attempts');
            // Log all buttons on page for debugging
            const allButtons = document.querySelectorAll('button');
            console.log('All buttons found:', allButtons);
            allButtons.forEach((btn, index) => {
                console.log(`Button ${index}:`, btn.id, btn.className, btn.textContent?.trim());
            });
        }
    }
    
    // Start the attempt process
    attemptToggle();
}

// Updated toggleCart function
function toggleCart() {
    if (!cartSidebar) return;
    
    if (activeOverlay === 'cart') {
        cartSidebar.classList.remove('open');
        document.body.classList.remove('cart-open');
        activeOverlay = null;
        showConflictingElements();
        toggleButtonVisibility(false); // Show other buttons when cart closes
    } else {
        closeAllOverlays();
        cartSidebar.classList.add('open');
        document.body.classList.add('cart-open');
        activeOverlay = 'cart';
        hideConflictingElements();
        toggleButtonVisibility(true); // Hide other buttons when cart opens
    }
}

// Updated closeAllOverlays function
function closeAllOverlays() {
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
    }
    document.body.classList.remove('cart-open');
    const overlays = document.querySelectorAll('.modal.show, .popup.active, [class*="overlay"].active');
    overlays.forEach(overlay => {
        overlay.classList.remove('show', 'active', 'open');
    });
    showConflictingElements();
    toggleButtonVisibility(false); // Show other buttons when overlays close
    activeOverlay = null;
}

function toggleButtonVisibilityCSS(isCartOpen) {
    if (isCartOpen) {
        document.body.classList.add('cart-open');
    } else {
        document.body.classList.remove('cart-open');
    }
}

// Debug function to help identify the correct selectors
function debugButtons() {
    console.log('=== Button Debug Info ===');
    const allButtons = document.querySelectorAll('button, [role="button"], .btn');
    allButtons.forEach((btn, index) => {
        console.log(`Button ${index}:`, {
            id: btn.id,
            className: btn.className,
            textContent: btn.textContent?.trim(),
            innerHTML: btn.innerHTML.substring(0, 50) + '...'
        });
    });
}
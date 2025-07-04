
// Initialize EmailJS
emailjs.init("Ab5GprGyGoeN6uTxO");

// Enhanced Chef Chatbot Class
class ChefChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.isTyping = false;
        this.userName = null;
        this.voiceEnabled = true; // Voice is enabled by default
        
        this.chefReplies = [
            { 
                keywords: ['menu', 'food', 'eat', 'dish', 'meal', 'what do you have'], 
                reply: "🍽️ Our delicious healthy menu includes:\n• Sprouts Chaat - ₹120\n• Paneer Tikka Roll - ₹150\n• Quinoa Upma Bowl - ₹140\n• Kachumber Salad - ₹80\n• Veggie Paratha Roll - ₹110\n• Rajma Rice Bowl - ₹160\n• Mint Lassi - ₹70\n\nWhat catches your eye today?",
                followUp: ["Tell me about sprouts chaat", "What's in the quinoa bowl?", "Show me drinks"]
            },
            { 
                keywords: ['sprouts', 'chaat', 'sprouts chaat'], 
                reply: "🌱 Our signature Sprouts Chaat - ₹120:\nFresh mixed sprouts with onions, tomatoes, and tangy chutneys. A perfect blend of protein and flavor that's both healthy and delicious! 😋"
            },
            { 
                keywords: ['paneer', 'tikka', 'roll', 'paneer tikka'], 
                reply: "🧀 Paneer Tikka Roll - ₹150:\nGrilled paneer tikka wrapped with fresh vegetables and mint chutney. A protein-packed delight that's grilled to perfection! 🌯"
            },
            { 
                keywords: ['quinoa', 'upma', 'bowl', 'quinoa upma'], 
                reply: "🥣 Quinoa Upma Bowl - ₹140:\nNutritious quinoa upma with mixed vegetables and curry leaves. A healthy twist on the classic South Indian dish! 🌾"
            },
            { 
                keywords: ['salad', 'kachumber', 'cucumber'], 
                reply: "🥗 Kachumber Salad - ₹80:\nFresh cucumber, tomato, onion salad with lemon and black salt. Simple, refreshing, and packed with nutrients! 🥒"
            },
            { 
                keywords: ['paratha', 'veggie paratha', 'roll'], 
                reply: "🫓 Veggie Paratha Roll - ₹110:\nStuffed vegetable paratha rolled with fresh chutneys and pickles. Comfort food that's both filling and healthy! 🌿"
            },
            { 
                keywords: ['rajma', 'rice', 'bowl', 'rajma rice'], 
                reply: "🍛 Rajma Rice Bowl - ₹160:\nProtein-rich rajma curry served with brown rice and salad. A complete meal that's wholesome and satisfying! 💪"
            },
            { 
                keywords: ['lassi', 'drink', 'mint', 'beverage'], 
                reply: "🥤 Mint Lassi - ₹70:\nFresh yogurt-based drink with mint, cumin, and black salt. Cool, refreshing, and perfect for digestion! 🌿"
            },
            { 
                keywords: ['timing', 'time', 'open', 'hours', 'when'], 
                reply: "⏰ We're serving happiness daily!\n🕙 10:00 AM - 9:00 PM\n📅 7 days a week\n\nCome hungry, leave happy! 😊"
            },
            { 
                keywords: ['location', 'where', 'address', 'find'], 
                reply: "🚐 We're a mobile food truck, always on the move!\n📍 Check our 'Live Location' feature\n📱 Or ask our friendly staff\n\nWe love surprising different neighborhoods! 🗺️"
            },
            { 
                keywords: ['healthy', 'nutrition', 'benefits', 'good'], 
                reply: "💪 All our meals are crafted with superfoods!\n✨ Fresh sprouts & quinoa (high protein)\n🌾 Brown rice & whole grains\n🥗 Fresh vegetables daily\n\nEating healthy never tasted this good! 🌟"
            },
            { 
                keywords: ['calories', 'calorie', 'nutrition facts'], 
                reply: "📊 Each dish is nutritionally balanced!\n💯 Most meals: 300-500 calories\n🏋️ High protein content\n\nWant specific info for any dish? Just ask! 📋"
            },
            { 
                keywords: ['vegan', 'vegetarian', 'plant'], 
                reply: "🌱 Absolutely! We love plant-powered meals:\n🥗 Sprouts Chaat\n🥣 Quinoa Upma Bowl\n🫓 Veggie Paratha Roll\n🥤 Mint Lassi\n\nPlant-based never tasted so amazing! 💚"
            },
            { 
                keywords: ['order', 'buy', 'purchase', 'get'], 
                reply: "📦 Ready to order? Here's how:\n🚐 Visit our food truck directly\n💬 Message us here for assistance\n📞 Call us for pre-orders\n\nWe make ordering super easy! 🎉"
            },
            { 
                keywords: ['price', 'cost', 'expensive', 'cheap', 'money'], 
                reply: "💸 Affordable goodness for everyone!\n🍽️ Salads & Snacks: ₹70 - ₹120\n🌯 Rolls & Wraps: ₹110 - ₹150\n🍛 Full Meals: ₹140 - ₹160\n\nQuality food at honest prices! 💰"
            },
            { 
                keywords: ['contact', 'phone', 'call', 'reach'], 
                reply: "📱 Multiple ways to reach us:\n💬 Chat with me here\n📧 Use our contact form below\n📍 Find us at our truck location\n\nWe're always here to help! 🤝"
            },
            { 
                keywords: ['feedback', 'review', 'complaint', 'suggestion'], 
                reply: "📝 Your feedback means everything to us!\n⭐ Share your experience here\n📋 Use the contact form below\n💡 Suggestions always welcome\n\nHelp us serve you better! 🙏"
            },
            { 
                keywords: ['thanks', 'thank you', 'appreciate'], 
                reply: "🫶 You're absolutely wonderful!\n😊 Thanks for choosing Chef Tray\n🔄 Come back soon for more deliciousness\n\nYou made our day! ✨"
            },
            { 
                keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening'], 
                reply: "👨‍🍳 Hey there, food lover! I'm Chef Tray!\n🍽️ Ready to explore some amazing healthy Indian food?\n✨ Ask me about our menu, timings, or anything delicious!\n\nWhat can I cook up for you today? 😋"
            },
    { 
        keywords: ['bye', 'goodbye', 'see you', 'later'], 
        reply: "👋 Until we meet again!\n🍽️ Hope to see you at our truck soon\n😊 Keep eating healthy and stay amazing!\n\nBye bye, food friend! 🚐✨"
    },
    {
        keywords: ['jain', 'jain food', 'no onion', 'no garlic', 'jain meal'], 
        reply: "🙏 Absolutely! We have Jain-friendly options:\n• Sprouts Chaat (without onion/garlic)\n• Quinoa Upma Bowl (Jain style)\n• Kachumber Salad (pure veg)\n• Mint Lassi (no garlic/onion)\n\nJust let us know when ordering - we respect your dietary preferences! 🌱"
    },
    { 
        keywords: ['how do you make', 'recipe', 'cooking', 'prepare', 'ingredients'], 
        reply: "👨‍🍳 We use traditional methods with a healthy twist!\n🥘 Fresh ingredients daily\n🌿 Authentic spices & herbs\n🔥 Grilled, not fried\n💧 Minimal oil cooking\n\nOur secret? Love, patience, and the finest ingredients! Want to know about a specific dish? 😋"
    },
    { 
        keywords: ['spicy', 'hot', 'chili', 'pepper', 'mild'], 
        reply: "🌶️ We cater to all spice levels!\n🟢 Mild: Mint Lassi, Kachumber Salad\n🟡 Medium: Quinoa Upma, Paneer Tikka\n🔴 Spicy: We can make it hot on request!\n\nJust tell us your preference - we'll make it perfect for you! 🔥"
    },
    { 
        keywords: ['diabetes', 'diabetic', 'sugar', 'low sugar', 'blood sugar'], 
        reply: "🩺 We care about your health!\n✅ Diabetic-friendly options:\n• Sprouts Chaat (high fiber)\n• Quinoa Upma (low GI)\n• Kachumber Salad (fresh)\n• Rajma Rice (protein rich)\n\nNo added sugar, natural ingredients only! 💪"
    },
    { 
        keywords: ['gluten free', 'gluten', 'wheat free', 'celiac'], 
        reply: "🌾 Gluten-free options available!\n✅ Naturally gluten-free:\n• Sprouts Chaat\n• Quinoa Upma Bowl\n• Kachumber Salad\n• Mint Lassi\n\nWe can prepare most dishes gluten-free. Just mention when ordering! 🌟"
    },
    { 
        keywords: ['protein', 'muscle', 'gym', 'workout', 'fitness'], 
        reply: "💪 Perfect for fitness enthusiasts!\n🏋️ High-protein options:\n• Sprouts Chaat (plant protein)\n• Paneer Tikka Roll (20g protein)\n• Rajma Rice Bowl (complete protein)\n• Quinoa dishes (all amino acids)\n\nFuel your fitness goals! 🔥"
    },
    { 
        keywords: ['weight loss', 'diet', 'lose weight', 'calories', 'slim'], 
        reply: "⚖️ Great for weight management!\n📉 Low-calorie, high-nutrition:\n• Sprouts Chaat (fiber rich)\n• Kachumber Salad (under 100 cal)\n• Quinoa Upma (keeps you full)\n\nHealthy eating made delicious! 🌟"
    },
    { 
        keywords: ['kids', 'children', 'child', 'kid friendly'], 
        reply: "👶 Kids love our healthy food!\n🎨 Kid-approved dishes:\n• Paneer Tikka Roll (mild & tasty)\n• Quinoa Upma (fun texture)\n• Mint Lassi (cool & sweet)\n• Veggie Paratha (familiar taste)\n\nHealthy food that kids actually enjoy! 🌈"
    },
    { 
        keywords: ['fresh', 'quality', 'organic', 'ingredients'], 
        reply: "🌱 Freshness is our priority!\n✨ We use:\n• Vegetables sourced daily\n• Organic sprouts & quinoa\n• Fresh herbs & spices\n• No preservatives\n\nFrom farm to your plate with love! 🚚"
    },
    { 
        keywords: ['combo', 'meal deal', 'offer', 'discount', 'package'], 
        reply: "🎁 Amazing meal combos available!\n💫 Popular combos:\n• Sprouts Chaat + Mint Lassi = ₹180\n• Any Roll + Salad = ₹200\n• Full Meal + Drink = ₹220\n\nSave money, eat healthy! 💰"
    },
    { 
        keywords: ['delivery', 'home delivery', 'order online', 'zomato', 'swiggy'], 
        reply: "🚚 We're working on delivery options!\n📱 Currently available:\n• Visit our food truck\n• Pre-order via WhatsApp\n• Pickup service ready\n\nDelivery coming soon to serve you better! 🛵"
    },
    { 
        keywords: ['book', 'reserve', 'advance order', 'pre order'], 
        reply: "📞 Advance orders welcome!\n⏰ How to pre-order:\n• Call us 30 minutes ahead\n• Message us with your order\n• Visit and we'll prepare fresh\n\nNo waiting, just fresh food ready! ✨"
    },
    { 
        keywords: ['payment', 'card', 'cash', 'upi', 'paytm'], 
        reply: "💳 Multiple payment options!\n💰 We accept:\n• Cash\n• UPI (GPay, PhonePe, Paytm)\n• Credit/Debit cards\n• Digital wallets\n\nPay however you like! 📱"
    },
    { 
        keywords: ['party', 'event', 'catering', 'bulk order', 'office'], 
        reply: "🎉 Catering services available!\n🍽️ Perfect for:\n• Office parties\n• Health events\n• Birthday parties\n• Corporate meetings\n\nHealthy food for your special occasions! 📞"
    },
    { 
        keywords: ['season', 'winter', 'summer', 'monsoon', 'weather'], 
        reply: "🌦️ Seasonal specials always available!\n❄️ Winter: Warm quinoa bowls\n☀️ Summer: Cool salads & lassi\n🌧️ Monsoon: Hot parathas & chai\n\nFresh food for every season! 🍃"
    },
    { 
        keywords: ['late night', 'night', 'dinner', 'evening'], 
        reply: "🌙 We serve till 9 PM!\n🍽️ Perfect evening meals:\n• Light: Sprouts Chaat\n• Filling: Rajma Rice Bowl\n• Refreshing: Mint Lassi\n\nHealthy dinners that digest well! 😴"
    },
    { 
        keywords: ['breakfast', 'morning', 'early'], 
        reply: "🌅 Fresh breakfast options!\n☀️ Morning favorites:\n• Quinoa Upma Bowl (energy boost)\n• Sprouts Chaat (protein start)\n• Mint Lassi (fresh beginning)\n\nStart your day healthy! 💪"
    },
    { 
        keywords: ['staff', 'chef', 'team', 'who makes'], 
        reply: "👨‍🍳 Meet our amazing team!\n⭐ Experienced chefs\n🧑‍🍳 Health-conscious cooks\n💝 Passionate about nutrition\n🌟 Trained in hygiene\n\nWe're a family serving families! 👨‍👩‍👧‍👦"
    },
    { 
        keywords: ['hygiene', 'clean', 'safe', 'sanitized'], 
        reply: "🧼 Hygiene is our top priority!\n✅ We maintain:\n• Daily sanitization\n• Fresh ingredients only\n• Clean cooking equipment\n• Health-certified staff\n\nYour safety, our responsibility! 🛡️"
    },
    { 
        keywords: ['story', 'about', 'journey', 'started'], 
        reply: "📖 Our story began with a simple dream!\n💭 Mission: Make healthy Indian food accessible\n🚐 Started with one truck, one vision\n❤️ Growing with love from customers like you\n\nEvery meal tells our story! 🌟"
    }
];

        this.greetings = [
            "Welcome back, food adventurer! 🌟",
            "Great to see you again! 😊",
            "Hello there, hungry friend! 👨‍🍳",
            "Ready for some delicious discoveries? 🍽️"
        ];

        this.init();
    }

    init() {
        this.createChatElements();
        this.addEventListeners();
        this.addStyles();
        this.loadVoicePreference(); // Load saved voice preference
    }

    createChatElements() {
        // Create floating chef button with improved design
        const chefButton = document.createElement('div');
        chefButton.id = 'chefBtn';
        chefButton.innerHTML = '<span class="chef-icon">🧑‍🍳</span><span class="notification-dot" id="notificationDot"></span>';
        document.body.appendChild(chefButton);

        // Create chat interface
        const chefChat = document.createElement('div');
        chefChat.id = 'chefChat';
        chefChat.innerHTML = `
            <div class="chat-header">
                <div class="header-content">
                    <span class="chef-avatar">🧑‍🍳</span>
                    <div class="header-text">
                        <div class="chef-name">Chef Tray</div>
                        <div class="chef-status">Online • Ready to help!</div>
                    </div>
                </div>
                <div class="header-controls">
                    <button id="voiceToggle" class="voice-btn" title="Toggle Voice">
                        <span class="voice-icon">🔊</span>
                    </button>
                    <button id="closeChef" class="close-btn">✖️</button>
                </div>
            </div>
            <div id="chatBox" class="chat-box">
                <div class="welcome-message">
                    <div class="chef-message">
                        🧑‍🍳 Welcome to Chef Tray! I'm here to help you discover our amazing healthy Indian food options. What would you like to know?
                    </div>
                    <div class="quick-options">
                        <button class="quick-btn" data-msg="Show me the menu">🍽️ Menu</button>
                        <button class="quick-btn" data-msg="What are your timings?">⏰ Timings</button>
                        <button class="quick-btn" data-msg="Where are you located?">📍 Location</button>
                    </div>
                </div>
            </div>
            <div class="typing-indicator" id="typingIndicator">
                <span class="typing-dots">
                    <span></span><span></span><span></span>
                </span>
                Chef is typing...
            </div>
            <div class="chat-input-row">
                <input id="chatInput" type="text" placeholder="Ask me anything about our food..." maxlength="200" />
                <button id="sendBtn" class="send-btn">
                    <span class="send-icon">➤</span>
                </button>
            </div>
            <div class="chat-footer">
                <div class="voice-status">
                    <span id="voiceStatus" class="voice-indicator">🔊 Voice ON</span>
                </div>
                <small>Powered by Chef Tray • Always fresh, always healthy! 🌟</small>
            </div>
        `;
        document.body.appendChild(chefChat);

        // Show notification after 3 seconds
        setTimeout(() => {
            this.showNotification();
        }, 3000);
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }

            @keyframes slideInUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-5px); }
            }

            @keyframes gentleFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-3px); }
            }

            #chefBtn {
                position: fixed;
                bottom: 150px;
                right: 20px;
                width: 65px;
                height: 65px;
                background: linear-gradient(135deg, #FF6B35, #F7931E);
                border-radius: 50%;
                cursor: pointer;
                z-index: 10000;
                display: flex !important;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
                transition: all 0.3s ease;
                animation: gentleFloat 3s ease-in-out infinite;
                visibility: visible !important;
                opacity: 1 !important;
                border: 3px solid rgba(255, 255, 255, 0.2);
            }

            #chefBtn:hover {
                transform: scale(1.1) translateY(-2px);
                box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4);
                animation-play-state: paused;
            }

            .chef-icon {
                font-size: 1.8rem;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            }

            .notification-dot {
                position: absolute;
                top: 5px;
                right: 5px;
                width: 12px;
                height: 12px;
                background: #e74c3c;
                border-radius: 50%;
                display: none;
                animation: pulse 1.5s infinite;
                border: 2px solid white;
            }

            .notification-dot.show {
                display: block;
            }

            #chefChat {
                display: none;
                position: fixed;
                bottom: 120px;
                right: 30px;
                width: 380px;
                max-width: calc(100vw - 40px);
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                z-index: 9998;
                animation: slideInUp 0.4s ease-out;
                border: 1px solid rgba(0,0,0,0.05);
            }

            .chat-header {
                background: linear-gradient(135deg, #FF6B35, #F7931E);
                color: white;
                padding: 16px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .header-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .chef-avatar {
                font-size: 1.8rem;
                background: rgba(255,255,255,0.2);
                padding: 8px;
                border-radius: 50%;
            }

            .chef-name {
                font-weight: 600;
                font-size: 1.1rem;
            }

            .chef-status {
                font-size: 0.85rem;
                opacity: 0.9;
            }

            .header-controls {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .voice-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                font-size: 1.1rem;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                position: relative;
            }

            .voice-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: scale(1.05);
            }

            .voice-btn.muted {
                background: rgba(231, 76, 60, 0.8);
            }

            .voice-btn.muted .voice-icon::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 2px;
                background: white;
                transform: translate(-50%, -50%) rotate(45deg);
                border-radius: 1px;
            }

            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.2s;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .close-btn:hover {
                background: rgba(255,255,255,0.2);
            }

            .chat-box {
                height: 350px;
                overflow-y: auto;
                padding: 20px;
                background: #fafafa;
                font-size: 0.95rem;
                scroll-behavior: smooth;
            }

            .chat-box::-webkit-scrollbar {
                width: 6px;
            }

            .chat-box::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            .chat-box::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 3px;
            }

            .welcome-message {
                animation: fadeIn 0.6s ease-in;
            }

            .chef-message {
                background: linear-gradient(135deg, #fff3e0, #ffe0b2);
                padding: 14px 16px;
                border-radius: 18px 18px 18px 6px;
                margin-bottom: 12px;
                border: 1px solid rgba(255, 107, 53, 0.1);
                line-height: 1.4;
                animation: fadeIn 0.5s ease-in;
            }

            .chat-user {
                text-align: right;
                margin: 12px 0;
                animation: fadeIn 0.3s ease-in;
            }

            .user-message {
                display: inline-block;
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
                padding: 12px 16px;
                border-radius: 18px 18px 6px 18px;
                max-width: 80%;
                word-wrap: break-word;
                line-height: 1.4;
            }

            .chat-reply {
                margin: 12px 0;
                animation: fadeIn 0.5s ease-in;
            }

            .quick-options {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                margin-top: 15px;
            }

            .quick-btn {
                background: linear-gradient(135deg, #FF6B35, #F7931E);
                color: white;
                border: none;
                padding: 8px 14px;
                border-radius: 20px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
                border: 1px solid rgba(255, 107, 53, 0.3);
            }

            .quick-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
            }

            .typing-indicator {
                display: none;
                padding: 10px 20px;
                background: #f8f9fa;
                font-size: 0.9rem;
                color: #6c757d;
                border-top: 1px solid #e9ecef;
                align-items: center;
                gap: 10px;
            }

            .typing-indicator.show {
                display: flex;
            }

            .typing-dots {
                display: flex;
                gap: 3px;
            }

            .typing-dots span {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #FF6B35;
                animation: typing 1.4s infinite ease-in-out;
            }

            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

            .chat-input-row {
                display: flex;
                padding: 15px 20px;
                gap: 10px;
                background: white;
                border-top: 1px solid #e9ecef;
            }

            .chat-input-row input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #e9ecef;
                border-radius: 25px;
                font-size: 0.95rem;
                outline: none;
                transition: border-color 0.2s;
            }

            .chat-input-row input:focus {
                border-color: #FF6B35;
            }

            .send-btn {
                background: linear-gradient(135deg, #FF6B35, #F7931E);
                border: none;
                color: white;
                border-radius: 50%;
                width: 45px;
                height: 45px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
            }

            .send-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
            }

            .send-icon {
                font-size: 1.2rem;
            }

            .chat-footer {
                padding: 12px 20px;
                background: #f8f9fa;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }

            .voice-status {
                margin-bottom: 5px;
            }

            .voice-indicator {
                font-size: 0.85rem;
                color: #FF6B35;
                font-weight: 500;
                padding: 4px 8px;
                background: rgba(255, 107, 53, 0.1);
                border-radius: 12px;
                display: inline-block;
            }

            .voice-indicator.muted {
                color: #e74c3c;
                background: rgba(231, 76, 60, 0.1);
            }

            .chat-footer small {
                color: #6c757d;
                font-size: 0.8rem;
            }

            /* Mobile Responsive */
            @media (max-width: 480px) {
                #chefChat {
                    right: 10px;
                    left: 10px;
                    width: auto;
                    bottom: 200px;
                }
                
                #chefBtn {
                    right: 15px;
                    bottom: 120px;
                    width: 55px;
                    height: 55px;
                }
                
                .chef-icon {
                    font-size: 1.6rem;
                }
                
                .chat-box {
                    height: 300px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        const chatInput = document.getElementById('chatInput');
        const chatBox = document.getElementById('chatBox');
        const sendBtn = document.getElementById('sendBtn');
        const chefBtn = document.getElementById('chefBtn');
        const closeBtn = document.getElementById('closeChef');
        const chefChat = document.getElementById('chefChat');
        const voiceToggle = document.getElementById('voiceToggle');

        // Send message on button click
        sendBtn.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Open chat
        chefBtn.addEventListener('click', () => this.openChat());

        // Close chat
        closeBtn.addEventListener('click', () => this.closeChat());

        // Toggle voice
        voiceToggle.addEventListener('click', () => this.toggleVoice());

        // Handle quick buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const message = e.target.getAttribute('data-msg');
                this.simulateUserMessage(message);
            }
        });

        // Auto-resize input
        chatInput.addEventListener('input', (e) => {
            if (e.target.value.length > 150) {
                e.target.style.fontSize = '0.9rem';
            } else {
                e.target.style.fontSize = '0.95rem';
            }
        });
    }

    showNotification() {
        const dot = document.getElementById('notificationDot');
        if (dot && !this.isOpen) {
            dot.classList.add('show');
        }
    }

    hideNotification() {
        const dot = document.getElementById('notificationDot');
        if (dot) {
            dot.classList.remove('show');
        }
    }

    openChat() {
        const chefChat = document.getElementById('chefChat');
        chefChat.style.display = 'block';
        this.isOpen = true;
        this.hideNotification();
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 100);
    }
closeChat() {
    const chefChat = document.getElementById('chefChat');
    chefChat.style.display = 'none';
    this.isOpen = false;
    window.speechSynthesis.cancel(); // <-- cancel speaking on close
}


    simulateUserMessage(message) {
        const chatInput = document.getElementById('chatInput');
        chatInput.value = message;
        this.sendMessage();
    }

    async sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatBox = document.getElementById('chatBox');
        const userMsg = chatInput.value.trim();
        
        if (!userMsg) return;

        // Add user message
        this.addUserMessage(userMsg);
        chatInput.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Simulate thinking time
        await this.delay(800 + Math.random() * 1000);
        
        // Hide typing and show reply
        this.hideTyping();
        this.addChefReply(userMsg);
        
        // Store conversation
        this.conversationHistory.push({
            user: userMsg,
            timestamp: new Date(),
            replied: true
        });
    }

    addUserMessage(message) {
        const chatBox = document.getElementById('chatBox');
        const userEl = document.createElement('div');
        userEl.className = 'chat-user';
        userEl.innerHTML = `<div class="user-message">${this.escapeHtml(message)}</div>`;
        chatBox.appendChild(userEl);
        this.scrollToBottom();
    }

    addChefReply(userMessage) {
        const chatBox = document.getElementById('chatBox');
        const replyText = this.getReply(userMessage);
        
        const replyEl = document.createElement('div');
        replyEl.className = 'chat-reply';
        replyEl.innerHTML = `<div class="chef-message">${this.formatReply(replyText)}</div>`;
        chatBox.appendChild(replyEl);
        
        this.scrollToBottom();
        this.speakReply(replyText);
    }

    getReply(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        
        // Check for multiple keywords
        const matched = this.chefReplies.find(entry => 
            entry.keywords.some(keyword => lowerMsg.includes(keyword))
        );
        
        if (matched) {
            return matched.reply;
        }
        
        // Default responses based on message length and content
        if (lowerMsg.length < 5) {
            return "🤔 Could you tell me a bit more? I'm here to help with anything about our food, timings, or location! 🧑‍🍳";
        }
        
        if (lowerMsg.includes('?')) {
            return "🍽️ Great question! I'd love to help, but I might need more details. Try asking about our menu, timings, location, or healthy options! 😊";
        }
        
        return "🧑‍🍳 Hmm, I'm not sure about that specific thing, but I'm an expert on our delicious Indian food! Ask me about:\n• 🍽️ Our menu items\n• ⏰ Opening hours\n• 📍 Location\n• 🌱 Healthy options\n• 💰 Prices\n\nWhat interests you most? 😋";
    }

    formatReply(reply) {
        return reply
            .replace(/\n/g, '<br>')
            .replace(/•/g, '<span style="color: #FF6B35;">•</span>');
    }

    showTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.add('show');
        this.scrollToBottom();
    }

    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.remove('show');
    }

   toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    const voiceToggle = document.getElementById('voiceToggle');
    const voiceStatus = document.getElementById('voiceStatus');
    const voiceIcon = voiceToggle.querySelector('.voice-icon');

    if (this.voiceEnabled) {
        voiceToggle.classList.remove('muted');
        voiceToggle.title = 'Turn OFF Voice';
        voiceIcon.textContent = '🔊';
        voiceStatus.textContent = '🔊 Voice ON';
        voiceStatus.classList.remove('muted');
    } else {
        voiceToggle.classList.add('muted');
        voiceToggle.title = 'Turn ON Voice';
        voiceIcon.textContent = '🔇';
        voiceStatus.textContent = '🔇 Voice OFF';
        voiceStatus.classList.add('muted');
        window.speechSynthesis.cancel(); // <-- stop voice immediately
    }

    localStorage.setItem('chefVoiceEnabled', this.voiceEnabled);
}

speakReply(replyText) {
    if (!this.voiceEnabled || !window.speechSynthesis) return;

    // Remove emojis using a regex and format text
    const cleanedText = replyText
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')  // Remove emojis
        .replace(/•/g, '')                                                   // Remove bullet dots
        .replace(/\n/g, '. ');                                               // Replace newlines with periods

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
}


    loadVoicePreference() {
        const saved = localStorage.getItem('chefVoiceEnabled');
        if (saved === 'false') {
            this.voiceEnabled = false;
            const voiceToggle = document.getElementById('voiceToggle');
            const voiceStatus = document.getElementById('voiceStatus');
            if (voiceToggle && voiceStatus) {
                voiceToggle.classList.add('muted');
                voiceToggle.title = 'Turn ON Voice';
                voiceToggle.querySelector('.voice-icon').textContent = '🔇';
                voiceStatus.textContent = '🔇 Voice OFF';
                voiceStatus.classList.add('muted');
            }
        }
    }

    scrollToBottom() {
        const chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the chatbot after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChefChatbot();
});

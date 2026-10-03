/* =========================================================
   PORTFOLIO JAVASCRIPT
   ZAIN UL ABEDIN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Close menu after clicking a navigation link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }



    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".site-header");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });



    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(
            ".nav-menu a[href^='#']"
        );


    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            (header ? header.offsetHeight : 0) +
            100;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );



    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-header, " +
            ".service-card, " +
            ".project-card, " +
            ".case-study-card, " +
            ".why-card, " +
            ".about-content, " +
            ".about-details, " +
            ".stack-item, " +
            ".highlight-item, " +
            ".contact-item, " +
            ".skills-list span, " +
            ".trust-item, " +
            ".projects-coming"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }



    /* =====================================================
       STAGGER CARD ANIMATION
    ===================================================== */

    const cardGroups = [
        ".services-grid .service-card",
        ".case-study-grid .case-study-card",
        ".why-grid .why-card",
        ".stack-grid .stack-item",
        ".skills-list span",
        ".trust-grid .trust-item"
    ];


    cardGroups.forEach(selector => {

        const items =
            document.querySelectorAll(selector);

        items.forEach((item, index) => {

            item.style.transitionDelay =
                `${index * 80}ms`;

        });

    });



    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual) {

        let ticking = false;


        const updateHeroParallax = () => {

            const scrollY =
                window.scrollY;

            if (scrollY < window.innerHeight) {

                const movement =
                    scrollY * 0.12;

                heroVisual.style.transform =
                    `translate3d(0, ${movement}px, 0)`;

            }

            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateHeroParallax
                    );

                    ticking = true;

                }

            },
            { passive: true }
        );

    }



    /* =====================================================
       HERO ORB MOUSE MOVEMENT
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroCore =
        document.querySelector(".hero-core");

    const heroOrb =
        document.querySelector(".hero-orb");


    if (
        hero &&
        heroCore &&
        heroOrb &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                heroCore.style.transform =
                    `translate(${x * 15}px, ${y * 15}px)`;


                heroOrb.style.transform =
                    `translate(${x * -20}px, ${y * -20}px)`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroCore.style.transform =
                    "";

                heroOrb.style.transform =
                    "";

            }
        );

    }



    /* =====================================================
       PROJECT CARD TILT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(pointer: fine)"
                    ).matches
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) * -3;

                const rotateY =
                    ((x / rect.width) - 0.5) * 3;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });



    /* =====================================================
       SERVICE CARD HOVER ICON
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(card => {

        const icon =
            card.querySelector(
                ".service-top > i"
            );


        if (!icon) return;


        card.addEventListener(
            "mouseenter",
            () => {

                icon.style.transform =
                    "rotate(-8deg) scale(1.08)";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                icon.style.transform =
                    "";

            }
        );

    });



    /* =====================================================
       PROJECT SCREENSHOT GALLERY
    ===================================================== */

    const projectGalleries =
        document.querySelectorAll(".project-gallery");

    projectGalleries.forEach(gallery => {

        const galleryMainImage =
            gallery.querySelector(".project-gallery-main img");

        const galleryThumbs =
            gallery.querySelectorAll(".gallery-thumb[data-gallery-image]");

        galleryThumbs.forEach(thumb => {

            thumb.addEventListener("click", () => {

                if (!galleryMainImage) return;

                const image =
                    thumb.getAttribute("data-gallery-image");

                if (!image) return;

                galleryMainImage.src = image;

                galleryThumbs.forEach(
                    item => item.classList.remove("active")
                );

                thumb.classList.add("active");

            });

        });

    });



    /* =====================================================
       COPY EMAIL
    ===================================================== */

    const emailLinks =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailLinks.forEach(link => {

        link.addEventListener(
            "contextmenu",
            () => {

                const email =
                    link
                        .getAttribute("href")
                        .replace(
                            "mailto:",
                            ""
                        );

                if (
                    navigator.clipboard &&
                    email
                ) {

                    navigator.clipboard
                        .writeText(email)
                        .catch(() => {});

                }

            }
        );

    });



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            '.footer-bottom a[href="#home"]'
        );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        new Date().getFullYear();

    const footerText =
        document.querySelector(
            ".footer-bottom span"
        );


    if (
        footerText &&
        footerText.textContent.includes("2026")
    ) {

        footerText.textContent =
            footerText.textContent.replace(
                "2026",
                year
            );

    }



    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .project-link"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "button-ripple";


                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                button.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });



    /* =====================================================
       REDUCED MOTION SUPPORT
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }



    /* =====================================================
       CONSOLE BRAND MESSAGE
    ===================================================== */

    console.log(
        "%c ZAIN UL ABEDIN ",
        "background:#2563eb;color:white;" +
        "font-size:16px;font-weight:700;" +
        "padding:8px 14px;border-radius:6px;"
    );

    console.log(
        "%c Full-Stack Developer | AI/ML | Data Analysis ",
        "color:#2563eb;font-size:13px;"
    );

});

async function sendMessageToBot(message, sessionId) {
    try {
        const response = await fetch("https://zainn8n98.app.n8n.cloud/webhook/client-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                sessionId: sessionId
            })
        });

        if (!response.ok) {
            throw new Error("Failed to connect with chatbot");
        }

        const data = await response.json();

        return data.reply;

    } catch (error) {
        console.error("Chatbot Error:", error);
        return "Maazrat, abhi chatbot se connection nahi ho saka. Thori der baad try karein.";
    }
}

/* =========================================
   PREMIUM AI CHATBOT FUNCTIONALITY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotBox = document.getElementById("chatbot-box");
    const chatbotClose = document.getElementById("chatbot-close");

    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotMessages = document.getElementById("chatbot-messages");

    const suggestions = document.querySelectorAll(".chat-suggestion");


    /* =========================================
       SESSION ID
    ========================================= */

    let sessionId = localStorage.getItem("zain_chat_session");

    if (!sessionId) {

        sessionId =
            "zain-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 10);

        localStorage.setItem(
            "zain_chat_session",
            sessionId
        );
    }


    /* =========================================
       OPEN CHATBOT
    ========================================= */

    chatbotToggle.addEventListener("click", () => {

        chatbotBox.classList.add("active");

        chatbotBox.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(() => {
            chatbotInput.focus();
        }, 250);

    });


    /* =========================================
       CLOSE CHATBOT
    ========================================= */

    chatbotClose.addEventListener("click", () => {

        chatbotBox.classList.remove("active");

        chatbotBox.setAttribute(
            "aria-hidden",
            "true"
        );

    });


    /* =========================================
       SEND MESSAGE
    ========================================= */

    async function handleSendMessage(message = null) {

        const text =
            message !== null
                ? message.trim()
                : chatbotInput.value.trim();


        // Don't send empty messages
        if (!text) return;


        // Clear input
        chatbotInput.value = "";


        // Add user's message
        addUserMessage(text);


        // Scroll to bottom
        scrollChat();


        // Show typing indicator
        const typingElement =
            showTypingIndicator();


        try {

            // Send message to n8n
            const reply =
                await sendMessageToBot(
                    text,
                    sessionId
                );


            // Remove typing indicator
            removeTypingIndicator(
                typingElement
            );


            // Show bot response
            addBotMessage(reply);


            // Scroll again
            scrollChat();


        } catch (error) {

            console.error(
                "Chatbot error:",
                error
            );


            removeTypingIndicator(
                typingElement
            );


            addBotMessage(
                "Maazrat, abhi connection mein masla aa raha hai. Please thori der baad try karein."
            );

        }

    }


    /* =========================================
       SEND BUTTON
    ========================================= */

    chatbotSend.addEventListener(
        "click",
        () => {
            handleSendMessage();
        }
    );


    /* =========================================
       ENTER KEY
    ========================================= */

    chatbotInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                handleSendMessage();

            }

        }
    );


    /* =========================================
       QUICK SUGGESTIONS
    ========================================= */

    suggestions.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const message =
                        button.dataset.message;

                    handleSendMessage(
                        message
                    );

                }
            );

        }
    );


    /* =========================================
       ADD USER MESSAGE
    ========================================= */

    function addUserMessage(text) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "chat-message user-message-wrapper";


        const message =
            document.createElement("div");

        message.className =
            "user-message";


        message.textContent = text;


        wrapper.appendChild(message);


        chatbotMessages.appendChild(
            wrapper
        );

    }


    /* =========================================
       ADD BOT MESSAGE
    ========================================= */

    function addBotMessage(text) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "chat-message bot-message-wrapper";


        const avatar =
            document.createElement("div");

        avatar.className =
            "message-avatar";

        avatar.textContent = "Z";


        const content =
            document.createElement("div");

        content.className =
            "message-content";


        const sender =
            document.createElement("div");

        sender.className =
            "message-sender";

        sender.textContent =
            "AI Assistant";


        const message =
            document.createElement("div");

        message.className =
            "bot-message";

        message.textContent =
            text;


        const time =
            document.createElement("div");

        time.className =
            "message-time";

        time.textContent =
            "Just now";


        content.appendChild(sender);
        content.appendChild(message);
        content.appendChild(time);


        wrapper.appendChild(avatar);
        wrapper.appendChild(content);


        chatbotMessages.appendChild(
            wrapper
        );

    }


    /* =========================================
       TYPING INDICATOR
    ========================================= */

    function showTypingIndicator() {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "chat-message bot-message-wrapper";


        const avatar =
            document.createElement("div");

        avatar.className =
            "message-avatar";

        avatar.textContent = "Z";


        const content =
            document.createElement("div");

        content.className =
            "message-content";


        const typing =
            document.createElement("div");

        typing.className =
            "bot-message typing-indicator";


        typing.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;


        content.appendChild(typing);

        wrapper.appendChild(avatar);
        wrapper.appendChild(content);

        chatbotMessages.appendChild(
            wrapper
        );


        scrollChat();


        return wrapper;

    }


    /* =========================================
       REMOVE TYPING INDICATOR
    ========================================= */

    function removeTypingIndicator(
        element
    ) {

        if (
            element &&
            element.parentNode
        ) {

            element.remove();

        }

    }


    /* =========================================
       AUTO SCROLL
    ========================================= */

    function scrollChat() {

        setTimeout(() => {

            chatbotMessages.scrollTop =
                chatbotMessages.scrollHeight;

        }, 50);

    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                chatbotBox.classList.contains(
                    "active"
                )
            ) {

                chatbotBox.classList.remove(
                    "active"
                );

                chatbotBox.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }

        }
    );

});
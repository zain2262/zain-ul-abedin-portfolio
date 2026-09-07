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
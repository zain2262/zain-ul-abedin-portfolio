/* =========================================================
   ZAIN UL ABEDIN
   PREMIUM PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", function () {

        if (!header) return;

        if (window.scrollY > 40) {
            header.style.paddingTop = "10px";
        } else {
            header.style.paddingTop = "18px";
        }

    });


    /* =====================================================
       HERO 3D MOUSE EFFECT
    ===================================================== */

    const hero = document.querySelector(".hero-visual");

    if (hero) {

        const orb = hero.querySelector(".hero-orb");
        const core = hero.querySelector(".hero-core");
        const rings = hero.querySelectorAll(".hero-ring");
        const tags = hero.querySelectorAll(".floating-tech");


        hero.addEventListener("mousemove", function (event) {

            if (window.innerWidth < 768) return;

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            const rotateX = y * -10;
            const rotateY = x * 12;


            /* ORB */

            if (orb) {

                orb.style.transform =
                    "translateZ(30px) " +
                    "rotateX(" + rotateX * 0.4 + "deg) " +
                    "rotateY(" + rotateY * 0.4 + "deg)";
            }


            /* CORE */

            if (core) {

                core.style.transform =
                    "translateZ(120px) " +
                    "rotateX(" + rotateX + "deg) " +
                    "rotateY(" + rotateY + "deg)";
            }


            /* RINGS */

            rings.forEach(function (ring, index) {

                const amount = index + 1;

                ring.style.transform =
                    "rotateX(" +
                    (65 + rotateX * amount * 0.15) +
                    "deg) rotateY(" +
                    (rotateY * amount * 0.15) +
                    "deg)";

            });


            /* FLOATING TAGS */

            tags.forEach(function (tag, index) {

                const strength = (index + 1) * 8;

                tag.style.transform =
                    "translate(" +
                    x * strength +
                    "px, " +
                    y * strength +
                    "px)";

            });

        });


        /* RESET */

        hero.addEventListener("mouseleave", function () {

            if (orb) {
                orb.style.transform =
                    "translateZ(30px)";
            }

            if (core) {
                core.style.transform =
                    "translateZ(120px)";
            }

            rings.forEach(function (ring, index) {

                if (index === 0) {
                    ring.style.transform =
                        "rotateX(65deg) rotateZ(-15deg)";
                }

                if (index === 1) {
                    ring.style.transform =
                        "rotateX(65deg) rotateY(20deg)";
                }

                if (index === 2) {
                    ring.style.transform =
                        "rotateY(65deg)";
                }

            });

            tags.forEach(function (tag) {
                tag.style.transform = "";
            });

        });

    }


    /* =====================================================
       CARD 3D TILT
    ===================================================== */

    const cards = document.querySelectorAll(
        ".service-card, .why-card"
    );


    cards.forEach(function (card) {

        card.addEventListener("mousemove", function (event) {

            if (window.innerWidth < 768) return;

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;


            const rotateX = (0.5 - y) * 5;
            const rotateY = (x - 0.5) * 7;


            card.style.transform =
                "perspective(1000px) " +
                "rotateX(" + rotateX + "deg) " +
                "rotateY(" + rotateY + "deg) " +
                "translateY(-8px)";

        });


        card.addEventListener("mouseleave", function () {

            card.style.transform = "";

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-header, " +
        ".service-card, " +
        ".project-card, " +
        ".why-card, " +
        ".about-content, " +
        ".about-details, " +
        ".skills-list, " +
        ".contact-intro, " +
        ".contact-details"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "reveal-active"
                    );

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );


    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const id =
                link.getAttribute("href");

            if (!id || id === "#") return;

            const target =
                document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        );


    if ("IntersectionObserver" in window) {

        const navObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.getAttribute("id");


                        navLinks.forEach(function (link) {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute("href") ===
                                "#" + id
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    threshold: 0.35
                }
            );


        sections.forEach(function (section) {

            navObserver.observe(section);

        });

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .nav-cta"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "mousemove",
            function (event) {

                if (window.innerWidth < 768) {
                    return;
                }

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    "translate(" +
                    x * 0.06 +
                    "px, " +
                    y * 0.06 +
                    "px)";

            }
        );


        button.addEventListener(
            "mouseleave",
            function () {

                button.style.transform = "";

            }
        );

    });


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const year =
        document.querySelector("#year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "Zain Ul Abedin Portfolio Loaded Successfully."
    );

});


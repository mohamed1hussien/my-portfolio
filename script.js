
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ========================================
       1. MOBILE NAVIGATION
    ======================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }

    function openMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.add("open");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("menu-open");
    }

    if (menuToggle && navLinks) {
        // Make the menu button accessible.
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navLinks.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close the menu after selecting a navigation link.
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        // Close the menu when clicking outside it.
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        // Close the menu using the Escape key.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close the mobile menu when returning to desktop layout.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }


    /* ========================================
       2. AUTOMATIC FOOTER YEAR
    ======================================== */

    const currentYear = new Date().getFullYear();

    const yearSelectors = [
        "#year",
        ".current-year"
    ];

    yearSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = currentYear;
        });
    });


    /* ========================================
       3. SMOOTH SCROLL
    ======================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            // Ignore empty links.
            if (!targetId || targetId === "#") return;

            let targetElement;

            try {
                targetElement = document.querySelector(targetId);
            } catch {
                return;
            }

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            // Keep the URL hash in sync with the selected section.
            if (history.replaceState) {
                history.replaceState(null, "", targetId);
            }
        });
    });


    /* ========================================
       4. REVEAL ELEMENTS ON SCROLL
    ======================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .project-card, .skill-category, .skill-card"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");

                        // Support the older class name as well.
                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible", "visible");
        });
    }


    /* ========================================
       5. HERO TYPING EFFECT
    ======================================== */

    const typingElement = document.querySelector("#type");

    if (typingElement) {
        const phrases = [
            "AI Automation Specialist",
            "n8n Workflow Developer",
            "AI Agent Builder",
            "API Integration Specialist"
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;
        let typingTimer;

        const typingCursor = document.querySelector(".cursor");

        // Avoid running the animation when reduced motion is preferred.
        if (prefersReducedMotion) {
            typingElement.textContent = phrases[0];

            if (typingCursor) {
                typingCursor.style.display = "none";
            }
        } else {
            function typeEffect() {
                const currentPhrase = phrases[phraseIndex];

                if (deleting) {
                    characterIndex--;
                } else {
                    characterIndex++;
                }

                typingElement.textContent = currentPhrase.substring(
                    0,
                    characterIndex
                );

                let delay = deleting ? 35 : 75;

                // Pause when the full phrase is visible.
                if (
                    !deleting &&
                    characterIndex === currentPhrase.length
                ) {
                    deleting = true;
                    delay = 1600;
                }

                // Move to the next phrase after deleting.
                else if (deleting && characterIndex === 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    delay = 350;
                }

                typingTimer = window.setTimeout(typeEffect, delay);
            }

            typeEffect();

            // Pause typing while the browser tab is hidden.
            document.addEventListener("visibilitychange", () => {
                if (document.hidden) {
                    window.clearTimeout(typingTimer);
                } else {
                    window.clearTimeout(typingTimer);
                    typingTimer = window.setTimeout(typeEffect, 250);
                }
            });
        }
    }


    /* ========================================
       6. ACTIVE NAVIGATION ON SCROLL
    ======================================== */

    const sections = document.querySelectorAll(
        "main section[id], section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window && sections.length > 0) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;

                        navigationLinks.forEach((link) => {
                            const isActive =
                                link.getAttribute("href") === `#${sectionId}`;

                            link.classList.toggle("active", isActive);

                            if (isActive) {
                                link.setAttribute("aria-current", "location");
                            } else {
                                link.removeAttribute("aria-current");
                            }
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    /* ========================================
       7. PROJECT LINKS SAFETY
    ======================================== */

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        const relValues = new Set(
            (link.getAttribute("rel") || "")
                .split(/\s+/)
                .filter(Boolean)
        );

        relValues.add("noopener");
        relValues.add("noreferrer");

        link.setAttribute("rel", [...relValues].join(" "));
    });


    /* ========================================
       8. INITIALIZE PORTFOLIO
    ======================================== */

    console.log(
        "Mohamed Hussien | AI Automation Portfolio Loaded Successfully"
    );
});


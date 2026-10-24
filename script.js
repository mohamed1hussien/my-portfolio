
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.classList.toggle("active", isOpen);
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside it
        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Update Footer Year Automatically
    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Reveal Elements on Scroll
    const revealElements = document.querySelectorAll(
        ".reveal, .project-card, .skill-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Typing Effect for Hero Section
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

            let delay = deleting ? 45 : 85;

            if (!deleting && characterIndex === currentPhrase.length) {
                deleting = true;
                delay = 1500;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 400;
            }

            setTimeout(typeEffect, delay);
        }

        typeEffect();
    }

    // Set Current Year if the Footer Uses Another Selector
    const footerYear = document.querySelector(".current-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // Console Message
    console.log("Mohamed Hussien | AI Automation Portfolio Loaded Successfully");
});


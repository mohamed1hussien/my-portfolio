/* =========================================================
   MOHAMED HUSSIEN — PORTFOLIO INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-links .nav-link");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ==================== MOBILE MENU ==================== */

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.add("open");
    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    document.body.classList.add("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      if (navLinks.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  /* ==================== FOOTER YEAR ==================== */

  const year = String(new Date().getFullYear());

  document.querySelectorAll("#year, .current-year").forEach((element) => {
    element.textContent = year;
  });

  /* ==================== SMOOTH SCROLL ==================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.getElementById(targetId.slice(1));

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

      if (history.replaceState) {
        history.replaceState(null, "", targetId);
      }
    });
  });

  /* ==================== REVEAL ON SCROLL ==================== */

  const revealElements = document.querySelectorAll(
    ".reveal, .project-card, .skill-category, .skill-card"
  );

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      if (element.classList.contains("reveal")) {
        element.style.transitionDelay =
          `${Math.min(index % 4, 3) * 55}ms`;
      }

      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* ==================== TYPING EFFECT ==================== */

  const typingElement = document.getElementById("type");
  const typingCursor = document.querySelector(".typing-cursor");

  if (typingElement) {
    const phrases = [
      "AI Automation Specialist",
      "n8n Workflow Developer",
      "AI Agent Builder",
      "API Integration Specialist"
    ];

    if (prefersReducedMotion) {
      typingElement.textContent = phrases[0];

      if (typingCursor) {
        typingCursor.hidden = true;
      }
    } else {
      let phraseIndex = 0;
      let charIndex = phrases[0].length;
      let deleting = false;
      let timer = null;
      let paused = false;

      function tick() {
        if (paused) return;

        const phrase = phrases[phraseIndex];

        if (deleting) {
          charIndex--;
        } else {
          charIndex++;
        }

        typingElement.textContent = phrase.slice(0, charIndex);

        let delay = deleting ? 30 : 62;

        if (!deleting && charIndex >= phrase.length) {
          deleting = true;
          delay = 1450;
        } else if (deleting && charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 280;
        }

        timer = window.setTimeout(tick, delay);
      }

      timer = window.setTimeout(() => {
        deleting = true;
        tick();
      }, 1700);

      document.addEventListener("visibilitychange", () => {
        paused = document.hidden;

        window.clearTimeout(timer);

        if (!paused) {
          timer = window.setTimeout(tick, 300);
        }
      });
    }
  }

  /* ==================== ACTIVE NAVIGATION ==================== */

  const sections = document.querySelectorAll("main section[id]");

  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navItems.length
  ) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navItems.forEach((link) => {
            const active =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", active);

            if (active) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* ==================== EXTERNAL LINKS ==================== */

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const rel = new Set(
      (link.getAttribute("rel") || "")
        .split(/\s+/)
        .filter(Boolean)
    );

    rel.add("noopener");
    rel.add("noreferrer");

    link.setAttribute("rel", [...rel].join(" "));
  });

  /* ==================== INITIALIZATION ==================== */

  console.info("Mohamed Hussien | Portfolio ready");
});

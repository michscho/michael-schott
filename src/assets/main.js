      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

      // Preloader
      window.addEventListener("load", () => {
        const preloader = document.getElementById("preloader");
        const delay = prefersReducedMotion ? 150 : 1200;
        setTimeout(() => {
          preloader?.classList.add("hidden");
        }, delay);
      });

      // Dynamic footer year
      const currentYear = document.getElementById("currentYear");
      if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
      }

      // Cursor Glow Effect
      const cursorGlow = document.getElementById("cursorGlow");
      if (!prefersReducedMotion && !hasCoarsePointer && cursorGlow) {
        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        document.addEventListener("mousemove", (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        const animateCursor = () => {
          glowX += (mouseX - glowX) * 0.1;
          glowY += (mouseY - glowY) * 0.1;
          cursorGlow.style.left = `${glowX}px`;
          cursorGlow.style.top = `${glowY}px`;
          requestAnimationFrame(animateCursor);
        };

        animateCursor();
      }

      // Generate Particles
      const particlesContainer = document.getElementById("particles");
      if (!prefersReducedMotion && particlesContainer) {
        const particleCount = 24;
        const colors = ["#f97316", "#f59e0b", "#22c55e", "#06b6d4"];
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
          particle.style.animationDelay = `${Math.random() * 10}s`;
          particle.style.opacity = String(Math.random() * 0.5 + 0.2);
          particle.style.background =
            colors[Math.floor(Math.random() * colors.length)];
          particlesContainer.appendChild(particle);
        }
      }

      // Navigation scroll effect
      const navbar = document.getElementById("navbar");
      window.addEventListener("scroll", () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 50);
      });

      // Mobile Menu Toggle
      const menuToggle = document.getElementById("menuToggle");
      const navLinks = document.getElementById("navLinks");
      const setMenuState = (isOpen) => {
        menuToggle?.classList.toggle("active", isOpen);
        navLinks?.classList.toggle("active", isOpen);
        menuToggle?.setAttribute("aria-expanded", String(isOpen));
      };

      menuToggle?.addEventListener("click", () => {
        const isOpen = !menuToggle.classList.contains("active");
        setMenuState(isOpen);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setMenuState(false);
        }
      });

      // Close mobile menu when clicking a link
      navLinks?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
      });

      // Smooth scroll for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const targetSelector = this.getAttribute("href");
          if (!targetSelector) return;
          const target = document.querySelector(targetSelector);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        });
      });

      // Counter Animation
      const counters = document.querySelectorAll(".counter");
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-target"), 10);
            const duration = prefersReducedMotion ? 300 : 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.textContent = String(Math.ceil(current));
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = String(target);
              }
            };

            updateCounter();
            counterObserver.unobserve(counter);
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach((counter) => counterObserver.observe(counter));

      // Scroll Reveal Animations
      const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale, .timeline-item"
      );
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );
      revealElements.forEach((el) => revealObserver.observe(el));

      // Typing Effect Rotation
      const typingTexts = [
        "Frontend Engineer",
        "AWS Certified Solutions Architect",
        "Rust & Blockchain Developer",
        "DevOps & CI/CD Expert",
        "GenAI & RAG Specialist",
      ];
      let textIndex = 0;
      const typingElement = document.querySelector(".typing-text");
      if (typingElement && !prefersReducedMotion) {
        setInterval(() => {
          textIndex = (textIndex + 1) % typingTexts.length;
          typingElement.style.animation = "none";
          typingElement.offsetHeight;
          typingElement.textContent = typingTexts[textIndex];
          typingElement.style.animation =
            "typing 3s steps(30) infinite, blinkCaret 0.75s step-end infinite";
        }, 4000);
      }

      // Parallax Effect on Orbs
      if (!prefersReducedMotion && !hasCoarsePointer) {
        document.addEventListener("mousemove", (e) => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
          document.querySelectorAll(".orb").forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            orb.style.transform = `translate(${moveX * speed}px, ${
              moveY * speed
            }px)`;
          });
        });
      }

      // Active navigation state for multipage structure.
      const pageRoutes = {
        home: "/index.html",
        about: "/about.html",
        skills: "/skills.html",
        experience: "/experience.html",
        projects: "/projects.html",
        education: "/education.html",
        contact: "/contact.html",
      };
      const currentPage = document.body?.dataset.page;
      const route = currentPage ? pageRoutes[currentPage] : null;
      if (route) {
        document
          .querySelectorAll(".nav-links a")
          .forEach((link) =>
            link.classList.toggle("active", link.getAttribute("href") === route)
          );
      }

      // Skill Tags Hover Effect
      if (!hasCoarsePointer) {
        document.querySelectorAll(".skill-tag").forEach((tag) => {
          tag.addEventListener("mouseenter", function () {
            this.style.transform = `translateY(-3px) rotate(${
              Math.random() * 4 - 2
            }deg)`;
          });
          tag.addEventListener("mouseleave", function () {
            this.style.transform = "";
          });
        });
      }

      // Project Cards 3D Tilt Effect
      if (!prefersReducedMotion && !hasCoarsePointer) {
        document.querySelectorAll(".project-card").forEach((card) => {
          card.addEventListener("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
          });

          card.addEventListener("mouseleave", function () {
            this.style.transform = "";
          });
        });
      }

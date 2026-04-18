gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// Lenis Smooth Scroll (CORRECT SYNC)
// ─────────────────────────────────────────────

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  smoothTouch: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ─────────────────────────────────────────────
// HERO TITLE (SAFE SPLIT, KEEPS INNER SPANS)
// ─────────────────────────────────────────────

const titleEl = document.querySelector(".hero-title");

if (titleEl) {
  const nodes = Array.from(titleEl.childNodes);
  titleEl.innerHTML = "";

  const chars = [];

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split("").forEach((c) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.style.whiteSpace = "pre";
        span.textContent = c === " " ? "\u00A0" : c;
        titleEl.appendChild(span);
        chars.push(span);
      });
    } else {
      titleEl.appendChild(node);
    }
  });

  gsap.from(chars, {
    opacity: 0,
    y: 40,
    stagger: 0.018,
    duration: 1.2,
    ease: "power3.out",
  });
}

// ─────────────────────────────────────────────
// NAV ANIMATION (ONCE)
// ─────────────────────────────────────────────

gsap.from("nav", {
  y: -60,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
});

// ─────────────────────────────────────────────
// HERO CONTENT
// ─────────────────────────────────────────────

gsap.from(".hero_section p", {
  y: 30,
  opacity: 0,
  duration: 0.7,
  delay: 0.2,
  ease: "power2.out",
});

gsap.from(".hero_section .hero-buttons button", {
  scale: 0.92,
  opacity: 0,
  stagger: 0.12,
  duration: 0.6,
  delay: 0.35,
  ease: "back.out(1.4)",
});

gsap.from(".hero_section .bg-secondary-container", {
  y: 20,
  opacity: 0,
  stagger: 0.06,
  duration: 0.5,
  delay: 0.5,
});

// ─────────────────────────────────────────────
// FLOATING ELEMENTS
// ─────────────────────────────────────────────

document.querySelectorAll(".hero_section .z-20").forEach((el, i) => {
  gsap.to(el, {
    y: -12,
    repeat: -1,
    yoyo: true,
    duration: 2.4,
    ease: "sine.inOut",
    delay: i * 0.3,
  });
});

// ─────────────────────────────────────────────
// PARALLAX GLOW
// ─────────────────────────────────────────────

gsap.to(".glow-bg", {
  y: 160,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
});

// ─────────────────────────────────────────────
// GLOBAL SCROLL ANIMATIONS (SAFE PATTERN)
// ─────────────────────────────────────────────

window.addEventListener("load", () => {
  ScrollTrigger.refresh();

  // TECH STACK
  gsap.utils.toArray(".tech_stack_section .group").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  // PROJECT CARDS
  gsap.utils.toArray(".project-card").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  // CONTACT SECTION
  gsap.utils.toArray(".contact_me_section > *").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact_me_section",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  // HEADINGS
  document
    .querySelectorAll(".tech_stack_section h1, .projects_section h1, .contact_me_section h1")
    .forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });
    });
});

// ─────────────────────────────────────────────
// CURSOR GLOW (SMOOTH LERP)
// ─────────────────────────────────────────────

const glow = document.getElementById("cursor-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

gsap.ticker.add(() => {
  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;

  gsap.set(glow, {
    x: currentX,
    y: currentY,
    force3D: true,
  });
});

// ─────────────────────────────────────────────
// NAVBAR SMOOTH SCROLL (LENIS)
// ─────────────────────────────────────────────

document.querySelectorAll("a[data-scroll]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.getAttribute("data-scroll");
    const target = document.getElementById(id);

    if (!target) return;

    lenis.scrollTo(target, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  });
});
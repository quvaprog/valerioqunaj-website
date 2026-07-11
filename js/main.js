/* ============ i18n ============ */
const translations = {
  en: {
    "nav.story": "Story",
    "nav.connect": "Connect",
    "hero.tagline1": "Building apps & brands that",
    "hero.tagline2": "actually help society.",
    "hero.cta": "Get LOCK-IN",
    "hero.cta2": "Follow the journey",
    "stats.sold": "items sold with my first brand",
    "stats.age": "years old when I started",
    "stats.mission": "mission: tech that does good",
    "lockin.eyebrow": "Now building",
    "lockin.desc": "Removes short-form videos from your social feeds. Take your attention back.",
    "lockin.chip1": "No Reels",
    "lockin.chip2": "No Shorts",
    "lockin.chip3": "No doomscrolling",
    "lockin.cta": "Get the app",
    "story.title": "The story",
    "story.one": "Built a clothing brand from my bedroom — 10,000+ items sold.",
    "story.two": "Building LOCK-IN — helping people beat their phone addiction.",
    "connect.title": "Let's connect",
    "connect.sub": "I share the whole journey — wins, fails, numbers.",
    "connect.mail": "Email",
    "footer.motto": "Building things that actually help.",
  },
  de: {
    "nav.story": "Story",
    "nav.connect": "Kontakt",
    "hero.tagline1": "Ich baue Apps & Brands, die",
    "hero.tagline2": "der Gesellschaft wirklich helfen.",
    "hero.cta": "LOCK-IN holen",
    "hero.cta2": "Journey verfolgen",
    "stats.sold": "verkaufte Artikel mit meiner ersten Brand",
    "stats.age": "Jahre alt, als ich anfing",
    "stats.mission": "Mission: Tech, das Gutes tut",
    "lockin.eyebrow": "Aktuelles Projekt",
    "lockin.desc": "Entfernt Kurzvideos aus deinen Social Feeds. Hol dir deine Aufmerksamkeit zurück.",
    "lockin.chip1": "Keine Reels",
    "lockin.chip2": "Keine Shorts",
    "lockin.chip3": "Kein Doomscrolling",
    "lockin.cta": "App holen",
    "story.title": "Die Story",
    "story.one": "Mit 16 eine Kleidermarke aufgebaut — über 10.000 verkaufte Artikel.",
    "story.two": "Ich baue LOCK-IN — und helfe Menschen, ihre Handysucht zu besiegen.",
    "connect.title": "Lass uns connecten",
    "connect.sub": "Ich teile die ganze Journey — Wins, Fails, Zahlen.",
    "connect.mail": "E-Mail",
    "footer.motto": "Ich baue Dinge, die wirklich helfen.",
  },
};

function setLanguage(lang) {
  const dict = translations[lang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  localStorage.setItem("lang", lang);
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

setLanguage(localStorage.getItem("lang") || "en");

/* ============ Hero letter stagger ============ */
document.querySelectorAll(".hero-name .line").forEach((line, lineIndex) => {
  const letters = line.textContent.split("");
  line.textContent = "";
  letters.forEach((letter, i) => {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = letter;
    span.style.animationDelay = `${lineIndex * 0.25 + i * 0.045}s`;
    line.appendChild(span);
  });
});

/* ============ Scroll reveals ============ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom")
  .forEach((el) => observer.observe(el));

/* ============ Hero scroll story (pinned) ============ */
/* The hero section is a 280vh runway with a sticky stage. While it is
   pinned, scroll progress drives the intro: the name splits apart, the
   watermark drifts up and the chips fly out of the portrait one by one. */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hero = document.querySelector(".hero");
const heroFirst = document.getElementById("name-first");
const heroLast = document.getElementById("name-last");
const portraitWrap = document.querySelector(".portrait-wrap");
const watermark = document.querySelector(".hero-watermark");
const scrollHint = document.querySelector(".scroll-hint");
const chips = [...document.querySelectorAll(".fchip")];

const CHIP_TARGETS = [
  { dx: -380, dy: -150, r: -9 },
  { dx: 350, dy: -210, r: 7 },
  { dx: -340, dy: 140, r: -6 },
  { dx: 365, dy: 100, r: 9 },
];
/* On mobile the portrait fills most of the width, so chips get their own
   targets (and render above the photo, see CSS) */
const CHIP_TARGETS_MOBILE = [
  { dx: -130, dy: -170, r: -9 },
  { dx: 135, dy: -205, r: 7 },
  { dx: -125, dy: 95, r: -6 },
  { dx: 135, dy: 170, r: 9 },
];
const CHIP_STAGGER = 0.16; // scroll-progress gap between chips
const CHIP_LENGTH = 0.34; // how much progress one chip's flight takes

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

function heroStory() {
  const runway = hero.offsetHeight - window.innerHeight;
  const p = runway > 0 ? clamp01(window.scrollY / runway) : 1;
  const mobile = window.innerWidth < 720;
  const targets = mobile ? CHIP_TARGETS_MOBILE : CHIP_TARGETS;
  const k = mobile ? 0.5 : 1; // shorter name split on mobile

  const split = easeOut(clamp01(p / 0.85));
  heroFirst.style.transform = `translateX(${-110 * split * k}px)`;
  heroLast.style.transform = `translateX(${110 * split * k}px)`;
  portraitWrap.style.transform = `translateX(-50%) scale(${1 - 0.06 * split})`;
  watermark.style.transform = `translate(-50%, calc(-58% - ${70 * split}px))`;
  scrollHint.style.opacity = 1 - clamp01(p * 2.5);

  chips.forEach((chip, i) => {
    const t = targets[i];
    const e = easeOut(clamp01((p - (0.06 + i * CHIP_STAGGER)) / CHIP_LENGTH));
    chip.style.opacity = e;
    chip.style.transform =
      `translate(calc(-50% + ${t.dx * e}px), calc(-50% + ${t.dy * e}px)) ` +
      `rotate(${t.r * e}deg) scale(${0.6 + 0.4 * e})`;
  });
}

/* Reduced motion: no animation, but keep the design — chips sit statically
   in their final fanned-out positions. */
function setStaticHeroState() {
  const targets = window.innerWidth < 720 ? CHIP_TARGETS_MOBILE : CHIP_TARGETS;
  chips.forEach((chip, i) => {
    const t = targets[i];
    chip.style.opacity = 1;
    chip.style.transform =
      `translate(calc(-50% + ${t.dx}px), calc(-50% + ${t.dy}px)) rotate(${t.r}deg)`;
  });
}

if (prefersReduced) {
  setStaticHeroState();
} else {
  /* rAF loop instead of scroll events — scroll events are throttled or
     delayed in some mobile/in-app browsers, a frame loop is not. */
  let lastY = -1;
  let lastW = -1;
  (function loop() {
    if (window.scrollY !== lastY || window.innerWidth !== lastW) {
      lastY = window.scrollY;
      lastW = window.innerWidth;
      heroStory();
    }
    requestAnimationFrame(loop);
  })();
}

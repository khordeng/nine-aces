// Scroll reveal: ONE IntersectionObserver. Elements with [data-reveal] fade up once.
// The hidden state only exists under html.js (see global.css), so no-JS shows everything.
const MAX_STAGGER = 4; // --i caps at 4 -> 400ms

const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

// Manual delay: data-reveal-delay="<ms>" overrides the stagger index.
for (const el of items) {
  const delay = el.dataset.revealDelay;
  if (delay) el.style.setProperty("--reveal-delay", `${parseInt(delay, 10) || 0}ms`);
  const i = el.style.getPropertyValue("--i");
  if (i && Number(i) > MAX_STAGGER) el.style.setProperty("--i", String(MAX_STAGGER));
}

const reveal = (el: Element) => el.classList.add("is-visible");
const revealAll = () => items.forEach(reveal);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealAll();
} else {
  let observerRan = false;
  try {
    const io = new IntersectionObserver(
      (entries, observer) => {
        observerRan = true;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    // Hero content animates on page load (its delays set the sequence), not on scroll.
    items.forEach((el) => (el.closest("#home") ? reveal(el) : io.observe(el)));
  } catch {
    revealAll();
  }

  // Safety net: 3s after load, if the observer never reported, reveal everything.
  // Elements the observer is tracking normally keep their scroll reveal.
  const fallback = () =>
    window.setTimeout(() => {
      if (!observerRan) revealAll();
    }, 3000);
  if (document.readyState === "complete") fallback();
  else window.addEventListener("load", fallback, { once: true });
}

// A script error elsewhere on the page must never leave content hidden.
window.addEventListener("error", revealAll, { once: true });

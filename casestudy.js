document.addEventListener("DOMContentLoaded", function () {
  // Parallax effect for highlight sections
  document.addEventListener("scroll", function () {
    document
      .querySelectorAll(".highlight-parallax .highlight-bg")
      .forEach((bg) => {
        const rect = bg.parentElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollPercent =
            (windowHeight - rect.top) / (windowHeight + rect.height);
          bg.style.transform = `scale(1.08) translateY(${
            scrollPercent * 100 - 10
          }px)`;
        }
      });
  });

  // Scrollspy — drives both desktop side nav and mobile nav
  const sideLinks = document.querySelectorAll(".scrollspy-nav a");
  const mobileLinks = document.querySelectorAll(".cs-mobilenav a");
  const allLinks = [...sideLinks, ...mobileLinks];

  const sections = Array.from(sideLinks).map((link) =>
    document.querySelector(link.getAttribute("href"))
  );

  function onScrollSpy() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 100;
    let activeIndex = 0;
    sections.forEach((section, i) => {
      if (section && section.offsetTop - offset <= scrollPos) {
        activeIndex = i;
      }
    });
    allLinks.forEach((link, i) => {
      // Both navs have the same link order, use modulo for mobile links
      const idx = i < sideLinks.length ? i : i - sideLinks.length;
      link.classList.toggle("active", idx === activeIndex);
    });
  }

  window.addEventListener("scroll", onScrollSpy);
  window.addEventListener("resize", onScrollSpy);
  onScrollSpy();

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");

  function toggleNav() {
    if (navLinks) navLinks.classList.toggle("show");
    if (hamburger) hamburger.classList.toggle("active");
    if (navOverlay) navOverlay.classList.toggle("show");
  }

  if (hamburger) hamburger.addEventListener("click", toggleNav);
  if (navOverlay) navOverlay.addEventListener("click", toggleNav);

  // Show/hide both navs after scrolling 100px
  const scrollspy = document.querySelector(".scrollspy-nav");
  const mobilenav = document.querySelector(".cs-mobilenav");

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 100;
    if (scrollspy) {
      scrollspy.classList.toggle("show-scrollspy", show);
    }
    if (mobilenav) {
      mobilenav.classList.toggle("show-scrollspy", show);
    }
  });
});

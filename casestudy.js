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

  // Scrollspy
  const spyLinks = document.querySelectorAll(".scrollspy-nav a");
  const sections = Array.from(spyLinks).map((link) =>
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
    spyLinks.forEach((link, i) => {
      link.classList.toggle("active", i === activeIndex);
    });
  }

  window.addEventListener("scroll", onScrollSpy);
  window.addEventListener("resize", onScrollSpy);
  onScrollSpy(); // Run once on page load

  // Show scrollspy-nav after scrolling 100px
  const scrollspy = document.querySelector(".scrollspy-nav");
  if (scrollspy) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollspy.classList.add("show-scrollspy");
      } else {
        scrollspy.classList.remove("show-scrollspy");
      }
    });
  }
});

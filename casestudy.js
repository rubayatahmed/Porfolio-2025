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
    document.querySelector(link.getAttribute("href")),
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

  // Theme toggle support for case study pages
  const THEME_KEY = "casestudy_theme";
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  if (localStorage.getItem(THEME_KEY) === "dark") {
    body.classList.add("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem(
        THEME_KEY,
        body.classList.contains("dark") ? "dark" : "light",
      );
    });
  }

  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  const LIKE_KEY = "casestudy_like_count";
  const LIKE_ACTIVE_KEY = "casestudy_liked";
  let likes = parseInt(localStorage.getItem(LIKE_KEY) || "0", 10);
  const liked = localStorage.getItem(LIKE_ACTIVE_KEY) === "true";

  if (likeBtn && likeCount) {
    likeCount.textContent = likes;
    if (liked) {
      likeBtn.classList.add("liked");
    }

    likeBtn.addEventListener("click", () => {
      if (likeBtn.classList.contains("liked")) {
        likes = Math.max(0, likes - 1);
        likeBtn.classList.remove("liked");
        localStorage.setItem(LIKE_ACTIVE_KEY, "false");
      } else {
        likes += 1;
        likeBtn.classList.add("liked");
        localStorage.setItem(LIKE_ACTIVE_KEY, "true");
      }
      likeCount.textContent = likes;
      localStorage.setItem(LIKE_KEY, likes);
    });
  }

  // Lightbox / zoom viewer for case-study images
  const modal = document.createElement("div");
  modal.className = "case-study-modal";
  modal.innerHTML = `
    <div class="case-study-modal-inner">
      <button class="case-study-modal-close" type="button" aria-label="Close image">×</button>
      <img src="" alt="" />
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector("img");
  const closeModal = () => {
    modal.classList.remove("open");
    modalImage.classList.remove("zoomed");
    document.body.style.overflow = "";
  };

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  modal
    .querySelector(".case-study-modal-close")
    .addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  document.querySelectorAll("img").forEach((img) => {
    if (img.closest(".project-card")) {
      return;
    }

    if (
      !img.closest(".container") &&
      !img.closest(".cs-grid") &&
      !img.closest(".cs-header")
    ) {
      return;
    }

    img.classList.add("case-study-clickable-image");
    img.title = "Click to open";

    img.addEventListener("click", () => {
      modalImage.src = img.src;
      modalImage.alt = img.alt || "Expanded case study image";
      modalImage.classList.remove("zoomed");
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    img.addEventListener("dblclick", () => {
      modalImage.classList.toggle("zoomed");
    });
  });

  // Carousel functionality
  const track = document.querySelector(".carousel-track");
  if (track) {
    const items = Array.from(track.children);
    const nextButton = document.querySelector(".carousel-btn.next");
    const prevButton = document.querySelector(".carousel-btn.prev");

    if (items.length && nextButton && prevButton) {
      let currentIndex = 0;

      const updateCarousel = () => {
        items.forEach((item, index) => {
          const offset = index - currentIndex;
          item.style.transform = `translateX(${offset * 100}%)`;
          item.style.visibility = "visible";
        });
      };

      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
      });

      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
      });

      updateCarousel();
    }
  }
});

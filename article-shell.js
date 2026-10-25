(function () {
  const overlay = document.querySelector(".wipe-overlay");
  let pendingTransition = null;

  function cancelPendingTransition() {
    if (pendingTransition) {
      clearTimeout(pendingTransition);
      pendingTransition = null;
    }
  }

  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const target = new URL(href, window.location.href);
      const isExternal = target.origin !== window.location.origin;
      if (isExternal) {
        window.open(href, "_blank", "noopener,noreferrer");
        event.preventDefault();
        return;
      }

      event.preventDefault();
      cancelPendingTransition();
      requestAnimationFrame(() => {
        if (overlay) overlay.classList.add("active");
      });
      pendingTransition = setTimeout(() => {
        pendingTransition = null;
        window.location.href = href;
      }, 450);
    });
  });

  window.addEventListener("pagehide", cancelPendingTransition);
  window.addEventListener("beforeunload", cancelPendingTransition);

  const likeKey =
    document.currentScript?.dataset.likeKey || "article_like_default";
  const btn = document.getElementById("likeBtn");
  const countEl = document.getElementById("likeCount");

  if (btn && countEl) {
    let state = JSON.parse(localStorage.getItem(likeKey)) || {
      liked: false,
      count: 12,
    };

    function render() {
      countEl.textContent = state.count;
      btn.classList.toggle("liked", state.liked);
      btn.querySelector(".heart").innerHTML = state.liked
        ? "&#9829;"
        : "&#9825;";
    }

    btn.addEventListener("click", function () {
      state.liked = !state.liked;
      state.count += state.liked ? 1 : -1;
      localStorage.setItem(likeKey, JSON.stringify(state));
      render();
    });

    render();
  }

  const sideLinks = document.querySelectorAll(
    ".scrollspy-nav a, .article-sidenav a",
  );
  const mobileLinks = document.querySelectorAll(
    ".cs-mobilenav a, .article-mobilenav a",
  );
  const allLinks = [...sideLinks, ...mobileLinks];

  if (sideLinks.length) {
    const sectionIds = [
      ...new Set([...sideLinks].map((a) => a.getAttribute("href").slice(1))),
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    function onScroll() {
      let current = 0;
      const offset = 120;
      sections.forEach((sec, i) => {
        if (sec.getBoundingClientRect().top - offset <= 0) {
          current = i;
        }
      });
      allLinks.forEach((link) => {
        const href = link.getAttribute("href").slice(1);
        link.classList.toggle("active", href === sectionIds[current]);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const THEME_KEY = "article_theme";
  const body = document.body;
  const toggle = document.getElementById("themeToggle");

  if (toggle) {
    if (localStorage.getItem(THEME_KEY) === "light") {
      body.classList.add("light");
    }

    toggle.addEventListener("click", function () {
      body.classList.toggle("light");
      localStorage.setItem(
        THEME_KEY,
        body.classList.contains("light") ? "light" : "dark",
      );
    });
  }

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");

  if (hamburger) {
    function toggleNav() {
      if (navLinks) navLinks.classList.toggle("show");
      hamburger.classList.toggle("active");
      if (navOverlay) navOverlay.classList.toggle("show");
    }

    hamburger.addEventListener("click", toggleNav);
    if (navOverlay) navOverlay.addEventListener("click", toggleNav);
  }
})();

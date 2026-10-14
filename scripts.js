// Function to apply the magnetic effect
document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; // Calculate x relative to button center
    const y = e.clientY - rect.top - rect.height / 2; // Calculate y relative to button center

    // Apply a small translation
    button.style.transform = `translate(${x * 0.7}px, ${y * 0.7}px)`;
  });

  // Reset the button position when the mouse leaves
  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

// Function to open hamburger
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navOverlay = document.querySelector(".nav-overlay");

function toggleNav() {
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("active");
  if (navOverlay) navOverlay.classList.toggle("show");
}

hamburger.addEventListener("click", toggleNav);
if (navOverlay) navOverlay.addEventListener("click", toggleNav);

// Disable `bentoMove` behaviour on small screens (mobile view)
const updateBentoMoveForViewport = () => {
  try {
    const vw = window.innerWidth || document.documentElement.clientWidth;
    document.querySelectorAll(".bentoMove").forEach((el) => {
      // mark elements that originally had the class so we can restore it later
      if (vw <= 480) {
        if (!el.dataset._hadBentoMove) el.dataset._hadBentoMove = "1";
        el.classList.remove("bentoMove");
      } else {
        if (el.dataset._hadBentoMove === "1") {
          el.classList.add("bentoMove");
          delete el.dataset._hadBentoMove;
        }
      }
    });
  } catch (e) {}
};

// initialize and keep in sync on resize (throttled via RAF)
let _bmResizeRaf = null;
window.addEventListener("resize", () => {
  if (_bmResizeRaf) cancelAnimationFrame(_bmResizeRaf);
  _bmResizeRaf = requestAnimationFrame(() => {
    updateBentoMoveForViewport();
    _bmResizeRaf = null;
  });
});
document.addEventListener("DOMContentLoaded", updateBentoMoveForViewport);
if (document.readyState === "interactive" || document.readyState === "complete")
  updateBentoMoveForViewport();

// Function to apply the magnetic effect to cbrnto boxes
document.querySelectorAll(".bentoMove").forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; // Calculate x relative to button center
    const y = e.clientY - rect.top - rect.height / 2; // Calculate y relative to button center

    // Apply a small translation
    button.style.transform = `translate(${x * 0.04}px, ${y * 0.04}px)`;
  });

  // Reset the button position when the mouse leaves
  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

document
  .querySelectorAll('.bento-item[style*="background-image"]')
  .forEach((item) => {
    item.addEventListener("mousemove", function (e) {
      const rect = item.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // range -10px to 10px
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      item.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
    item.addEventListener("mouseleave", function () {
      item.style.backgroundPosition = "center";
    });
  });

// // Get references to the color pickers
// const color1Picker = document.getElementById("color1");
// const color2Picker = document.getElementById("color2");

// // Function to update the background gradient
// function updateBackground() {
//   const color1 = color1Picker.value;
//   const color2 = color2Picker.value;
//   document.body.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
// }

// // Event listeners for color changes
// color1Picker.addEventListener("input", updateBackground);
// color2Picker.addEventListener("input", updateBackground);

// // Initialize with default colors
// updateBackground();

// Bento box tab switching with animation
document.querySelectorAll(".separator .content").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active from all tabs
    document
      .querySelectorAll(".separator .content")
      .forEach((t) => t.classList.remove("active"));
    // Add active to clicked tab
    tab.classList.add("active");

    const targetId = tab.getAttribute("data-target");
    sessionStorage.setItem("activeTab", targetId);
    document.querySelectorAll(".bentoToggle").forEach((box) => {
      if (box.id === targetId) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });
  });
});

// Restore last active tab, or default to "work"
function restoreLastTab() {
  const savedTab = sessionStorage.getItem("activeTab") || "work";
  const targetBox = document.querySelector(".bentoToggle#" + savedTab);
  if (targetBox) targetBox.classList.add("active");
  const targetTab = document.querySelector(
    '.separator .content[data-target="' + savedTab + '"]',
  );
  if (targetTab) targetTab.classList.add("active");
}
document.addEventListener("DOMContentLoaded", restoreLastTab);
if (document.readyState === "interactive" || document.readyState === "complete")
  restoreLastTab();

// Update event listener to target bento-boxes instead of buttons
document.querySelectorAll(".bento-item").forEach((box) => {
  box.addEventListener("click", function (event) {
    event.preventDefault();

    const templateId = this.getAttribute("data-template");
    const articlesData = this.getAttribute("data-articles");
    const targetUrl = this.getAttribute("data-href");
    const overlay = document.querySelector(".wipe-overlay");

    // If this box has template/content data, do an in-place swap
    if (templateId || articlesData) {
      if (this.dataset.inplaceActive === "true") return;

      // capture the original tile height before we mutate DOM (used for desktop cap)
      try {
        this._origTileHeight = this.getBoundingClientRect().height || 0;
      } catch (e) {
        this._origTileHeight = 0;
      }

      // backup originals
      if (!this._origNodes)
        this._origNodes = Array.from(this.childNodes).map((n) =>
          n.cloneNode(true),
        );
      if (!this._origHtml) this._origHtml = this.innerHTML;
      this.dataset.inplaceActive = "true";

      const inplace = document.createElement("div");
      inplace.className = "inplace-content";
      const defaultEl = this.querySelector(".bento-default");

      const adjustHeight = () => {
        try {
          const vw = window.innerWidth || document.documentElement.clientWidth;
          const maxViewport =
            (window.innerHeight || document.documentElement.clientHeight) - 80;
          if (vw <= 480) {
            // Mobile: keep height auto (allow page to grow to fit content). Lock width briefly to avoid layout jank.
            const rect = this.getBoundingClientRect();
            if (!this._lockedWidth && !this.classList.contains("c2")) {
              this._lockedWidth = rect.width;
              this.style.width = Math.round(this._lockedWidth) + "px";
            } else if (this.classList.contains("c2")) {
              // ensure c2 tiles do not get a locked width on mobile
              this.style.width = "";
            }
            this.style.minHeight = "";
            inplace.style.overflowY = "visible";
          } else {
            // Desktop / larger screens: cap the injected content to the tile's current height minus padding adjustment (2/3 rem)
            // lock parent to its original tile height to prevent growth
            this.style.width = "";
            if (!this.classList.contains("c2") && this._origTileHeight)
              this.style.minHeight = Math.round(this._origTileHeight) + "px";
            const parentH =
              this._origTileHeight ||
              this.clientHeight ||
              this.getBoundingClientRect().height ||
              0;
            const rem =
              parseFloat(getComputedStyle(document.documentElement).fontSize) ||
              16;
            const padAdj = rem * 3.8; // subtract 3.8rem to adjust paddings
            if (parentH)
              inplace.style.maxHeight =
                Math.max(0, Math.round(parentH - padAdj)) + "px";
            inplace.style.overflowY = "auto";
          }
        } catch (e) {}
      };

      const attachLinkHandlers = (root) => {
        const anchors =
          (root.querySelectorAll && root.querySelectorAll("a")) || [];
        anchors.forEach((a) => {
          a.addEventListener("click", (ev) => {
            ev.stopPropagation();
            if (/^https?:\/\//i.test(a.href)) window.open(a.href, "_blank");
            else {
              if (overlay) overlay.classList.add("active");
              setTimeout(() => (window.location.href = a.href), 400);
            }
          });
        });
      };

      if (templateId) {
        const tpl = document.getElementById(templateId);
        if (tpl) {
          const clone = tpl.content.cloneNode(true);
          attachLinkHandlers(clone);
          inplace.appendChild(clone);
          if (defaultEl) defaultEl.classList.add("hidden-default");
          else while (this.firstChild) this.removeChild(this.firstChild);
          this.appendChild(inplace);
          requestAnimationFrame(() => {
            inplace.classList.add("show");
            adjustHeight();
          });
          if (inplace.querySelector && inplace.querySelector(".init-carousel"))
            initSimpleCarousel(inplace.querySelector(".init-carousel"));
        }
      } else {
        const list = document.createElement("ul");
        list.className = "expanded-articles";
        articlesData.split(";").forEach((pair) => {
          const parts = pair.split("|");
          const title = (parts[0] || "").trim();
          const url = (parts[1] || "").trim();
          if (!title) return;
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = url || "#";
          a.textContent = title;
          a.addEventListener("click", (ev) => {
            ev.stopPropagation();
            if (/^https?:\/\//i.test(a.href)) window.open(a.href, "_blank");
            else {
              if (overlay) overlay.classList.add("active");
              setTimeout(() => (window.location.href = a.href), 400);
            }
          });
          li.appendChild(a);
          list.appendChild(li);
        });
        inplace.appendChild(list);
        if (defaultEl) defaultEl.classList.add("hidden-default");
        else while (this.firstChild) this.removeChild(this.firstChild);
        this.appendChild(inplace);
        requestAnimationFrame(() => {
          inplace.classList.add("show");
          adjustHeight();
        });
      }

      const restore = () => {
        if (this.dataset.inplaceActive !== "true") return;
        document.removeEventListener("pointerup", docPointerUp);
        const current = this.querySelector(".inplace-content");
        const finishRestore = () => {
          if (defaultEl) {
            const curr = this.querySelector(".inplace-content");
            if (curr && curr.parentNode) curr.parentNode.removeChild(curr);
            defaultEl.classList.remove("hidden-default");
          } else {
            if (this._origHtml !== undefined) this.innerHTML = this._origHtml;
            else {
              while (this.firstChild) this.removeChild(this.firstChild);
              if (this._origNodes && this._origNodes.length)
                this._origNodes.forEach((n) =>
                  this.appendChild(n.cloneNode(true)),
                );
            }
          }
          this.style.minHeight = "";
          this.style.width = "";
          delete this._lockedWidth;
          delete this._origHtml;
          delete this._origNodes;
          delete this._origTileHeight;
          if (this._inplaceObserver) {
            try { this._inplaceObserver.disconnect(); } catch (e) {}
            delete this._inplaceObserver;
          }
          delete this.dataset.inplaceActive;
        };

        if (current) {
          current.classList.remove("show");
          const onEnd = (e) => {
            if (e.target === current) {
              current.removeEventListener("transitionend", onEnd);
              finishRestore();
            }
          };
          current.addEventListener("transitionend", onEnd);
          setTimeout(finishRestore, 340);
        } else finishRestore();
      };

      const docPointerUp = (ev) => {
        if (!this.contains(ev.target)) restore();
      };

      // On desktop, use pointerleave/pointercancel to restore when pointer exits.
      // On mobile, these fire during scrolling/gesture and hide the inplace content — skip them.
      try {
        const vwNow = window.innerWidth || document.documentElement.clientWidth;
        if (vwNow > 480) {
          this.addEventListener("pointerleave", restore, { once: true });
          this.addEventListener("pointercancel", restore, { once: true });
        }
      } catch (e) {}
      // Always listen for pointerup on the document to detect outside taps/clicks.
      document.addEventListener("pointerup", docPointerUp);

      // Observe visibility of the tile — if it scrolls out of view, close the inplace content
      try {
        if (window.IntersectionObserver) {
          const io = new IntersectionObserver((entries) => {
            const e = entries && entries[0];
            if (e && !e.isIntersecting) {
              // tile is no longer visible in viewport
              restore();
            }
          }, { threshold: 0.05 });
          io.observe(this);
          this._inplaceObserver = io;
        }
      } catch (e) {}

      return;
    }

    // Otherwise normal navigation
    if (!targetUrl) return;
    if (/^https?:\/\//i.test(targetUrl)) {
      window.open(targetUrl, "_blank");
      if (overlay) overlay.classList.remove("active");
      return;
    }
    if (overlay) overlay.classList.add("active");
    setTimeout(() => (window.location.href = targetUrl), 800);
  });
});

// Work bento password lock
(function () {
  const PASS = "1111";
  const overlay = document.getElementById("workLockOverlay");
  const input = document.getElementById("workPassword");
  const btn = document.getElementById("workUnlockBtn");
  const error = document.getElementById("workLockError");

  if (!overlay) return;

  // Check session
  if (sessionStorage.getItem("work_unlocked") === "true") {
    overlay.classList.add("unlocked");
    return;
  }

  function attempt() {
    if (input.value === PASS) {
      sessionStorage.setItem("work_unlocked", "true");
      overlay.classList.add("unlocked");
    } else {
      error.classList.add("visible");
      input.value = "";
      setTimeout(function () {
        error.classList.remove("visible");
      }, 2000);
    }
  }

  btn.addEventListener("click", attempt);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") attempt();
  });
})();

/* Simple carousel initializer for cloned templates */
function initSimpleCarousel(root) {
  try {
    const track = root.querySelector(".carousel-track");
    if (!track) return;
    const slides = Array.from(track.children);
    let idx = 0;
    slides.forEach((s) => {
      s.style.minWidth = "100%";
      s.style.display = "inline-block";
    });
    track.style.whiteSpace = "nowrap";
    track.style.transition = "transform 0.5s ease";

    setInterval(() => {
      idx = (idx + 1) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
    }, 2000);
  } catch (e) {
    // fail silently
  }
}

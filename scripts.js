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
  if (!navLinks || !hamburger) return;
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("active");
  if (navOverlay) navOverlay.classList.toggle("show");
}

if (hamburger) hamburger.addEventListener("click", toggleNav);
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

function resetScrollToTop() {
  window.scrollTo(0, 0);
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
}

// Bento box tab switching with animation
document
  .querySelectorAll(".separator .content, .floating-tab-btn")
  .forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");

      document
        .querySelectorAll(".separator .content, .floating-tab-btn")
        .forEach((t) => {
          t.classList.toggle(
            "active",
            t.getAttribute("data-target") === targetId,
          );
        });

      sessionStorage.setItem("activeTab", targetId);
      document.querySelectorAll(".bentoToggle").forEach((box) => {
        box.classList.toggle("active", box.id === targetId);
      });

      resetScrollToTop();
    });
  });

// Restore the tab from the URL hash when available; otherwise default to home on first load.
function restoreLastTab() {
  const validTabs = ["home", "work", "personal", "others"];
  const hashTab = window.location.hash.replace("#", "").trim();
  const savedTab = sessionStorage.getItem("activeTab");
  const targetTab = validTabs.includes(hashTab) ? hashTab : "home";

  const targetBox = document.querySelector(".bentoToggle#" + targetTab);
  if (targetBox) targetBox.classList.add("active");

  document
    .querySelectorAll(".separator .content, .floating-tab-btn")
    .forEach((tab) => {
      const matches = tab.getAttribute("data-target") === targetTab;
      tab.classList.toggle("active", matches);
    });

  resetScrollToTop();
  sessionStorage.setItem("activeTab", targetTab);
}
document.addEventListener("DOMContentLoaded", restoreLastTab);
if (document.readyState === "interactive" || document.readyState === "complete")
  restoreLastTab();

document.querySelectorAll(".copy-email-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const emailEl = button
      .closest(".email-row")
      ?.querySelector(".email-address");
    const email = emailEl?.textContent?.trim() || "rubayat.ahmed@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      const original = button.textContent;
      button.textContent = "Copied!";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 1200);
    } catch (error) {
      const tempInput = document.createElement("input");
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      const original = button.textContent;
      button.textContent = "Copied!";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 1200);
    }
  });
});

const signatureCanvas = document.getElementById("signatureCanvas");
if (signatureCanvas) {
  const signatureCtx = signatureCanvas.getContext("2d");
  const signatureKey = "rubayat-signature";
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  const setCanvasLineStyle = () => {
    signatureCtx.lineCap = "round";
    signatureCtx.lineJoin = "round";
    signatureCtx.lineWidth = 2.2;
    signatureCtx.strokeStyle = "#f8f8f8";
  };

  const getCanvasPoint = (event) => {
    const rect = signatureCanvas.getBoundingClientRect();
    const x =
      ((event.clientX ?? event.touches?.[0]?.clientX ?? 0) - rect.left) *
      (signatureCanvas.width / rect.width);
    const y =
      ((event.clientY ?? event.touches?.[0]?.clientY ?? 0) - rect.top) *
      (signatureCanvas.height / rect.height);
    return { x, y };
  };

  const startDrawing = (event) => {
    isDrawing = true;
    const point = getCanvasPoint(event);
    lastX = point.x;
    lastY = point.y;
    signatureCtx.beginPath();
    signatureCtx.moveTo(lastX, lastY);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const point = getCanvasPoint(event);
    signatureCtx.beginPath();
    signatureCtx.moveTo(lastX, lastY);
    signatureCtx.lineTo(point.x, point.y);
    signatureCtx.stroke();
    lastX = point.x;
    lastY = point.y;
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    isDrawing = false;
    signatureCtx.closePath();
    localStorage.setItem(signatureKey, signatureCanvas.toDataURL("image/png"));
  };

  const clearSignature = () => {
    signatureCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    localStorage.removeItem(signatureKey);
  };

  const restoreSignature = () => {
    const saved = localStorage.getItem(signatureKey);
    if (!saved) return;

    const image = new Image();
    image.onload = () => {
      signatureCtx.clearRect(
        0,
        0,
        signatureCanvas.width,
        signatureCanvas.height,
      );
      signatureCtx.drawImage(
        image,
        0,
        0,
        signatureCanvas.width,
        signatureCanvas.height,
      );
    };
    image.src = saved;
  };

  setCanvasLineStyle();
  restoreSignature();

  signatureCanvas.addEventListener("pointerdown", startDrawing);
  signatureCanvas.addEventListener("pointermove", draw);
  signatureCanvas.addEventListener("pointerup", stopDrawing);
  signatureCanvas.addEventListener("pointerleave", stopDrawing);
  signatureCanvas.addEventListener("pointercancel", stopDrawing);
  signatureCanvas.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      startDrawing(event.touches[0]);
    },
    { passive: false },
  );
  signatureCanvas.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
      draw(event.touches[0]);
    },
    { passive: false },
  );
  signatureCanvas.addEventListener("touchend", stopDrawing);

  const clearButton = document.querySelector(".signature-clear-btn");
  if (clearButton) {
    clearButton.addEventListener("click", clearSignature);
  }

  const saveButton = document.querySelector(".signature-save-btn");
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      localStorage.setItem(
        signatureKey,
        signatureCanvas.toDataURL("image/png"),
      );
      const originalText = saveButton.textContent;
      saveButton.textContent = "Saved";
      setTimeout(() => {
        saveButton.textContent = originalText;
      }, 1000);
    });
  }
}

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
            try {
              this._inplaceObserver.disconnect();
            } catch (e) {}
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
          const io = new IntersectionObserver(
            (entries) => {
              const e = entries && entries[0];
              if (e && !e.isIntersecting) {
                // tile is no longer visible in viewport
                restore();
              }
            },
            { threshold: 0.05 },
          );
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

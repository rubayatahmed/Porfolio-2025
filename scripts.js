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
    document.querySelectorAll(".bentoToggle").forEach((box) => {
      if (box.id === targetId) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });
  });
});

// Show the first bento box by default
document.addEventListener("DOMContentLoaded", function () {
  const firstBox = document.querySelector(".bentoToggle#work");
  if (firstBox) firstBox.classList.add("active");

  // Make the "Work" tab white on load
  const workTab = document.querySelector(
    '.separator .content[data-target="work"]'
  );
  if (workTab) workTab.classList.add("active");
});

// Update event listener to target bento-boxes instead of buttons
document.querySelectorAll('.bento-item').forEach(box => {
  box.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default behavior if any

    // Get the target URL from a data attribute
    const targetUrl = this.getAttribute('data-href');
    if (!targetUrl) return; // Exit if no URL is set

    // Add the active class to trigger the animation
    const overlay = document.querySelector('.wipe-overlay');
    overlay.classList.add('active');

    // Wait for the animation to complete, then navigate
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 800); // Match the duration of the CSS transition
  });
});

// Work bento password lock
(function () {
  const PASS = '1111';
  const overlay = document.getElementById('workLockOverlay');
  const input = document.getElementById('workPassword');
  const btn = document.getElementById('workUnlockBtn');
  const error = document.getElementById('workLockError');

  if (!overlay) return;

  // Check session
  if (sessionStorage.getItem('work_unlocked') === 'true') {
    overlay.classList.add('unlocked');
    return;
  }

  function attempt() {
    if (input.value === PASS) {
      sessionStorage.setItem('work_unlocked', 'true');
      overlay.classList.add('unlocked');
    } else {
      error.classList.add('visible');
      input.value = '';
      setTimeout(function () { error.classList.remove('visible'); }, 2000);
    }
  }

  btn.addEventListener('click', attempt);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') attempt();
  });
})();
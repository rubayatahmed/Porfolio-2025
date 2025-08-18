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

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  console.log("Toggled show class:", navLinks.classList.contains("show"));
});

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

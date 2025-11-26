const cursor = document.querySelector('.magnetic-cursor');
const magneticWord = document.querySelector('.magnetic-word');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let isHovering = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

magneticWord.addEventListener('mouseenter', () => {
  isHovering = true;
  cursor.style.opacity = 1; // Show custom cursor
});

magneticWord.addEventListener('mouseleave', () => {
  isHovering = false;
  cursor.style.opacity = 0; // Hide custom cursor
});

function animate() {
  requestAnimationFrame(animate);

  const cursorRect = cursor.getBoundingClientRect();
  const cursorWidth = cursorRect.width;
  const cursorHeight = cursorRect.height;

  if (isHovering) {
    const wordRect = magneticWord.getBoundingClientRect();
    const wordCenterX = wordRect.left + wordRect.width / 2;
    const wordCenterY = wordRect.top + wordRect.height / 2;

    cursorX += (wordCenterX - cursorX) * 0.1;
    cursorY += (wordCenterY - cursorY) * 0.1;
  } else {
    cursorX = mouseX;
    cursorY = mouseY;
  }

  cursor.style.transform = `translate(${cursorX - cursorWidth / 2}px, ${cursorY - cursorHeight / 2}px)`;
}

animate();



const glitchElement = document.querySelector('.ascii-glitch');
const asciiChars = ['@', '#', '$', '%', '&', '*', '+', '=', '?', '!', '/'];

function startAsciiGlitch(el) {
  const original = el.dataset.word;
  let iteration = 0;

  const glitchInterval = setInterval(() => {
    const glitched = original
      .split('')
      .map((char, i) => {
        if (i < iteration) return char;
        return asciiChars[Math.floor(Math.random() * asciiChars.length)];
      })
      .join('');
    
    el.textContent = glitched;

    iteration += 1;

    if (iteration > original.length) {
      clearInterval(glitchInterval);
      el.textContent = original;
    }
  }, 50);
}

glitchElement.addEventListener('mouseenter', () => {
  startAsciiGlitch(glitchElement);
});



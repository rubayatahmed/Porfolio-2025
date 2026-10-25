const cursor = document.querySelector(".magnetic-cursor");
const magneticWord = document.querySelector(".magnetic-word");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let isHovering = false;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

if (cursor && magneticWord) {
  magneticWord.addEventListener("mouseenter", () => {
    isHovering = true;
    cursor.style.opacity = 1;
  });

  magneticWord.addEventListener("mouseleave", () => {
    isHovering = false;
    cursor.style.opacity = 0;
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
}

const glitchElement = document.querySelector(".ascii-glitch");
const asciiChars = ["@", "#", "$", "%", "&", "*", "+", "=", "?", "!", "/"];

function startAsciiGlitch(el) {
  const original = el.dataset.word;
  let iteration = 0;

  const glitchInterval = setInterval(() => {
    const glitched = original
      .split("")
      .map((char, i) => {
        if (i < iteration) return char;
        return asciiChars[Math.floor(Math.random() * asciiChars.length)];
      })
      .join("");

    el.textContent = glitched;

    iteration += 1;

    if (iteration > original.length) {
      clearInterval(glitchInterval);
      el.textContent = original;
    }
  }, 50);
}

if (glitchElement) {
  glitchElement.addEventListener("mouseenter", () => {
    startAsciiGlitch(glitchElement);
  });
}

const movieLibraryGrid = document.getElementById("movieLibraryGrid");

const movieLibrary = [
  {
    title: "Spirited Away",
    poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUgR8YgF7J7A.jpg",
    favorite: true,
  },
  {
    title: "The Prestige",
    poster: "https://image.tmdb.org/t/p/w500/5MXyQfz8xUP3dIFPTubhT3jQyQ5.jpg",
    favorite: false,
  },
  {
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    favorite: true,
  },
  {
    title: "Arrival",
    poster: "https://image.tmdb.org/t/p/w500/yzVxScXhM0y2P3wiablQv9A4eLm.jpg",
    favorite: false,
  },
  {
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    favorite: true,
  },
  {
    title: "La La Land",
    poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    favorite: false,
  },
  {
    title: "Blade Runner 2049",
    poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    favorite: false,
  },
  {
    title: "Moonlight",
    poster: "https://image.tmdb.org/t/p/w500/2568c5KEq5yegPaRdsfUUS2Tr1L.jpg",
    favorite: true,
  },
  {
    title: "Whiplash",
    poster: "https://image.tmdb.org/t/p/w500/4yZQ3sFx6QWO8L08M5B1R7ThUzo.jpg",
    favorite: false,
  },
];

if (movieLibraryGrid) {
  movieLibrary.forEach((movie) => {
    const card = document.createElement("article");
    card.className = `movie-poster-card ${movie.favorite ? "favorite" : ""}`;
    card.tabIndex = 0;
    card.setAttribute("aria-label", movie.title);

    const img = document.createElement("img");
    img.src = movie.poster;
    img.alt = movie.title;
    img.loading = "lazy";

    const meta = document.createElement("div");
    meta.className = "movie-meta";
    meta.innerHTML = `<span class="movie-title">${movie.title}</span>`;

    card.appendChild(img);
    card.appendChild(meta);
    movieLibraryGrid.appendChild(card);
  });
}

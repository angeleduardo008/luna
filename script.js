const momentos = [
  {
    foto: "fotos/1.jpeg",
    mensaje: "El inicio de un recuerdo que todavía me saca una sonrisa."
  },
  {
    foto: "fotos/2.jpeg",
    mensaje: "Ese día tuvo algo especial, como si el tiempo caminara más lento."
  },
  {
    foto: "fotos/20.jpeg",
    mensaje: "Hay miradas que se quedan guardadas aunque pasen los días."
  },
  {
    foto: "fotos/4.jpeg",
    mensaje: "Gracias por aparecer en momentos que se volvieron importantes."
  },
  {
    foto: "fotos/5.jpeg",
    mensaje: "Esta foto me recuerda lo bonito que era compartir cosas simples contigo."
  },
  {
    foto: "fotos/6.jpeg",
    mensaje: "Un pedacito de alegría que merece quedarse aquí."
  },
  {
    foto: "fotos/7.jpeg",
    mensaje: "Contigo aprendí que algunos momentos pequeños pueden sentirse enormes."
  },
  {
    foto: "fotos/8.jpeg",
    mensaje: "Ojalá esta imagen también te recuerde algo lindo de nosotros."
  },
  {
    foto: "fotos/9.jpeg",
    mensaje: "Hay recuerdos que uno mira con nostalgia, cariño y un poquito de silencio."
  },
  {
    foto: "fotos/10.jpeg",
    mensaje: "Este momento tiene una parte de ti que siempre voy a valorar."
  },
  {
    foto: "fotos/11.jpeg",
    mensaje: "No todo fue perfecto, pero muchas cosas fueron sinceramente bonitas."
  },
  {
    foto: "fotos/12.jpeg",
    mensaje: "Gracias por las risas, por la paciencia y por lo que compartiste conmigo."
  },
  {
    foto: "fotos/13.jpeg",
    mensaje: "A veces una foto dice lo que las palabras no alcanzan a ordenar."
  },
  {
    foto: "fotos/14.jpeg",
    mensaje: "Este recuerdo se siente como una pausa suave dentro de todo."
  },
  {
    foto: "fotos/15.jpeg",
    mensaje: "Me quedo con lo bueno, con lo real y con lo que me enseñaste."
  },
  {
    foto: "fotos/16.jpeg",
    mensaje: "Si pudiera volver a este instante, lo cuidaría un poco más."
  },
  {
    foto: "fotos/17.jpeg",
    mensaje: "Esta imagen lleva una disculpa silenciosa y un cariño que sigue presente."
  },
  {
    foto: "fotos/18.jpeg",
    mensaje: "Luna, gracias por haber sido parte de días que no quiero olvidar."
  },
  {
    foto: "fotos/21.jpeg",
    mensaje: "Aquí guardo un deseo simple: que recuerdes lo mucho que vales."
  },
  {
    foto: "fotos/3.jpeg",
    mensaje: "El último recuerdo de esta galería, pero no el último pensamiento bonito para ti."
  }
];

const grid = document.querySelector("#memoryGrid");
const savedCounter = document.querySelector("#savedCounter");
const music = document.querySelector("#bgMusic");
const musicToggle = document.querySelector("#musicToggle");
const volumeControl = document.querySelector("#volumeControl");
const audioNotice = document.querySelector("#audioNotice");
const startButton = document.querySelector("#startButton");
const openLetterButton = document.querySelector("#openLetterButton");
const apologyLetter = document.querySelector("#apologyLetter");
const modal = document.querySelector("#photoModal");
const modalImageWrap = document.querySelector("#modalImageWrap");
const modalImage = document.querySelector("#modalImage");
const modalPlaceholder = document.querySelector("#modalPlaceholder");
const modalTitle = document.querySelector("#modalTitle");
const modalMessage = document.querySelector("#modalMessage");
const prevMemory = document.querySelector("#prevMemory");
const nextMemory = document.querySelector("#nextMemory");

let currentMemory = 0;
const likedMemories = new Set();

function twoDigits(number) {
  return String(number).padStart(2, "0");
}

function updateSavedCounter() {
  const total = likedMemories.size;
  savedCounter.textContent = `${total} ${total === 1 ? "recuerdo marcado" : "recuerdos marcados"}`;
}

function markMissingImage(wrapper) {
  wrapper.classList.add("is-missing");
}

function createSpark(x, y) {
  const spark = document.createElement("span");
  spark.className = "spark";
  spark.textContent = "♥";
  spark.style.setProperty("--x", `${x}px`);
  spark.style.setProperty("--y", `${y}px`);
  document.body.appendChild(spark);
  spark.addEventListener("animationend", () => spark.remove());
}

function renderGallery() {
  const fragment = document.createDocumentFragment();

  momentos.forEach((momento, index) => {
    const number = twoDigits(index + 1);
    const card = document.createElement("article");
    card.className = "memory-card reveal";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Abrir recuerdo ${number}`);

    card.innerHTML = `
      <div class="photo-frame">
        <img src="${momento.foto}" alt="Recuerdo ${number} con Luna" loading="lazy">
        <span class="placeholder-label">Foto ${number}</span>
      </div>
      <div class="card-body">
        <div class="card-topline">
          <span class="card-number">Recuerdo ${number}</span>
          <button class="heart-button" type="button" aria-label="Marcar recuerdo ${number}">♥</button>
        </div>
        <p class="card-message">${momento.mensaje}</p>
      </div>
    `;

    const photoFrame = card.querySelector(".photo-frame");
    const image = card.querySelector("img");
    const heartButton = card.querySelector(".heart-button");

    image.addEventListener("error", () => markMissingImage(photoFrame));

    heartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleLike(index, heartButton, event);
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(index);
      }
    });

    card.addEventListener("click", () => openModal(index));
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

function toggleLike(index, heartButton, event) {
  if (likedMemories.has(index)) {
    likedMemories.delete(index);
    heartButton.classList.remove("is-liked");
  } else {
    likedMemories.add(index);
    heartButton.classList.add("is-liked");
    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || window.innerHeight / 2;
    createSpark(x, y);
  }

  updateSavedCounter();
}

function openModal(index) {
  currentMemory = index;
  const momento = momentos[currentMemory];
  const number = twoDigits(currentMemory + 1);

  modalImageWrap.classList.remove("is-missing");
  modalImage.src = momento.foto;
  modalImage.alt = `Recuerdo ${number} con Luna`;
  modalPlaceholder.textContent = `Foto ${number}`;
  modalTitle.textContent = `Recuerdo ${number}`;
  modalMessage.textContent = momento.mensaje;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function moveModal(direction) {
  const nextIndex = (currentMemory + direction + momentos.length) % momentos.length;
  openModal(nextIndex);
}

function syncMusicButton(isPlaying) {
  musicToggle.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música");
  musicToggle.querySelector(".music-icon").textContent = isPlaying ? "Ⅱ" : "♪";
}

async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();
      syncMusicButton(true);
      hideAudioNotice();
    } catch (error) {
      syncMusicButton(false);
      showAudioNotice();
    }
  } else {
    music.pause();
    syncMusicButton(false);
  }
}

function showAudioNotice() {
  audioNotice.hidden = false;
}

function hideAudioNotice() {
  audioNotice.hidden = true;
}

async function tryStartMusic() {
  try {
    await music.play();
    syncMusicButton(true);
    hideAudioNotice();
  } catch (error) {
    syncMusicButton(false);
    showAudioNotice();
  }
}

function setupFirstInteractionAudio() {
  const activate = () => {
    if (music.paused) {
      tryStartMusic();
    }
    window.removeEventListener("click", activate);
    window.removeEventListener("touchstart", activate);
    window.removeEventListener("keydown", activate);
  };

  window.addEventListener("click", activate);
  window.addEventListener("touchstart", activate);
  window.addEventListener("keydown", activate);
}

function setupRevealAnimations() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

music.volume = Number(volumeControl.value);
modalImage.addEventListener("error", () => markMissingImage(modalImageWrap));

musicToggle.addEventListener("click", toggleMusic);
audioNotice.addEventListener("click", toggleMusic);
volumeControl.addEventListener("input", () => {
  music.volume = Number(volumeControl.value);
});

startButton.addEventListener("click", () => {
  document.querySelector("#recuerdos").scrollIntoView({ behavior: "smooth" });
  if (music.paused) {
    toggleMusic();
  }
});

openLetterButton.addEventListener("click", () => {
  apologyLetter.classList.add("is-open");
  apologyLetter.setAttribute("aria-hidden", "false");
  apologyLetter.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

prevMemory.addEventListener("click", () => moveModal(-1));
nextMemory.addEventListener("click", () => moveModal(1));

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeModal();
  }

  if (event.key === "ArrowLeft") {
    moveModal(-1);
  }

  if (event.key === "ArrowRight") {
    moveModal(1);
  }
});

renderGallery();
setupRevealAnimations();
setupFirstInteractionAudio();
tryStartMusic();
updateSavedCounter();

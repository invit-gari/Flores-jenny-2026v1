/*
  PERSONALIZA AQUÍ
*/
const CONFIG = {
  name: "Jenny",

  messages: [
    "Mi mensa",
    "Cachetes lindos",
    "Chillona pero bonita",
    "Te amo jenny",
    "Mi bæ",
    "Ailoviu",
    "Ya te dije te amo?",
    "Te amo",
    "Te quiero aquí conmigo",
    "Quiero verte",
    "Sacate una",
    "O sacate las 2",
    "Aver su cola"
  ],

  // Cambia estas rutas por tus fotos:
  photos: [
    "assets/fotos/foto1.jpg",
    "assets/fotos/foto2.jpg",
    "assets/fotos/foto3.jpg"
  ],

  // Coloca tu MP3 en assets y cambia el nombre si quieres:
  music: "assets/musica.mp3",

  // Tiempo entre mensajes.
  messageInterval: 1250
};

const intro = document.querySelector("#intro");
const galaxy = document.querySelector("#galaxy");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const musicBtn = document.querySelector("#musicBtn");
const music = document.querySelector("#music");
const messagesLayer = document.querySelector("#messages");
const centerMessage = document.querySelector("#centerMessage");
const toast = document.querySelector("#toast");
const canvas = document.querySelector("#space");
const ctx = canvas.getContext("2d");

let running = false;
let messageTimer = null;
let messageIndex = 0;
let stars = [];
let animationFrame = null;

document.querySelector(".centerpiece h2").textContent = CONFIG.name;
music.src = CONFIG.music;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(260, Math.floor(innerWidth * innerHeight / 7000));
  stars = Array.from({length: count}, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.35 + .15,
    a: Math.random() * .8 + .2,
    tw: Math.random() * .025 + .006
  }));
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawStars() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const s of stars) {
    s.a += (Math.random() - .5) * s.tw;
    s.a = Math.max(.08, Math.min(1, s.a));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,248,220,${s.a})`;
    ctx.fill();
  }
  animationFrame = requestAnimationFrame(drawStars);
}
drawStars();

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove("show"), 2200);
}

function nextMessage() {
  if (!running || !CONFIG.messages.length) return;

  const text = CONFIG.messages[messageIndex % CONFIG.messages.length];
  messageIndex++;

  centerMessage.textContent = text;

  const el = document.createElement("span");
  el.className = "message";
  el.textContent = text;
  el.style.setProperty("--x", `${(Math.random() - .5) * Math.min(innerWidth * .78, 650)}px`);
  el.style.setProperty("--y", `${(Math.random() - .5) * Math.min(innerHeight * .72, 520)}px`);
  el.style.setProperty("--duration", `${3.5 + Math.random() * 2.5}s`);
  messagesLayer.appendChild(el);
  el.addEventListener("animationend", () => el.remove(), {once:true});
}

function startMessages() {
  clearInterval(messageTimer);
  nextMessage();
  messageTimer = setInterval(nextMessage, CONFIG.messageInterval);
}

async function startExperience() {
  if (running) return;
  running = true;

  intro.classList.add("hide");
  setTimeout(() => {
    intro.hidden = true;
    galaxy.hidden = false;
    startMessages();
  }, 850);

  try {
    await music.play();
    musicBtn.textContent = "🔊 Música";
  } catch {
    musicBtn.textContent = "🎵 Música";
    showToast("Toca «Música» para activar el audio");
  }
}

function restart() {
  running = false;
  clearInterval(messageTimer);
  messageTimer = null;
  messagesLayer.innerHTML = "";
  messageIndex = 0;
  centerMessage.textContent = "Te amo";
  galaxy.hidden = true;
  intro.hidden = false;
  requestAnimationFrame(() => intro.classList.remove("hide"));
  music.pause();
  music.currentTime = 0;
  musicBtn.textContent = "🎵 Música";
}

startBtn.addEventListener("click", startExperience);
restartBtn.addEventListener("click", restart);

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "🔊 Música";
    } catch {
      showToast("No se encontró el archivo de música");
    }
  } else {
    music.pause();
    musicBtn.textContent = "🔇 Música";
  }
});

// Permite que el botón también funcione con teclado.
startBtn.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") startExperience();
});

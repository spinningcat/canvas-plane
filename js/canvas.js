const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const worldWidth = canvas.width * 3;
const worldHeight = canvas.height * 3;

canvas.setAttribute("tabindex", "0");
canvas.focus();
canvas.style.outline = "none";

let x = worldWidth / 2;
let y = worldHeight / 2;

const speed = 5;
let angle = 0;
let radius = 20;
let angleValue = 2;
let timeCounter = 0;
let frameCounter = 60;

let up = false,
  down = false,
  left = false,
  right = false;

const img = new Image();
img.src = "https://berat.cloud.mech.cx/plane/img/spaceship.png";

const planetObjects = [];
const meteorObjects = [];

function initObjects() {
  const numObject = 150;
  const numMeteor = 10;

  for (let i = 0; i < numObject; i++) {
    const emojiList = ["✦", "✧", "•", "☄️", "🪐", "🌍", "🌌", "🚀", "🛸", "🛰️"];
    planetObjects.push({
      x: Math.random() * worldWidth,
      y: Math.random() * worldHeight,
      size: 7 + Math.random() * 10,
      char: emojiList[Math.floor(Math.random() * emojiList.length)],
      opacity: Math.random() * 0.8 + 0.2,
      driftx: Math.random() * 0.4 - 0.2,
      drifty: Math.random() * 0.4 - 0.2
    });
  }

  for (let i = 0; i < numMeteor; i++) {
    meteorObjects.push({
      x: Math.random() * worldWidth,
      y: Math.random() * worldHeight,
      size: 50,
      char: "🌑",
      opacity: 1,
      driftx: Math.random() * 1 - 0.5,
      drifty: Math.random() * 1 - 0.5
    });
  }
}
initObjects();

canvas.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "ArrowUp") up = true;
  if (e.key === "ArrowDown") down = true;
  if (e.key === "ArrowLeft") left = true;
  if (e.key === "ArrowRight") right = true;
});

canvas.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") up = false;
  if (e.key === "ArrowDown") down = false;
  if (e.key === "ArrowLeft") left = false;
  if (e.key === "ArrowRight") right = false;
});

function drawPlane() {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  drawLight();
  ctx.restore();
}

function drawLight() {
  ctx.beginPath();
  ctx.arc(-25, -10, 4, 0, Math.PI * 2);
  ctx.arc(25, -10, 4, 0, Math.PI * 2);
  ctx.fillStyle = timeCounter++ % frameCounter < 20 ? "#ff0000" : "#330000";
  ctx.fill();
}

function drawStars() {
  for (const s of planetObjects) {
    ctx.save();
    ctx.globalAlpha = s.opacity;
    ctx.font = `${s.size}px serif`;
    ctx.fillText(s.char, s.x, s.y);
    ctx.restore();

    s.x += s.driftx;
    s.y += s.drifty;

    // Wrap stars within the world
    if (s.x > worldWidth) s.x = 0;
    if (s.x < 0) s.x = worldWidth;
    if (s.y > worldHeight) s.y = 0;
    if (s.y < 0) s.y = worldHeight;
  }
}

function drawMeteors() {
  for (const s of meteorObjects) {
    ctx.save();
    ctx.font = `${s.size}px serif`;
    ctx.fillText(s.char, s.x, s.y);
    ctx.restore();

    s.x += s.driftx;
    s.y += s.drifty;

    if (s.x > worldWidth) s.x = 0;
    if (s.y > worldHeight) s.y = 0;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dx = Math.sin((angle * Math.PI) / 180) * speed;
  const dy = Math.cos((angle * Math.PI) / 180) * speed;

  if (up) {
    x += dx;
    y -= dy;
  }
  if (down) {
    x -= dx;
    y += dy;
  }
  if (left) angle -= angleValue;
  if (right) angle += angleValue;

  if (x < 0) x = worldWidth;
  if (x > worldWidth) x = 0;
  if (y < 0) y = worldHeight;
  if (y > worldHeight) y = 0;

  const offsetX = canvas.width / 2 - x;
  const offsetY = canvas.height / 2 - y;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  drawStars();
  drawMeteors();
  drawPlane();

  ctx.restore();

  requestAnimationFrame(update);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

update();

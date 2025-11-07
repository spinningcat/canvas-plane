

const canvas = document.getElementById("ballCanvas");

   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
canvas.setAttribute("tabindex", "0");
canvas.focus();
canvas.style.outline = "none";
let x = canvas.width / 2;
let y = canvas.height / 2;
const speed = 5;
let angle = 0;
let radius = 20;
let angleValue = 1;
let timeCounter = 0;

let frameCounter = 60;
let up = false,
  down = false,
  left = false,
  right = false;
let isOn = false;
const img = new Image();
//img.src = "https://cloud.mech.cx/tmp/plane.png";
//img.src = ""
//const img2 = new Image();
img.src = "https://berat.cloud.mech.cx/plane/img/spaceship.png";

const numStars = 100;
const stars = [];


for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 0.5 + Math.random(),
    emoji: ["⭐", "🌟", "✨", "💫"]
  });
}

canvas.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "ArrowUp") {
    up = true;
  }
  if (e.key === "ArrowDown") {
    down = true;
  }
  if (e.key === "ArrowLeft") {
    left = true;
  }
  if (e.key === "ArrowRight") {
    right = true;
  }
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
  drawLine(0, 50, 0, -50);
  drawLine(-50, 0, 50, 0);
  //ctx.drawImage(img, 0, 0);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);

  drawLight();


  ctx.restore();
  // ctx.drawImage(img2, -img.width / 2, -img.height / 2);
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const dx = Math.sin((angle * Math.PI) / 180) * speed;
  const dy = Math.cos((angle * Math.PI) / 180) * speed;
  if (up) {
    const newX = x + dx;
    const newY = y - dy;

    if (
      newX >= radius &&
      newX <= canvas.width - radius &&
      newY >= radius &&
      newY <= canvas.height - radius
    ) {
      x = newX;
      y = newY;
    }
  }

  if (down) {
    const newX = x - dx;
    const newY = y + dy;

    if (
      newX >= radius &&
      newX <= canvas.width - radius &&
      newY >= radius &&
      newY <= canvas.height - radius
    ) {
      x = newX;
      y = newY;
    }
  }
  if (left) {
    angle -= angleValue;
  }
  if (right) {
    angle += angleValue;
  }
    drawStars();
  drawPlane();

  requestAnimationFrame(update);
}
update();

function drawLight() {
  //  timeCounter++;

  ctx.beginPath();
  ctx.arc(-25, -10, 4, 0, Math.PI * 2);
  ctx.arc(25, -10, 4, 0, Math.PI * 2);

  if (timeCounter++ % frameCounter < 20) {
    ctx.fillStyle = "#ff0000";
  } else {
    ctx.fillStyle = "#330000";
  }

  ctx.fill();
}

function drawLine(x, y, x2, y2) {
  ctx.beginPath(); // Start a new path
  ctx.strokeStyle = "yellow";
  ctx.moveTo(x, y); // Move the pen to (30, 50)
  ctx.lineTo(x2, y2); // Draw a line to (150, 100)
  ctx.stroke(); // Render the path
}

function drawStars() {
 let randomNumber = 0; ctx.clearRect(0,0,canvas.width,canvas.height);
  for (const s of stars) {

      ctx.fillText(s.emoji[0], s.x, s.y);
  }

}

window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}, true);

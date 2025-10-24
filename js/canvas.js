const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");
canvas.setAttribute("tabindex", "0");
canvas.focus();
canvas.style.outline = "none";
let x = canvas.width / 2;
let y = canvas.height / 2;
const speed = 5;
let angle = 0;
let radius = 20;
let angleValue = 1 ;
let up = false, down = false, left = false, right = false;
const img = new Image();
  img.src = "https://cloud.mech.cx/plane_small.png";
canvas.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "ArrowUp") { up = true;}
  if (e.key === "ArrowDown") { down = true; }
  if (e.key === "ArrowLeft") {  left = true; }
  if (e.key === "ArrowRight") { right = true; }
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
  ctx.rotate( angle * Math.PI / 180); 
  drawLine(0, 50, 0, -50);
drawLine(-50, 0, 50, 0);
  //ctx.drawImage(img, 0, 0);
  ctx.drawImage(img, -img.width/2, -img.height/2);
  ctx.restore();
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (up &&
      (x + Math.sin(angle * Math.PI / 180) * speed) >= radius && 
      (x + Math.sin(angle * Math.PI / 180) * speed) <= canvas.width - radius &&
      (y - Math.cos(angle * Math.PI / 180) * speed) >= radius && 
      (y - Math.cos(angle * Math.PI / 180) * speed) <= canvas.height - radius) { 
    //y -= speed; 
    x +=  Math.sin(angle * Math.PI / 180) * speed; 
    y -=  Math.cos(angle * Math.PI / 180) * speed; 
  }
  if (down && 
       (x + Math.sin(angle * Math.PI / 180) * speed) >= radius && 
      (x + Math.sin(angle * Math.PI / 180) * speed) <= canvas.width - radius &&
      (y - Math.cos(angle * Math.PI / 180) * speed) >= radius && 
      (y - Math.cos(angle * Math.PI / 180) * speed) <= canvas.height - radius)
  {
    //y += speed;
     x -=  Math.sin(angle * Math.PI / 180) * speed; 
     y +=  Math.cos(angle * Math.PI / 180) * speed;
    
  }
  if (left) { angle -= angleValue; }
  if (right) { angle += angleValue; }
  drawPlane();
  requestAnimationFrame(update);
}
update();
function drawLine(x, y, x2, y2) {
  ctx.beginPath(); // Start a new path
  ctx.strokeStyle = "yellow";
  ctx.moveTo(x, y); // Move the pen to (30, 50)
  ctx.lineTo(x2, y2); // Draw a line to (150, 100)
  ctx.stroke(); // Render the path
}



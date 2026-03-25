const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
const mouse = { x: null, y: null };

 function init() {
  points = [];
  const count = 100;
  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });

  if (mouse.x !== null) {
    let sorted = points
      .map((p) => ({ ...p, dist: Math.hypot(p.x - mouse.x, p.y - mouse.y) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 3);

    ctx.beginPath();
    ctx.moveTo(sorted[0].x, sorted[0].y);
    ctx.lineTo(sorted[1].x, sorted[1].y);
    ctx.lineTo(sorted[2].x, sorted[2].y);
    ctx.closePath();

    ctx.strokeStyle = "#FFCC00";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 204, 0, 0.08)";
    ctx.fill();

    sorted.forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.stroke();

      ctx.fillStyle = "#FFCC00";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();

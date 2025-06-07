
const socket = io("https://dino-server.onrender.com");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  color: "blue"
};

// Chat
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    socket.emit("chat", chatInput.value);
    chatInput.value = "";
  }
});

socket.on("chat", msg => {
  const msgElem = document.createElement("div");
  msgElem.textContent = msg;
  chatMessages.appendChild(msgElem);
});

// Game loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
  requestAnimationFrame(draw);
}
draw();

const canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext("2d");

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
  "#18dcff",
  "#7d5fff",
];

let xCoord = 0;
let yCoord = 0;

function onClick(e) {
  ctx.beginPath();
  xCoord = e.offsetX;
  yCoord = e.offsetY;
}

function canvasOnMove(e) {
  ctx.beginPath();
  ctx.moveTo(xCoord, yCoord);
  ctx.lineTo(e.offsetX, e.offsetY);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.stroke();
}

canvas.addEventListener(`click`, onClick);
canvas.addEventListener(`mousemove`, canvasOnMove);

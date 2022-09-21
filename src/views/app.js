const textInput = document.querySelector(`#text`);
const fileInput = document.querySelector(`#file`);

const penBtn = document.querySelector(`#penMode`);
const fillBtn = document.querySelector(`#fillMode`);
const brushBtn = document.querySelector(`#brushMode`);
const squareBtn = document.querySelector(`#squareMode`);
const circleBtn = document.querySelector(`#circleMode`);
const eraserBtn = document.querySelector(`#eraser`);
const resetBtn = document.querySelector(`#reset`);
const saveBtn = document.querySelector(`#save`);

const colorOption = Array.from(document.querySelectorAll(`.color-option`));
const color = document.getElementById(`color`);
const lineWidth = document.getElementById(`line-width`);
const canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext("2d");

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let painting = false;
let fillMode = false;
let mode = 0;

function onMove(e) {
  if (painting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}
function startPaint() {
  painting = true;
}
function stopPaint() {
  painting = false;
}
function onLineWidth(e) {
  ctx.lineWidth = e.target.value;
}

function colorChange(newColor) {
  ctx.strokeStyle = newColor;
  ctx.fillStyle = newColor;
}

function onColorRange(e) {
  colorChange(e.target.value);
}
function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  colorChange(colorValue);
  color.value = colorValue;
}

function onCanvasClick(e) {
  console.log(e);
  // ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onResetClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
}

function onFileChange(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDbClick(e) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "50px 'Press Start 2P'";
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore();
  }
}

function onSaveImg() {
  const url = canvas.toDataURL();
  const a = document.createElement(`a`);
  a.href = url;
  a.download = `myMeme.png`;
  a.click();
}

canvas.addEventListener(`mousemove`, onMove);
canvas.addEventListener(`mousedown`, startPaint);
canvas.addEventListener(`mouseup`, stopPaint);
canvas.addEventListener(`mouseleave`, stopPaint);
canvas.addEventListener(`click`, onCanvasClick);
canvas.addEventListener(`dblclick`, onDbClick);

lineWidth.addEventListener(`change`, onLineWidth);
color.addEventListener(`change`, onColorRange);
colorOption.forEach((color) => {
  color.addEventListener(`click`, onColorClick);
});

penBtn.addEventListener(`click`, onCanvasClick);
fillBtn.addEventListener(`click`, onCanvasClick);
brushBtn.addEventListener(`click`, onCanvasClick);
squareBtn.addEventListener(`click`, onCanvasClick);
circleBtn.addEventListener(`click`, onCanvasClick);

resetBtn.addEventListener(`click`, onResetClick);
eraserBtn.addEventListener(`click`, onEraserClick);
saveBtn.addEventListener(`click`, onSaveImg);

fileInput.addEventListener(`change`, onFileChange);

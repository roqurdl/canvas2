// Font Control
const font = document.querySelector(`#font`);
const fontSize = document.querySelector(`#font-size`);
const fontType = document.querySelector(`#font-type`);
const textInput = document.querySelector(`#text`);

//toolBtns
const penBtn = document.querySelector(`#penMode`);
const fillBtn = document.querySelector(`#fillMode`);
const brushBtn = document.querySelector(`#brushMode`);
const squareBtn = document.querySelector(`#squareMode`);
const circleBtn = document.querySelector(`#circleMode`);
const eraserBtn = document.querySelector(`#eraser`);
const resetBtn = document.querySelector(`#reset`);

//image files
const fileInput = document.querySelector(`#file`);
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
let mode = 0;
let startX, startY;

// mode 0:pen 1:brush 2:fill 3:square 4:circle 5:text

function onMove(e) {
  if (painting) {
    switch (mode) {
      case 0:
      case 1:
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        break;
      case 3:
        ctx.fillRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
        break;
      case 4:
        ctx.arc(startX, startY, e.offsetX - startX, 0, 2 * Math.PI);
        ctx.fill();
        break;
    }
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}
function startPaint(e) {
  painting = true;
  startX = e.offsetX;
  startY = e.offsetY;
}
function stopPaint() {
  ctx.beginPath();
  if (mode === 1) {
    ctx.fill();
  }
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

function onCanvasClick() {
  if (mode === 2) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onResetClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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

function onSaveImg() {
  const url = canvas.toDataURL();
  const a = document.createElement(`a`);
  a.href = url;
  a.download = `myMeme.png`;
  a.click();
}

function onDbClick(e) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${fontSize.value}px ${fontType.value} ${font.value}`;
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore();
  }
}

function onPenMode() {
  mode = 0;
}
function onBrushMode() {
  mode = 1;
}
function onfillMode() {
  mode = 2;
}
function onSquareMode() {
  mode = 3;
}
function onCircleMode() {
  mode = 4;
}
function onEraserClick() {
  ctx.strokeStyle = "white";
}

function onSizeChange() {
  fontSize.value = fontSize.value;
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

penBtn.addEventListener(`click`, onPenMode);
fillBtn.addEventListener(`click`, onfillMode);
brushBtn.addEventListener(`click`, onBrushMode);
squareBtn.addEventListener(`click`, onSquareMode);
circleBtn.addEventListener(`click`, onCircleMode);
eraserBtn.addEventListener(`click`, onEraserClick);
resetBtn.addEventListener(`click`, onResetClick);

fileInput.addEventListener(`change`, onFileChange);
saveBtn.addEventListener(`click`, onSaveImg);

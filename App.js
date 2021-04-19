const canvas = document.getElementById("jsCanvas"); /* 캔버스 가져오기 */
const ctx = canvas.getContext("2d");    /* 가져온 캔버스 콘택스트화 */
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const paintBtn = document.getElementById("jsPaintMode");
const saveBtn =  document.getElementById("jsSaveMode");

const DEFAULT_COLOR = "#2c2c2c";

canvas.width = 800;     /* 실제 캔버스 픽셀 크기 지정 */
canvas.height = 600;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;


ctx.strokeStyle = DEFAULT_COLOR;    /* 기본색상설정 */
ctx.lineWidth = 2.5;    /* 기본크기설정 */

ctx.fillstyle = DEFAULT_COLOR;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleClickColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleClickMode() {
    if(filling) {
        paintBtn.innerText = "Fill";
        filling = false;
    } else {
        paintBtn.innerText = "Paint";
        filling = true;
    }
}

function handleClickFilling() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } 
}

function handleRightClick(event) {
    event.preventDefault();
}

function handleClickSave() {
    const imageURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "Paint JS DOWNLOADED IMAGE";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); /* "mousemove" 이벤트: 커서 움직이는것 감지 */
    canvas.addEventListener("mousedown", startPainting); /* "mousedown" 이벤트: 커서 누르는것 감지 */
    canvas.addEventListener("mouseup", stopPainting); /* "mouseup" 이벤트: 커서 때는것 감지 */
    canvas.addEventListener("mouseleave", stopPainting); /* "mouseleave" 이벤트: 커서가 구역 벗어나는것 감지 */
    canvas.addEventListener("click", handleClickFilling);
    canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleClickColor));

if(range) {
    range.addEventListener("input", handleRange);   // range 는 input에 반응한다
}

if(paintBtn) {
    paintBtn.addEventListener("click", handleClickMode);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleClickSave);
}
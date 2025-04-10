const colorPicker = document.getElementById("color-pick");
const bgColor = document.getElementById("bg-color");
const fontSize = document.getElementById("font-size");
const canvas = document.getElementsByClassName("canva")[0];
const clear = document.getElementById("clear");
const save = document.getElementById("save");
const retrieve = document.getElementById("get");
const ctx = canvas.getContext("2d");
// Set canvas dimensions to match CSS
canvas.width = 800;
canvas.height = 600;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
bgColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});
clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
save.addEventListener("click", () => {
  localStorage.setItem("savedSignature", canvas.toDataURL());

  let image = canvas.toDataURL("image/png");
  const downloadLink = document.createElement("a");
  downloadLink.href = image;
  downloadLink.download = "signature.png";
  //   document.body.appendChild(downloadLink);
  downloadLink.click();
  //   document.body.removeChild(downloadLink);
});

retrieve.addEventListener("click", () => {
  console.log("button clicked");

  let savedSign = localStorage.getItem("savedSignature");
  if (savedSign) {
    let img = document.createElement("img");
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };

    img.src = savedSign;
  } else alert("there is no save image");
});

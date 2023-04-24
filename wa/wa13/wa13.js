
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = canvas.width / 2;


function drawCircle() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#ccc";
  ctx.fill();

  
  var gradient = ctx.createRadialGradient(centerX, centerY, radius / 4, centerX, centerY, radius);
  gradient.addColorStop(0, "green");
  gradient.addColorStop(0.5, "yellow");
  gradient.addColorStop(1, "red");

  
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


drawCircle();


canvas.addEventListener("mousemove", function(event) {
  
  var angle = Math.atan2(event.offsetY - centerY, event.offsetX - centerX);
  angle = angle < 0 ? angle + 2 * Math.PI : angle;

  
  var volume = angle / (2 * Math.PI);

  
  ctx.globalCompositeOperation = "source-over";
  drawCircle();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle - Math.PI / 2);
  ctx.lineTo(centerX, centerY);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fill();
});


canvas.addEventListener("mousedown", function(event) {
  canvas.addEventListener("mousemove", erase);
});

canvas.addEventListener("mouseup", function(event) {
  canvas.removeEventListener("mousemove", erase);
});


function erase(event) {
  
  var angle = Math.atan2(event.offsetY - centerY, event.offsetX - centerX);
  angle = angle < 0 ? angle + 2 * Math.PI : angle;

  
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle - Math.PI / 2);
  ctx.lineTo(centerX, centerY);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fill();
}


var plusIcon = document.querySelector(".slider-labels :nth-child(3)");
var minusIcon = document.querySelector(".slider-labels :nth-child(1)");


function increaseVolume() {
  
  var currentAngle = (volume * 2 * Math.PI) - Math.PI / 2;

  
  var newAngle = currentAngle + (0.1 * 2 * Math.PI);

  
  newAngle = Math.min(newAngle, 1 * 2 * Math.PI - Math.PI / 2);

  
  volume = newAngle / (2 * Math.PI);

  
  ctx.globalCompositeOperation = "source-over";
  drawCircle();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, newAngle);
  ctx.lineTo(centerX, centerY);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fill();
}


function decreaseVolume() {
  
  var currentAngle = (volume * 2 * Math.PI) - Math.PI / 2;

  
  var newAngle = currentAngle - (0.1 * 2 * Math.PI);

  
  newAngle = Math.max(newAngle, 0 - Math.PI / 2);

  
  volume = newAngle / (2 * Math.PI);

  
  ctx.globalCompositeOperation = "source-over";
  drawCircle();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, newAngle);
  ctx.lineTo(centerX, centerY);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fill();
}


plusIcon.addEventListener("click", increaseVolume);
minusIcon.addEventListener("click", decreaseVolume);

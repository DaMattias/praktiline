// Abifunktsioonid
// Kraadide arvutamine radiaanideks
var radians = function(degrees) {
  return Math.PI * degrees / 180;
}
// Radiaanide arvutamine kraadideks
var degrees = function(radians) {
  return radians * 180 / Math.PI;
}

// Algseadistused
var width = 1000,
    height = 600,
    pixelsByMeter = 20,
    g = 9.806,
    startSpeed = 25,
    startAngle = radians(29);

// Ettevalmistused joonistamiseks
var canvas = document.getElementById('all-the-action');
var ctx = canvas.getContext('2d');

// Info tabelisse
var xValueElement = document.getElementById('value-x');
var yValueElement = document.getElementById('value-y');

// y-telje ümberpööramine, nullpunkt all vasakul
ctx.translate(0, height);
ctx.scale(1, -1);

// Klass Block, kirjeldab ühte kasti
var Block = function(ctx, w, h, fillStyle) {
// Joonistamise kontekst
  this.ctx = ctx;
  // Laius ja kõrgus
  this.w = w;
  this.h = h;
  // Keskpunkti koordinaadid
  this.x = 0;
  this.y = 0;
  // Täitmise stiil
  this.fillStyle = typeof fillStyle !== 'undefined' ? fillStyle : "rgb(0,0,0)";
  // Nurk x-telje suhtes
  this.angle = 0;
  // Kiirused
  this.xSpeed = 0;
  this.ySpeed = 0;

  // Uute koordinaatide määramine
  this.setCoordinates = function(x, y) {
    this.x = x;
    this.y = y;
  }

  // Uue nurga määramine
  this.setAngle = function(angle) {
    this.angle = angle;
  }

  // x-telje sihis kiiruse arvutamine
  this.calcXSpeed = function(startSpeed) {
    this.xSpeed = startSpeed * Math.cos(startAngle);
  }

  // y-telje sihis kiiruse arvutamine
  this.calcYSpeed = function(startSpeed) {
    this.ySpeed = startSpeed * Math.sin(startAngle);
  }

  // x-koordinaadi leidmine ajas
  this.calcXPos = function(t) {
    this.x = pixelsByMeter * this.xSpeed * t;
  }

  // y-koordinaadi leidmine ajas
  this.calcYPos = function(t) {
    this.y = pixelsByMeter * (this.ySpeed * t - g / 2 * t*t);
  }

  // nurga leidmine ajas
  this.calcAngle = function(t) {
    vy = this.ySpeed - g * t;
    this.angle = Math.atan(vy / this.xSpeed);
  }

  // Kasti joonistamine
  this.draw = function() {
    this.ctx.save();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    this.ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    this.ctx.restore();
  }
}

var showInfo = function(ctx, block) {
  xValueElement.innerHTML = Math.round(block.x / pixelsByMeter);
  yValueElement.innerHTML = Math.round(block.y / pixelsByMeter);
}

// Katsetame ühte visatavat kasti
ctx.translate(50, 50);
var block = new Block(ctx, 40, 20);
block.calcXSpeed(startSpeed);
block.calcYSpeed(startSpeed);

var step = function(timeStamp) {
  ctx.clearRect(-50, -50, width, height);
  var t = timeStamp / 1000;
  block.calcAngle(t);
  block.calcXPos(t);
  block.calcYPos(t);
  block.draw();
  showInfo(ctx, block);
  if (block.y >= 0) {
    window.requestAnimationFrame(step);
  }
}


var ctx = document.getElementById('kastike').getContext('2d');

var radians = function(degrees) {
  return Math.PI * degrees / 180;
}

var degrees = function(radians) {
  return radians * 180 / Math.PI;
}

var width = 800,
    height = 600,
    g = 9.807,
    mass = 2.1,
    angle = radians(10),
    pixelsByMeter = 20,
    my=0.1;

var xValueElement = document.getElementById('value-x');
var timeValueElement = document.getElementById('value-time');

ctx.translate(0, height);
ctx.scale(1, -1);

var Kolmnurk = function(ctx, fillStyle) {
  // joonistamiseks kontekst
  this.ctx = ctx;
  // alus ja nurk
  this.angle = angle;
  //arvutamine
  this.calcNurk = function() {
    if (angle<Math.atan((height-keha.h)/width)) {
      this.b = width
      this.a = this.b*Math.tan(angle);
    } else {
      this.a = height-keha.h;
      this.b = this.a / Math.tan(angle);
    }
  }
  //täitmise stiil
  this.fillStyle = typeof fillStyle !== "undefined" ? fillStyle : "rgb(200,200,200)";
  //joonistab
  this.draw = function() {
    this.calcNurk();
    this.ctx.save();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(this.b, 0)
    this.ctx.lineTo(0,0);
    this.ctx.lineTo(0, this.a);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

}

var Keha = function(ctx, w, h, fillstyle) {
  // joonistamise kontekst
  this.ctx = ctx;
  // kõrgus ja laius
  this.h = h;
  this.w = w;

  this.x=0
  this.Speed=0;

  this.setX = function(x) {
    this.x = x;
  }

  //arvutamine
  this.calcFx = function() {
    this.Fx = mass*g*Math.sin(angle);
  }

  this.calcFy = function() {
    this.Fy = mass*g*Math.cos(angle);
  }

  this.calcCritAngle = function() {
    this.CritAngle = Math.atan(my)
  }


  this.calcFh = function() {
    this.calcFy();
    if (my==0) {
      this.Fh=0;
    } else {
      this.Fh = my*this.Fy;
    }
  }

  this.calcFRes = function() {
    this.calcFh();
    this.calcFx();
    this.calcCritAngle();
    if (this.Fh>this.Fx || angle<= this.CritAngle){
      this.FRes = 0;
    } else {
      this.FRes = this.Fx-this.Fh;
    }
  }

  this.calcA = function() {
    this.calcFh();
    this.calcFx();
    this.calcCritAngle();
    this.calcFRes();
    if (this.Fh>this.Fx || angle<= this.CritAngle){
      this.A = 0;
    } else {
      this.A = this.FRes/mass;
    }
  }

  this.calcSpeed = function(t) {
    this.calcA();
    this.Speed = this.A*t;
  }

  this.calcPos = function(t) {
    this.calcSpeed(t);
    this.x = pixelsByMeter * this.Speed * t;
  }

  this.calcNurk = function() {
    if (angle<Math.atan((height-keha.h)/width)) {
      this.b = width
      this.a = this.b*Math.tan(angle);
    } else {
      this.a = height-keha.h;
      this.b = this.a / Math.tan(angle);
    }
  }

  // täitmise stiil
  this.fillStyle = typeof fillStyle !== "undefined" ? fillStyle : "rgb(100,100,100)";
  //joonistan
  this.draw = function() {
    this.calcNurk();
    this.ctx.save();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.translate(0,this.a);
    this.ctx.rotate(-angle);
    this.ctx.translate(this.w*0.6+this.x+this.w/2,this.h/2);
    this.ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(0,100);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }
}

var showInfo = function(ctx, keha) {
  xValueElement.innerHTML = parseFloat(keha.x / pixelsByMeter).toFixed(2);
}

var keha = new Keha(ctx, 80, 50);
var kolmnurk = new Kolmnurk(ctx);

var step = function(timeStamp) {
  ctx.clearRect(0,0, width, height);
  kolmnurk.draw();
  var t = timeStamp / 1000;
  keha.calcPos(t)
  keha.draw();
  showInfo(ctx,keha)
  timeValueElement.innerHTML = parseFloat(t).toFixed(2);
  if (keha.x <= kolmnurk.a/Math.sin(angle)-keha.w*2) {
        window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);

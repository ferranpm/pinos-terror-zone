var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var pino_file = 'img/pino.png';
var pino_nom_file = 'img/pino_nom.png';
var pino_omg_file = 'img/pino_omg.png';

var pino = document.createElement('img');
var pino_nom = document.createElement('img');
var pino_omg = document.createElement('img');

var vel = 5;

pino.src = pino_file;
pino_nom.src = pino_nom_file;
pino_omg.src = pino_omg_file;

function Player() {
  this.x = null;
  this.y = null;
  this.velX = null;
  this.velY = null;
  this.img = null;
  this.keys = null;

  this.init = function() {
    this.x = 0;
    this.y = 0;
    this.keys = new Array();
    this.img = pino;
  }

  this.move = function() {
    if (this.keys[0]) this.y += -vel;
    if (this.keys[1]) this.y += vel;
    if (this.keys[2]) this.x += -vel;
    if (this.keys[3]) this.x += vel;
  }

  this.pressed = function(key, press) {
    switch (key) {
      case 'w': this.keys[0] = press; break;
      case 's': this.keys[1] = press; break;
      case 'a': this.keys[2] = press; break;
      case 'd': this.keys[3] = press; break;
    }
  }

  this.draw = function(context) {
    context.drawImage(this.img,this.x,this.y);
  }
}

p = new Player();
p.init();

function updateGame() {
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  p.draw(ctx);
  p.move();
}

document.onkeypress = function(e) {
  //alert(e.keyCode);
  switch (e.keyCode) {
    case 119: p.pressed('w', true); break; // w
    case 115: p.pressed('s', true);; break; // s
    case 97: p.pressed('a', true);; break; // a
    case 100: p.pressed('d', true); break; //d
  }
}
1
document.onkeyup = function(e) {
  //alert(e.keyCode);
  switch (e.keyCode) {
    case 87: p.pressed('w', false);; break; // w
    case 83: p.pressed('s', false); break; // s
    case 65: p.pressed('a', false); break; // a
    case 68: p.pressed('d', false); break; //d
  }
}

setInterval(updateGame, 10);

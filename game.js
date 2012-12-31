function Player(images, vel) {
  this.x = 0;
  this.y = 0;
  this.w = 64;
  this.h = 64;
  this.images = images;
  this.img = this.images[0];
  this.keys = new Array();
  this.vel = vel;

  this.move = function() {
    if (this.keys[0] && this.y > 0) this.y += -this.vel;
    if (this.keys[1] && this.y < canvas.height - 64) this.y += this.vel;
    if (this.keys[2] && this.x > 0) this.x += -this.vel;
    if (this.keys[3] && this.x < canvas.width - 64) this.x += this.vel;
  }

  this.shoot = function(dir) {

  }

  this.update = function() {
    this.move();
  }

  this.pressed = function(key, press) {
    switch (key) {
      case 'w': this.keys[0] = press; break;
      case 's': this.keys[1] = press; break;
      case 'a': this.keys[2] = press; break;
      case 'd': this.keys[3] = press; break;
      case 'i': this.keys[4] = press; break;
      case 'j': this.keys[5] = press; break;
      case 'k': this.keys[6] = press; break;
      case 'l': this.keys[7] = press; break;
    }
  }

  this.pointCollide = function(x, y) {
  return ((this.x < x) && ((this.x + this.w) > x) &&
      (this.y < y) && ((this.y + this.h) > y));
  }

  this.collides = function(rect) {
    return this.pointCollide(rect.x, rect.y) ||
      this.pointCollide(rect.x+rect.w,rect.y) ||
      this.pointCollide(rect.x,rect.y+rect.h) ||
      this.pointCollide(rect.x+rect.w,rect.y+rect.h);
  }

  this.draw = function(context) {
    context.drawImage(this.img,this.x,this.y);
  }
}

function Enemy(images) {
  this.rect = new Object();
  this.rect.x = 150;
  this.rect.y = 50;
  this.rect.w = 64;
  this.rect.h = 64;
  this.vel = 2;
  this.images = images;
  this.img = this.images[Math.round(Math.random())];

  this.getRect = function() {
    return this.rect;
  }

  this.move = function(dx, dy) {
    this.rect.x += dx;
    this.rect.y += dy;
  }

  this.update = function(player) {
    if (player.x > this.rect.x) this.move(this.vel, 0);
    else if (player.x < this.rect.x) this.move(-this.vel, 0);
    if (player.y > this.rect.y) this.move(0, this.vel);
    else if (player.y < this.rect.y) this.move(0, -this.vel);
  }

  this.draw = function(context) {
    context.drawImage(this.img,this.rect.x,this.rect.y);
  }
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var pino_file = 'img/pino.png';
var pino_nom_file = 'img/pino_nom.png';
var pino_omg_file = 'img/pino_omg.png';
var cage_file = 'img/cage.png';
var frances_file = 'img/frances.png';

var pino = document.createElement('img');
var pino_nom = document.createElement('img');
var pino_omg = document.createElement('img');
var cage = document.createElement('img');
var frances = document.createElement('img');

pino.src = pino_file;
pino_nom.src = pino_nom_file;
pino_omg.src = pino_omg_file;
cage.src = cage_file;
frances.src = frances_file;

var pino_images = new Array(pino, pino_nom, pino_omg);
var enemy_images = new Array(cage, frances);

var p = new Player(pino_images, 3);
var c = new Enemy(enemy_images);

document.onkeydown = function(e) {
  //alert(e.keyCode);
  switch (e.keyCode) {
    case 87: p.pressed('w', true); break; // w
    case 65: p.pressed('a', true); break; // a
    case 83: p.pressed('s', true); break; // s
    case 68: p.pressed('d', true); break; // d
    case 73: p.pressed('i', true); break; // i
    case 74: p.pressed('j', true); break; // j
    case 75: p.pressed('k', true); break; // k
    case 76: p.pressed('l', true); break; // l
  }
}

document.onkeyup = function(e) {
  //alert(e.keyCode);
  switch (e.keyCode) {
    case 87: p.pressed('w', false); break; // w
    case 65: p.pressed('a', false); break; // a
    case 83: p.pressed('s', false); break; // s
    case 68: p.pressed('d', false); break; // d
    case 73: p.pressed('i', false); break; // i
    case 74: p.pressed('j', false); break; // j
    case 75: p.pressed('k', false); break; // k
    case 76: p.pressed('l', false); break; // l
  }
}

function updateGame() {
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  if (p.collides(c.getRect())) p.img = p.images[2];
  else p.img = p.images[0];
  p.update();
  c.update(p);
  p.draw(ctx);
  c.draw(ctx);
}

setInterval(updateGame, 10);


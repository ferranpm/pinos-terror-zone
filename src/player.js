function Player(options) {
  jaws.Sprite.call(this, {image: 'img/pino.png', x: 500, y: 250});
  this.images = [
    'img/pino.png',
    'img/pino_omg.png',
    'img/pino_nom.png'];
  this.lives = 3;
  this.touched = 0;
  this.state = 0;
  this.vel = 8;
  this.eating = 0;

  this.normal = function() { this.setImage(this.images[0]); }
  this.eat = function() { this.setImage(this.images[1]); }
  this.omg = function() { this.setImage(this.images[2]); }

  this.update = function() {
  }
}
Player.prototype = jaws.Sprite.prototype;


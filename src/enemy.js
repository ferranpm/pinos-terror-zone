function Enemy(pos) {
  this.randomImage = function() {
    switch (Math.round(Math.random()*100)%3) {
      case 0: return 'img/cage.png';
      case 1: return 'img/frances.png';
      case 2: return 'img/steam.png';
    }
  }
  jaws.Sprite.call(this, {image: this.randomImage(), x: pos[0], y: pos[1]});
  this.vel = 2;
}
Enemy.prototype = jaws.Sprite.prototype;



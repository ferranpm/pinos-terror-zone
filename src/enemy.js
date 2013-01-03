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

  this.update = function(player, others) {
    if (player.x < this.x) this.move(-this.vel, 0);
    if (jaws.collideOneWithMany(this, others).length != 0) this.move(this.vel*2, 0);
    if (player.x > this.x) this.move(this.vel, 0);
    if (jaws.collideOneWithMany(this, others).length != 0) this.move(-this.vel*2, 0);
    if (player.y < this.y) this.move(0, -this.vel);
    if (jaws.collideOneWithMany(this, others).length != 0) this.move(0, this.vel*2);
    if (player.y > this.y) this.move(0, this.vel);
    if (jaws.collideOneWithMany(this, others).length != 0) this.move(0, -this.vel*2);

    if (jaws.collideOneWithOne(player, this))
      player.touched();
  }
}
Enemy.prototype = jaws.Sprite.prototype;

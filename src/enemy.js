class Enemy extends jaws.Sprite {
  constructor(pos) {

    function randomImage() {
      return Enemy.images[Math.round(Math.random()*100)%3];
    }

    super({image: randomImage(), x: pos[0], y: pos[1]});
    this.vel = 2;
  }

  update(player, others) {
    if (player.x < this.x) this.move(-this.vel, 0);
    if (jaws.collideOneWithMany(this, others).length !== 0) this.move(this.vel*2, 0);
    if (player.x > this.x) this.move(this.vel, 0);
    if (jaws.collideOneWithMany(this, others).length !== 0) this.move(-this.vel*2, 0);
    if (player.y < this.y) this.move(0, -this.vel);
    if (jaws.collideOneWithMany(this, others).length !== 0) this.move(0, this.vel*2);
    if (player.y > this.y) this.move(0, this.vel);
    if (jaws.collideOneWithMany(this, others).length !== 0) this.move(0, -this.vel*2);

    if (jaws.collideOneWithOne(player, this))
      player.touched();
  }
}

Enemy.images = [
  'img/cage.png',
  'img/frances.png',
  'img/steam.png'
];

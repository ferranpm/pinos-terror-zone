import jaws from './jaws.js';
import Assets from './assets.js';

export default class Enemy extends jaws.Sprite {
  constructor(pos) {
    const image = Assets.game.enemies[Math.round(Math.random()*100)%Assets.game.enemies.length];
    super({
      image: image,
      x: pos.x,
      y: pos.y
    });
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

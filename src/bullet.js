import Assets from './assets.js';

export default class Bullet extends jaws.Sprite {
  constructor(pos, dir) {
    super({image: Assets.game.bullet, x: pos.x, y: pos.y});
    const vel = 15;
    this.vel = { x: 0, y: 0 };
    switch (dir) {
      case 'left':  this.vel.x = -vel; break;
      case 'right': this.vel.x =  vel; break;
      case 'up':    this.vel.y = -vel; break;
      case 'down':  this.vel.y =  vel; break;
    }
  }

  update() {
    this.move(this.vel.x, this.vel.y);
  }
}

import Bullet from './bullet.js';
import { outOfBounds } from './util.js';

export default class Bullets {
  constructor() {
    this.pressed = {i: false, j: false, k: false, l: false}
    this.bullets = [];
  }

  draw() {
    this.bullets.forEach(bullet => bullet.draw());
  }

  update(player, enemies) {
    this.bullets = this.bullets.filter(outOfBounds);

    this.bullets.forEach(bullet => bullet.update());

    jaws.collideManyWithMany(this.bullets, enemies, (bullet, enemy) => {
      this.bullets.splice(this.bullets.indexOf(bullet), 1);
      enemies.splice(enemies.indexOf(enemy), 1);
    });

    this.ifPressed(player, 'j', 'left');
    this.ifPressed(player, 'i', 'up');
    this.ifPressed(player, 'k', 'down');
    this.ifPressed(player, 'l', 'right');
  }

  ifPressed(pos, key, dir) {
    if (jaws.pressed(key)) {
      if (!this.pressed[key]) {
        this.bullets.push(createBullet(pos, dir));
        this.pressed[key] = true;
      }
    }
    else this.pressed[key] = false;
  }
}

function createBullet(pos, dir) {
  if (document.getElementById('sound').checked)
    (new Audio('snd/shot.wav')).play();
  return new Bullet({x: pos.x+15, y: pos.y+60}, dir);
}

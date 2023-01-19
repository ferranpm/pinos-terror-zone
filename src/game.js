import jaws from './jaws.js';
import Assets from './assets.js';
import Enemy from './enemy.js';
import Player from './player.js';
import Bullets from './bullets.js';
import Outro from './outro.js';
import { randomPosition } from './util.js';

export default class Game {
  setup() {
    this.player = new Player();
    this.enemies = [];
    this.bullets = new Bullets();
    this.lifes = [];
    this.background = Assets.game.background[0];
    this.lvl = 0;
    this.DOMlives = document.getElementById('lives');
    this.DOMlevel = document.getElementById('level');
  }

  updateStats() {
    this.DOMlives.innerHTML = this.player.lives;
    this.DOMlevel.innerHTML = this.lvl;
  }

  update() {
    if (this.player.lives === 0) return jaws.switchGameState(Outro);

    if (this.enemies.length <= 0) {
      this.lvl++;
      for (let i = 0; i < this.lvl; i++) this.enemies.push(new Enemy(randomPosition(this.player)));
      if (this.lvl%5 === 0) {
        const pos = randomPosition(this.player);
        this.lifes.push(new jaws.Sprite({image: Assets.game.life, x: pos.x, y: pos.y}));
      }
      this.background = Assets.game.background[this.lvl%Assets.game.background.length];
      return;
    }

    this.enemies.forEach(enemy => enemy.update(this.player, this.enemies));

    jaws.collideOneWithMany(this.player, this.lifes, (player, life) => {
      this.player.eat();
      this.lifes.splice(this.lifes.indexOf(life));
    });

    this.bullets.update(this.player, this.enemies);
    this.player.update();
    this.updateStats();
  }

  draw() {
    jaws.context.drawImage(this.background, 0, 0);
    this.bullets.draw();
    this.enemies.forEach(enemy => enemy.draw());
    this.lifes.forEach(life => life.draw());
    this.player.draw();
  }
}

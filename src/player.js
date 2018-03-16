import Assets from './assets.js';

export default class Player extends jaws.Sprite {
  constructor() {
    super({
      image: Assets.game.player.normal,
      x: 500,
      y: 250
    });
    this.lives = 3;
    this.is_touched = 0;
    this.is_eating = 0;
    this.state = 0;
    this.vel = 8;
    this.audio = {
      au: new Audio('assets/sounds/au.wav'),
      nom: new Audio('assets/sounds/nom.wav'),
    };
  }

  touched() {
    if (!this.is_touched) {
      if (document.getElementById('sound').checked)
        this.audio.au.play();
      this.lives--;
      this.is_touched = 60;
    }
  }

  eat() {
    this.lives++;
    if (document.getElementById('sound').checked)
      this.audio.nom.play();
    if (!this.is_eating) {
      this.is_eating = 30;
    }
  }

  update() {
    if (this.is_eating > 0) {
      this.setImage(Assets.game.player.eating);
      this.is_eating--;
    }
    else if (this.is_touched > 0) {
      this.setImage(Assets.game.player.touched);
      this.is_touched--;
    }
    else this.setImage(Assets.game.player.normal);
    if (jaws.pressed('w') && this.y > 0) this.move(0,-this.vel);
    if (jaws.pressed('s') && this.y < 600-80) this.move(0,this.vel);
    if (jaws.pressed('a') && this.x > 0) this.move(-this.vel,0);
    if (jaws.pressed('d') && this.x < 800-64) this.move(this.vel,0);
  }
}

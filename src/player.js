class Player extends jaws.Sprite {
  constructor() {
    super({image: 'img/pino.png', x: 500, y: 250});
    this.images = [
      'img/pino.png',
      'img/pino_omg.png',
      'img/pino_nom.png'];
    this.lives = 3;
    this.is_touched = 0;
    this.is_eating = 0;
    this.state = 0;
    this.vel = 8;
    this.auAudio = new Audio('snd/au.wav');
  }

  touched() {
    if (!this.is_touched) {
      if (document.getElementById('sound').checked)
        this.auAudio.play();
      this.lives--;
      this.is_touched = 60;
    }
  }

  eat() {
    this.lives++;
    if (document.getElementById('sound').checked)
      (new Audio('snd/nom.wav')).play();
    if (!this.is_eating) {
      this.is_eating = 30;
    }
  }

  update() {
    if (this.is_eating > 0) {
      this.setImage(this.images[2]);
      this.is_eating--;
    }
    else if (this.is_touched > 0) {
      this.setImage(this.images[1]);
      this.is_touched--;
    }
    else this.setImage(this.images[0]);
    if (jaws.pressed('w') && this.y > 0) this.move(0,-this.vel);
    if (jaws.pressed('s') && this.y < 600-80) this.move(0,this.vel);
    if (jaws.pressed('a') && this.x > 0) this.move(-this.vel,0);
    if (jaws.pressed('d') && this.x < 800-64) this.move(this.vel,0);
  }
}

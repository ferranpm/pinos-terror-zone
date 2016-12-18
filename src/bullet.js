class Bullet extends jaws.Sprite {
  constructor(pos, dir) {
    super({image: 'img/bullet.png', x: pos.x, y: pos.y});
    this.vel = 15;
    this.vel_x = 0;
    this.vel_y = 0;
    switch (dir) {
      case 'left': this.vel_x = -this.vel; break;
      case 'right': this.vel_x = this.vel; break;
      case 'up': this.vel_y = -this.vel; break;
      case 'down': this.vel_y = this.vel; break;
    }
  }

  update() {
    this.move(this.vel_x, this.vel_y);
  }
}

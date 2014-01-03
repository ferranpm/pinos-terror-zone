function Bullet(pos, dir) {
    jaws.Sprite.call(this, {image: 'img/bullet.png', x: pos[0], y: pos[1]});
    this.vel = 15;
    this.vel_x = 0;
    this.vel_y = 0;
    switch (dir) {
        case 'left': this.vel_x = -this.vel; break;
        case 'right': this.vel_x = this.vel; break;
        case 'up': this.vel_y = -this.vel; break;
        case 'down': this.vel_y = this.vel; break;
    }

    this.update = function() {
        this.move(this.vel_x, this.vel_y);
    }
}
Bullet.prototype = jaws.Sprite.prototype;

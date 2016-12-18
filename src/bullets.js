function Bullets() {
  this.pressed = {i: false, j: false, k: false, l: false};
  this.bullets = [];
}

Bullets.prototype.newBullet = function(pos, dir) {
  if (document.getElementById('sound').checked)
    (new Audio('snd/shot.wav')).play();
  return new Bullet({x: pos.x+15, y: pos.y+60}, dir);
};

Bullets.prototype.draw = function() {
  this.bullets.forEach(bullet => bullet.draw());
};

Bullets.prototype.update = function(player, enemies) {
  this.bullets = this.bullets.filter(bullet =>
      bullet.x > 0 &&
      bullet.x < 800 &&
      bullet.y > 0 &&
      bullet.y < 600
  );

  this.bullets.forEach(bullet => bullet.update());

  this.bullets = this.bullets.filter(bullet => {
    let collide = jaws.collideOneWithMany(bullet, enemies);
    if (collide.length > 0) {
      let e_index = enemies.indexOf(collide[0]);
      enemies.splice(e_index, 1);
      return false;
    }
    return true;
  })

  this.ifPressed(player, 'j', 'left');
  this.ifPressed(player, 'i', 'up');
  this.ifPressed(player, 'k', 'down');
  this.ifPressed(player, 'l', 'right');
};

Bullets.prototype.ifPressed = function(pos, key, dir) {
  if (jaws.pressed(key)) {
    if (!this.pressed[key]) {
      this.bullets.push(this.newBullet(pos, dir));
      this.pressed[key] = true;
    }
  }
  else this.pressed[key] = false;
};

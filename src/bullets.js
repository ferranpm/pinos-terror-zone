function Bullets() {
  var pressed = {i:0,j:0,k:0,l:0}; 
  var bullets = new Array();

  this.newBullet = function(pos, dir) {
    if (document.getElementById('sound').checked)
      new Audio('snd/shot.wav').play();
    bullets.push(new Bullet([pos.x+15, pos.y+60], dir));
  }

  this.draw = function() {
    for (var i = 0; i < bullets.length; i++) 
      bullets[i].draw();
  }

  this.update = function(player, enemies) {
    for (var i = 0; i < bullets.length; i++) {
      bullets[i].update();
      if (bullets[i].x < 0 || bullets[i].x > 800 || 
          bullets[i].y < 0 ||  bullets[i].y > 600)
        bullets.splice(i,1);
    }

    for (var i = 0; i < bullets.length; i++) {
      var collide = jaws.collideOneWithMany(bullets[i], enemies);
      if (collide.length > 0) {
        var e_index = enemies.indexOf(collide[0]);
        enemies.splice(e_index, 1);
        bullets.splice(i, 1);
      }
    }

    if (jaws.pressed('j')) {
      if (!pressed.j) {
        this.newBullet(player, 'left');
        pressed.j = 1;
      }
    }
    else pressed.j = 0;
    if (jaws.pressed('i')) {
      if (!pressed.i) {
        this.newBullet(player, 'up');
        pressed.i = 1;
      }
    }
    else pressed.i = 0;
    if (jaws.pressed('k')) {
      if (!pressed.k) {
        this.newBullet(player, 'down');
        pressed.k = 1;
      }
    }
    else pressed.k = 0;
    if (jaws.pressed('l')) {
      if (!pressed.l) {
        this.newBullet(player, 'right');
        pressed.l = 1;
      }
    }
    else pressed.l = 0;
  }
}

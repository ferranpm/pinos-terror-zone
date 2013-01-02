function Game() {
  var pino = 'img/pino.png';
  var pino_nom = 'img/pino_nom.png';
  var pino_omg = 'img/pino_omg.png';
  var cage = 'img/cage.png';
  var frances = 'img/frances.png';
  var bullet = 'img/bullet.png';
  var background;
  var player;
  var player_vel;
  var player_lives;
  var enemies;
  var enemies_images;
  var enemies_count;
  var enemies_vel;
  var bullets;
  var bullets_dir;
  var bullets_vel;
  var pressed;

  this.enemyImage = function() {
    switch (Math.round(Math.random()*100)%2) {
      case 0: return cage;
      case 1: return frances;
    }
  }

  this.randomX = function() {
    return Math.round(Math.random()*720 + 60);
  }

  this.randomY = function() {
    return Math.round(Math.random()*500 + 60);
  }

  this.newBullet = function(dir) {
    bullets.push(new jaws.Sprite({image: bullet, x: player.x+32, y: player.y+60}));
    bullets_dir.push(new Object());
    var i = bullets.length - 1;
    bullets_dir[i].move_x = 0;
    bullets_dir[i].move_y = 0;
    switch (dir) {
      case 'left': bullets_dir[i].move_x = -1; break;
      case 'right': bullets_dir[i].move_x = 1; break;
      case 'up': bullets_dir[i].move_y = -1; break;
      case 'down': bullets_dir[i].move_y = 1; break;
    }
  }

  this.updateStats = function() {
    var div = document.getElementById('stats');
    div.innerHTML = 'lives: ' + player_lives;
  }

  this.setup = function() {
    player = new jaws.Sprite({image: pino, x: 0, y: 0});
    player_vel = 7;
    player_lives = 10;
    
    this.updateStats();

    enemies = new Array();
    enemies_images = new Array(cage, frances);
    enemies_vel = new Array();
    enemies_count = 2;

    bullets = new Array();
    bullets_dir = new Array();
    bullets_vel = 15;

    pressed = {i:0,j:0,k:0,l:0};

    background = document.createElement('img');
    background.src = 'img/background.png';
  }

  this.update = function() {
    if (enemies.length <= 0) {
      for (var i = 0; i < enemies_count; i++) {
        enemies.push(new jaws.Sprite({image: this.enemyImage(), x: this.randomX(), y: this.randomY()}));
        enemies_vel.push(Math.round(Math.random()*3)+1);
      }
      enemies_count++;
    }

    player.setImage(pino);
    for (var i = 0; i < enemies.length; i++) {
      if (player.x < enemies[i].x) enemies[i].move(-enemies_vel[i], 0);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(enemies_vel[i], 0);
      if (player.x > enemies[i].x) enemies[i].move(enemies_vel[i], 0);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(-enemies_vel[i], 0);
      if (player.y < enemies[i].y) enemies[i].move(0, -enemies_vel[i]);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(0, enemies_vel[i]);
      if (player.y > enemies[i].y) enemies[i].move(0, enemies_vel[i]);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(0, -enemies_vel[i]);

      if (jaws.collideOneWithOne(player, enemies[i])) player.setImage(pino_omg);
    }

    for (var i = 0; i < bullets.length; i++) {
      bullets[i].move(bullets_dir[i].move_x*bullets_vel, bullets_dir[i].move_y*bullets_vel);
      if (bullets[i].x > 800 || bullets[i].y > 600) { //BORRAR BULLET;
        var index = bullets.indexOf(bullets[i]);
        bullets.splice(index,1);
        bullets_dir.splice(index,1);
      }
    }

    var dead = jaws.collideManyWithMany(bullets, enemies);
    for (var i = 0; i < dead.length; i++) {
      var b_index = bullets.indexOf(dead[i][0]);
      var e_index = enemies.indexOf(dead[i][1]);
      bullets.splice(b_index, 1);
      bullets_dir.splice(b_index, 1);
      enemies.splice(e_index, 1);
      enemies_vel.splice(e_index, 1);
    }

    if (jaws.pressed('w') && player.y > 0) player.move(0,-player_vel);
    if (jaws.pressed('s') && player.y < 600-80) player.move(0,player_vel);
    if (jaws.pressed('a') && player.x > 0) player.move(-player_vel,0);
    if (jaws.pressed('d') && player.x < 800-64) player.move(player_vel,0);

    if (jaws.pressed('j')) {
      if (!pressed.j) {
        this.newBullet('left');
        pressed.j = 1;
      }
    }
    else pressed.j = 0;
    if (jaws.pressed('i')) {
      if (!pressed.i) {
        this.newBullet('up');
        pressed.i = 1;
      }
    }
    else pressed.i = 0;
    if (jaws.pressed('k')) {
      if (!pressed.k) {
        this.newBullet('down');
        pressed.k = 1;
      }
    }
    else pressed.k = 0;
    if (jaws.pressed('l')) {
      if (!pressed.l) {
        this.newBullet('right');
        pressed.l = 1;
      }
    }
    else pressed.l = 0;
  }

  this.draw = function() {
    jaws.context.drawImage(background,0,0);
    for (var i = 0; i < bullets.length; i++) 
      bullets[i].draw();
    for (var i = 0; i < enemies.length; i++)
      enemies[i].draw();
    player.draw();
  }
};

jaws.start(Game);

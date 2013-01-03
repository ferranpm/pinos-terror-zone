function Game() {
  var background;
  var player;
  var enemies;
  var bullets;
  var lvl = 0;
  var ramens;
  var pressed;
  var espai = 150;

  this.randomEnemyPosition = function() {
    var rx = Math.round(Math.random()*800);
    var ry = Math.round(Math.random()*600);
    var bound_x0 = player.x - espai;
    var bound_x1 = player.x + 64 + espai;
    var bound_y0 = player.y - espai;
    var bound_y1 = player.y + 90 + espai;
    if (rx < bound_x0) return new Array(rx, ry);
    else if (rx > bound_x1) return new Array(rx, ry);
    else {
      if (ry < bound_y0) return new Array(rx, ry);
      else if (ry > bound_y1) return new Array(rx, ry);
    }
    return this.randomEnemyPosition();
  }

  this.newBullet = function(dir) {
    bullets.push(new Bullet([player.x+32, player.y+60], dir));
  }

  this.updateStats = function() {
    var lives = document.getElementById('lives');
    lives.innerHTML = ': ' + player.lives;
    var level = document.getElementById('level');
    level.innerHTML = ': ' + lvl;
  }

  this.setup = function() {
    player = new Player();

    enemies = new Array();

    bullets = new Array();

    ramens = new Array();

    pressed = {i:0,j:0,k:0,l:0};

    background = document.createElement('img');

    this.updateStats();
  }

  this.update = function() {
    if (player.lives == 0) jaws.switchGameState(Menu);
    if (enemies.length <= 0) {
      lvl++;
      for (var i = 0; i < lvl; i++) {
        var position = this.randomEnemyPosition();
        enemies.push(new Enemy([position[0], position[1]]));
      }
      if (lvl%5 == 0) {
        var position = this.randomEnemyPosition();
        ramens.push(new jaws.Sprite({image: "img/ramen.png", x: position[0], y: position[1]}));
      }
      switch (lvl%4) {
        case 0: background.src = 'img/pisa.png'; break;
        case 1: background.src = 'img/eiffel.png'; break;
        case 2: background.src = 'img/coliseo.png'; break;
        case 3: background.src = 'img/canada.png'; break;
      }
    }

    player.setImage('img/pino.png');
    for (var i = 0; i < enemies.length; i++) {
      if (player.x < enemies[i].x) enemies[i].move(-enemies[i].vel, 0);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(enemies[i].vel*2, 0);
      if (player.x > enemies[i].x) enemies[i].move(enemies[i].vel, 0);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(-enemies[i].vel*2, 0);
      if (player.y < enemies[i].y) enemies[i].move(0, -enemies[i].vel);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(0, enemies[i].vel*2);
      if (player.y > enemies[i].y) enemies[i].move(0, enemies[i].vel);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(0, -enemies[i].vel*2);

      if (jaws.collideOneWithOne(player, enemies[i])) {
        player.setImage('img/pino_omg.png');
        if (!player.touched && player.lives > 0) { 
          player.lives--;
          player.touched = 60;
        }
      }
    }

    if (player.touched > 0) player.touched--;

    for (var i = 0; i < bullets.length; i++) {
      bullets[i].move(bullets[i].vel_x, bullets[i].vel_y);
      if (bullets[i].x > 800 || bullets[i].y > 600) { //BORRAR BULLET;
        var index = bullets.indexOf(bullets[i]);
        bullets.splice(index,1);
      }
    }

    var dead = jaws.collideManyWithMany(bullets, enemies);
    for (var i = 0; i < bullets.length; i++) {
      var collide = jaws.collideOneWithMany(bullets[i], enemies);
      if (collide.length > 0) {
        var e_index = enemies.indexOf(collide[0]);
        enemies.splice(e_index, 1);
        bullets.splice(i, 1);
      }
    }

    var comidita = jaws.collideOneWithMany(player, ramens);
    if (comidita.length > 0) {
      player.setImage('img/pino_nom.png');
    }
    if (player.eating > 0) {
      player.setImage('img/pino_nom.png');
      player.eating--;
    }
    for (var i = 0; i < comidita.length; i++) {
      player.eating = 30;
      player.lives++;
      var index = ramens.indexOf(comidita[i]);
      ramens.splice(index, 1);
    }

    if (jaws.pressed('w') && player.y > 0) player.move(0,-player.vel);
    if (jaws.pressed('s') && player.y < 600-80) player.move(0,player.vel);
    if (jaws.pressed('a') && player.x > 0) player.move(-player.vel,0);
    if (jaws.pressed('d') && player.x < 800-64) player.move(player.vel,0);

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
    this.updateStats();
  }

  this.draw = function() {
    jaws.context.drawImage(background,0,0);
    for (var i = 0; i < bullets.length; i++) 
      bullets[i].draw();
    for (var i = 0; i < enemies.length; i++)
      enemies[i].draw();
    for (var i = 0; i < ramens.length; i++)
      ramens[i].draw();
    player.draw();
  }
};

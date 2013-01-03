function Menu() {
  var background; 
  var anim;
  var jugar1;
  var jugar2;
  var count = 0;

  this.setup = function() {
    background = document.createElement('img');
    background.src = 'img/background_menu.png';
    var x1 = Math.round(Math.random()*595);
    var x2 = Math.round(Math.random()*595);
    var y1 = Math.round(Math.random()*520);
    var y2 = Math.round(Math.random()*520);
    jugar1 = new jaws.Sprite({image: 'img/jugar1.png', x: x1, y: y1});
    jugar2 = new jaws.Sprite({image: 'img/jugar2.png', x: x2, y: y2});
  }

  this.update = function() {
    count++;
    if (count > 30) {
      jugar1.x = Math.round(Math.random()*595);
      jugar1.y = Math.round(Math.random()*520);
      jugar2.x = Math.round(Math.random()*595);
      jugar2.y = Math.round(Math.random()*520);
      count = 0;
    }
    if (jaws.pressed('enter')) jaws.switchGameState(Game);
  }

  this.draw = function() {
    jaws.context.drawImage(background,0,0);
    if (count > 10) jugar1.draw();
    else jugar2.draw();
  }
}

function Game() {
  var pino = 'img/pino.png';
  var pino_nom = 'img/pino_nom.png';
  var pino_omg = 'img/pino_omg.png';
  var bullet = 'img/bullet.png';
  var background;
  var player;
  var player_eating;
  var player_vel = 8;
  var player_lives = 10;
  var player_touched_count;
  var enemies;
  var enemies_count = 0;
  var enemies_vel = 2;
  var bullets;
  var bullets_dir;
  var bullets_vel = 15;
  var ramens;
  var pressed;
  var espai = 150;

  this.enemyImage = function() {
    switch (Math.round(Math.random()*100)%3) {
      case 0: return 'img/cage.png';
      case 1: return 'img/frances.png';
      case 2: return 'img/steam.png';
    }
  }

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
    var lives = document.getElementById('lives');
    lives.innerHTML = ': ' + player_lives;
    var lvl = document.getElementById('level');
    lvl.innerHTML = ': ' + enemies_count;
  }

  this.setup = function() {
    player = new jaws.Sprite({image: pino, x: 500, y: 250});
    player_lives = 10;

    enemies = new Array();

    bullets = new Array();
    bullets_dir = new Array();

    ramens = new Array();

    pressed = {i:0,j:0,k:0,l:0};

    background = document.createElement('img');

    this.updateStats();
  }

  this.update = function() {
    if (player_lives == 0) jaws.switchGameState(Menu);
    if (enemies.length <= 0) {
      enemies_count++;
      for (var i = 0; i < enemies_count; i++) {
        var position = this.randomEnemyPosition();
        enemies.push(new jaws.Sprite({image: this.enemyImage(), x: position[0], y: position[1]}));
      }
      if (enemies.length%5 == 0) {
        var position = this.randomEnemyPosition();
        ramens.push(new jaws.Sprite({image: "img/ramen.png", x: position[0], y: position[1]}));
      }
      switch (enemies_count%4) {
        case 0: background.src = 'img/pisa.png'; break;
        case 1: background.src = 'img/eiffel.png'; break;
        case 2: background.src = 'img/coliseo.png'; break;
        case 3: background.src = 'img/canada.png'; break;
      }
    }

    player.setImage(pino);
    for (var i = 0; i < enemies.length; i++) {
      if (player.x < enemies[i].x) enemies[i].move(-enemies_vel, 0);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(enemies_vel*2, 0);
      if (player.x > enemies[i].x) enemies[i].move(enemies_vel, 0);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(-enemies_vel*2, 0);
      if (player.y < enemies[i].y) enemies[i].move(0, -enemies_vel);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(0, enemies_vel*2);
      if (player.y > enemies[i].y) enemies[i].move(0, enemies_vel);
      if (jaws.collideOneWithMany(enemies[i], enemies).length != 0) enemies[i].move(0, -enemies_vel*2);

      if (jaws.collideOneWithOne(player, enemies[i])) {
        player.setImage(pino_omg);
        if (!player_touched_count && player_lives > 0) { 
          player_lives--;
          player_touched_count = 60;
        }
      }
    }

    if (player_touched_count > 0) player_touched_count--;

    for (var i = 0; i < bullets.length; i++) {
      bullets[i].move(bullets_dir[i].move_x*bullets_vel, bullets_dir[i].move_y*bullets_vel);
      if (bullets[i].x > 800 || bullets[i].y > 600) { //BORRAR BULLET;
        var index = bullets.indexOf(bullets[i]);
        bullets.splice(index,1);
        bullets_dir.splice(index,1);
      }
    }

    var dead = jaws.collideManyWithMany(bullets, enemies);
    for (var i = 0; i < bullets.length; i++) {
      var collide = jaws.collideOneWithMany(bullets[i], enemies);
      if (collide.length > 0) {
        var e_index = enemies.indexOf(collide[0]);
        enemies.splice(e_index, 1);
        bullets.splice(i, 1);
        bullets_dir.splice(i, 1);
      }
    }

    var comidita = jaws.collideOneWithMany(player, ramens);
    if (comidita.length > 0) {
      player.setImage(pino_nom);
    }
    if (player_eating > 0) {
      player.setImage(pino_nom);
      player_eating--;
    }
    for (var i = 0; i < comidita.length; i++) {
      player_eating = 30;
      player_lives++;
      var index = ramens.indexOf(comidita[i]);
      ramens.splice(index, 1);
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

jaws.start(Menu);

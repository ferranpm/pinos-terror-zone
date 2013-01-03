function Game() {
  var player;
  var enemies;
  var bullets;
  var ramens;
  var background;
  var lvl = 0;
  var espai = 150;
  var pressed = {i:0,j:0,k:0,l:0}; 

  this.randomEnemyPosition = function() {
    var rx = Math.round(Math.random()*(jaws.canvas.width-64));
    var ry = Math.round(Math.random()*(jaws.canvas.height-64));
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
    document.getElementById('shot').innerHTML='<embed src="snd/shot.wav" hidden=true autostart=true loop=false>';
    bullets.push(new Bullet([player.x+15, player.y+60], dir));
  }

  this.updateStats = function() {
    var lives = document.getElementById('lives');
    lives.innerHTML = player.lives;
    var level = document.getElementById('level');
    level.innerHTML = lvl;
    var enemics = document.getElementById('enemies');
    enemics.innerHTML = enemies.length;
  }

  this.setup = function() {
    player = new Player();
    enemies = new Array();
    bullets = new Array();
    ramens = new Array();
    background = document.createElement('img');
    this.updateStats();
  }

  this.update = function() {
    if (player.lives == 0) jaws.switchGameState(Outro);
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
      switch (lvl%5) {
        case 0: background.src = 'img/pisa.png'; break;
        case 1: background.src = 'img/eiffel.png'; break;
        case 2: background.src = 'img/coliseo.png'; break;
        case 3: background.src = 'img/canada.png'; break;
        case 4: background.src = 'img/delacroix.png'; break;
      }
    }

    for (var i = 0; i < enemies.length; i++) {
      enemies[i].update(player, enemies);
    }

    for (var i = 0; i < bullets.length; i++) {
      bullets[i].update();
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
    var primer = true;
    for (var i = 0; i < comidita.length; i++) {
      if (primer)
        document.getElementById('nom').innerHTML='<embed src="snd/nom.wav" hidden=true autostart=true loop=false>';
      player.eat();
      player.lives++;
      var index = ramens.indexOf(comidita[i]);
      ramens.splice(index, 1);
    }

    player.update();
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

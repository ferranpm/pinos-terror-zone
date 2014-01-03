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

function Enemy(pos) {
    this.randomImage = function() {
        switch (Math.round(Math.random()*100)%3) {
            case 0: return 'img/cage.png';
            case 1: return 'img/frances.png';
            case 2: return 'img/steam.png';
        }
    }
    jaws.Sprite.call(this, {image: this.randomImage(), x: pos[0], y: pos[1]});
    this.vel = 2;

    this.update = function(player, others) {
        if (player.x < this.x) this.move(-this.vel, 0);
        if (jaws.collideOneWithMany(this, others).length != 0) this.move(this.vel*2, 0);
        if (player.x > this.x) this.move(this.vel, 0);
        if (jaws.collideOneWithMany(this, others).length != 0) this.move(-this.vel*2, 0);
        if (player.y < this.y) this.move(0, -this.vel);
        if (jaws.collideOneWithMany(this, others).length != 0) this.move(0, this.vel*2);
        if (player.y > this.y) this.move(0, this.vel);
        if (jaws.collideOneWithMany(this, others).length != 0) this.move(0, -this.vel*2);

        if (jaws.collideOneWithOne(player, this))
            player.touched();
    }
}
Enemy.prototype = jaws.Sprite.prototype;

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

function Player(options) {
    jaws.Sprite.call(this, {image: 'img/pino.png', x: 500, y: 250});
    this.images = [
        'img/pino.png',
        'img/pino_omg.png',
        'img/pino_nom.png'];
    this.bullets = new Array();
    this.lives = 3;
    this.is_touched = 0;
    this.is_eating = 0;
    this.state = 0;
    this.vel = 8;

    this.touched = function() {
        if (!this.is_touched) {
            if (document.getElementById('sound').checked)
                new Audio('snd/au.wav').play();
            this.lives--;
            this.is_touched = 60;
        }
    }

    this.eat = function() {
        this.lives++;
        if (document.getElementById('sound').checked)
            new Audio('snd/nom.wav').play();
        if (!this.is_eating) {
            this.is_eating = 30;
        }
    }

    this.update = function() {
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
Player.prototype = jaws.Sprite.prototype;

function Outro() {
    var background;

    this.toMenu = function() {
        jaws.switchGameState(Menu);
    }

    this.setup = function() {
        background = document.createElement('img');
        background.src = 'img/background_outro.png';
        jaws.on_keyup('enter', this.toMenu);
    }

    this.update = function() {
    }

    this.draw = function() {
        jaws.context.drawImage(background, 0, 0);
    }
}

function Menu() {
    var background; 
    var anim;
    var jugar;
    var count;
    var frames = 30;
    var pos;

    this.randomButtonPos = function() {
        var x = Math.round(Math.random()*(jaws.canvas.width - 205));
        var y = Math.round(Math.random()*(jaws.canvas.height - 80));
        return [x, y];
    }

    this.toGame = function() {
        jaws.switchGameState(Game);
    }

    this.setup = function() {
        background = document.createElement('img');
        background.src = 'img/background_menu.png';

        jugar = document.createElement('img');
        jugar.src = 'img/jugar1.png';

        pos = this.randomButtonPos();
        count = 0;

        jaws.on_keyup('enter', this.toGame);
    }

    this.update = function() {
        count++;
        if (count > frames) {
            jugar.src = 'img/jugar1.png';
            pos = this.randomButtonPos();
            count = 0;
        }
        if (count > frames/2) 
            jugar.src = 'img/jugar2.png';
    }

    this.draw = function() {
        jaws.context.drawImage(background, 0, 0);
        jaws.context.drawImage(jugar, pos[0], pos[1]);
    }
}

function Game() {
    var player;
    var enemies;
    var bullets;
    var ramens;
    var background;
    var lvl;

    this.randomPosition = function() {
        var espai = 150;
        var rx = Math.round(Math.random()*(jaws.canvas.width-64));
        var ry = Math.round(Math.random()*(jaws.canvas.height-64));
        var bound_x0 = player.x - espai;
        var bound_x1 = player.x + 64 + espai;
        var bound_y0 = player.y - espai;
        var bound_y1 = player.y + 90 + espai;
        if (rx < bound_x0) return [rx, ry];
        else if (rx > bound_x1) return [rx, ry];
        else {
            if (ry < bound_y0) return [rx, ry];
            else if (ry > bound_y1) return [rx, ry];
        }
        return this.randomPosition();
    }

    this.updateStats = function() {
        var lives = document.getElementById('lives');
        lives.innerHTML = player.lives;
        var level = document.getElementById('level');
        level.innerHTML = lvl;
    }

    this.setup = function() {
        lvl = 0;
        player = new Player();
        bullets = new Bullets();
        enemies = new Array();
        ramens = new Array();
        background = document.createElement('img');
        this.updateStats();
    }

    this.update = function() {
        if (player.lives == 0) jaws.switchGameState(Outro);

        if (enemies.length <= 0) {
            lvl++;
            for (var i = 0; i < lvl; i++) {
                var position = this.randomPosition();
                enemies.push(new Enemy([position[0], position[1]]));
            }
            if (lvl%5 == 0) {
                var position = this.randomPosition();
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

        for (var i = 0; i < enemies.length; i++)
            enemies[i].update(player, enemies);

        var comida = jaws.collideOneWithMany(player, ramens);
        for (var i = 0; i < comida.length; i++) {
            player.eat();
            var index = ramens.indexOf(comida[i]);
            ramens.splice(index, 1);
        }

        bullets.update(player, enemies);
        player.update();
        this.updateStats();
    }

    this.draw = function() {
        jaws.context.drawImage(background,0,0);
        bullets.draw();
        for (var i = 0; i < enemies.length; i++)
            enemies[i].draw();
        for (var i = 0; i < ramens.length; i++)
            ramens[i].draw();
        player.draw();
    }
};

jaws.preventDefaultKeys(['w', 'a', 's', 'd', 'i', 'j', 'k', 'l', 'enter']);
jaws.start(Menu);


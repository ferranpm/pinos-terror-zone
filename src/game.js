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

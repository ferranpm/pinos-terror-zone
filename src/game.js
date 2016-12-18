const drawItem = (item) => item.draw();

class Game {
  setup() {
    this.player = new Player();
    this.enemies = [];
    this.bullets = new Bullets();
    this.ramens = [];
    this.background = document.createElement('img');
    this.lvl = 0;
    this.updateStats();
  }

  randomPosition() {
    let espai = 150;
    let rx = Math.round(Math.random()*(jaws.canvas.width-64));
    let ry = Math.round(Math.random()*(jaws.canvas.height-64));
    let bound_x0 = this.player.x - espai;
    let bound_x1 = this.player.x + 64 + espai;
    let bound_y0 = this.player.y - espai;
    let bound_y1 = this.player.y + 90 + espai;
    if (rx < bound_x0) return [rx, ry];
    else if (rx > bound_x1) return [rx, ry];
    else {
      if (ry < bound_y0) return [rx, ry];
      else if (ry > bound_y1) return [rx, ry];
    }
    return this.randomPosition();
  }

  updateStats() {
    document.getElementById('lives').innerHTML = this.player.lives;
    document.getElementById('level').innerHTML = this.lvl;
  }

  update() {
    if (this.player.lives === 0) return jaws.switchGameState(Outro);

    if (this.enemies.length <= 0) {
      this.lvl++;
      for (let i = 0; i < this.lvl; i++) {
        let position = this.randomPosition();
        this.enemies.push(new Enemy([position[0], position[1]]));
      }
      if (this.lvl%5 === 0) {
        let position = this.randomPosition();
        this.ramens.push(new jaws.Sprite({image: "img/ramen.png", x: position[0], y: position[1]}));
      }
      switch (this.lvl%5) {
        case 0: this.background.src = 'img/pisa.png'; break;
        case 1: this.background.src = 'img/eiffel.png'; break;
        case 2: this.background.src = 'img/coliseo.png'; break;
        case 3: this.background.src = 'img/canada.png'; break;
        case 4: this.background.src = 'img/delacroix.png'; break;
      }
      return;
    }

    this.enemies.forEach(enemy => enemy.update(this.player, this.enemies));

    let comida = jaws.collideOneWithMany(this.player, this.ramens);
    for (let i = 0; i < comida.length; i++) {
      this.player.eat();
      let index = this.ramens.indexOf(comida[i]);
      this.ramens.splice(index, 1);
    }

    this.bullets.update(this.player, this.enemies);
    this.player.update();
    this.updateStats();
  }

  draw() {
    jaws.context.drawImage(this.background, 0, 0);
    this.bullets.draw();
    this.enemies.forEach(drawItem);
    this.ramens.forEach(drawItem);
    this.player.draw();
  }
}

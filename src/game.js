class Game {
  setup() {
    this.player = new Player();
    this.enemies = [];
    this.bullets = new Bullets();
    this.ramens = [];
    this.background = Assets.game.background[0];
    this.lvl = 0;
    this.DOMlives = document.getElementById('lives');
    this.DOMlevel = document.getElementById('level');
  }

  updateStats() {
    this.DOMlives.innerHTML = this.player.lives;
    this.DOMlevel.innerHTML = this.lvl;
  }

  update() {
    if (this.player.lives === 0) return jaws.switchGameState(Outro);

    if (this.enemies.length <= 0) {
      this.lvl++;
      for (let i = 0; i < this.lvl; i++) this.enemies.push(new Enemy(randomPosition(this.player)));
      if (this.lvl%5 === 0) {
        const pos = randomPosition(this.player);
        this.ramens.push(new jaws.Sprite({image: Assets.game.ramen, x: pos.x, y: pos.y}));
      }
      this.background = Assets.game.background[this.lvl%Assets.game.background.length];
      return;
    }

    this.enemies.forEach(enemy => enemy.update(this.player, this.enemies));

    jaws.collideOneWithMany(this.player, this.ramens, (player, ramen) => {
      this.player.eat();
      this.ramens.splice(this.ramens.indexOf(ramen));
    });

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

function randomPosition(position) {
    const espai = 150;
    const pos = {
      x: Math.round(Math.random()*(jaws.canvas.width-64)),
      y: Math.round(Math.random()*(jaws.canvas.height-64)),
      right: this.x + 1,
      bottom: this.y + 1
    };
    const box = {
      x: position.x - espai,
      right: position.x + 64 + espai,
      y: position.y - espai,
      bottom: position.y + 90 + espai
    };

    if (!jaws.collideRects(pos, box)) return pos;
    return randomPosition(position);
  }


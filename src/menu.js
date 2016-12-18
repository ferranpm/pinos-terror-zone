class Menu {
  setup() {
    this.frames = 30;
    this.background = document.createElement('img');
    this.background.src = 'img/background_menu.png';

    this.jugar = document.createElement('img');
    this.jugar.src = 'img/jugar1.png';

    this.pos = this.randomButtonPos();
    this.count = 0;

    jaws.on_keyup('enter', this.toGame);
  }

  randomButtonPos() {
    var x = Math.round(Math.random()*(jaws.canvas.width - 205));
    var y = Math.round(Math.random()*(jaws.canvas.height - 80));
    return [x, y];
  }

  toGame() {
    jaws.switchGameState(Game);
  }

  update() {
    this.count++;
    if (this.count > this.frames) {
      this.jugar.src = 'img/jugar1.png';
      this.pos = this.randomButtonPos();
      this.count = 0;
    }
    if (this.count > this.frames/2) 
      this.jugar.src = 'img/jugar2.png';
  }

  draw() {
    jaws.context.drawImage(this.background, 0, 0);
    jaws.context.drawImage(this.jugar, this.pos[0], this.pos[1]);
  }
}

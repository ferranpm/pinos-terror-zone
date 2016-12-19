class Menu {
  setup() {
    this.frames = 30;
    this.background = Assets.menu.background;

    this.jugar = Assets.menu.button[0];

    this.count = 0;
    this.pos = { x: 0, y: 0 };

    jaws.on_keyup('enter', jaws.switchGameState.bind(null, Game));
  }

  randomButtonPos() {
    return {
      x: Math.round(Math.random()*(jaws.canvas.width - this.jugar.width)),
      y: Math.round(Math.random()*(jaws.canvas.height - this.jugar.height))
    };
  }

  update() {
    if (this.count === 0) {
      this.count = 0;
      this.jugar = Assets.menu.button[0];
      this.pos = this.randomButtonPos();
    }
    if (this.count === this.frames/2) 
      this.jugar = Assets.menu.button[1];
    this.count = (this.count + 1)%this.frames;
  }

  draw() {
    jaws.context.drawImage(this.background, 0, 0);
    jaws.context.drawImage(this.jugar, this.pos.x, this.pos.y);
  }
}

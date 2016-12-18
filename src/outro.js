class Outro {
  setup() {
    this.background = document.createElement('img');
    this.background.src = 'img/background_outro.png';
    jaws.on_keyup('enter', this.toMenu);
  }

  toMenu() {
    jaws.switchGameState(Menu);
  }

  update() {
  }

  draw() {
    jaws.context.drawImage(this.background, 0, 0);
  }
}

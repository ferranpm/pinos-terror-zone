import Assets from './assets.js';
import Menu from './menu.js';

export default class Outro {
  setup() {
    this.background = Assets.outro.background;
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

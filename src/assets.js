import { createImage } from './util.js';

export default {
  menu: {
    background: createImage('assets/images/background_menu.png'),
    button: [
      createImage('assets/images/jugar1.png'),
      createImage('assets/images/jugar2.png'),
    ]
  },

  game: {
    bullet: createImage('assets/images/bullet.png'),
    life: createImage('assets/images/ramen.png'),
    enemies: [
      createImage('assets/images/cage.png'),
      createImage('assets/images/frances.png'),
      createImage('assets/images/steam.png'),
    ],
    player: {
      normal: createImage('assets/images/pino.png'),
      touched: createImage('assets/images/pino_omg.png'),
      eating: createImage('assets/images/pino_nom.png')
    },
    background: [
      createImage('assets/images/pisa.png'),
      createImage('assets/images/eiffel.png'),
      createImage('assets/images/coliseo.png'),
      createImage('assets/images/canada.png'),
      createImage('assets/images/delacroix.png'),
    ],
  },

  outro: {
    background: createImage('assets/images/background_outro.png'),
  },
};

import Menu from './menu.js';

jaws.preventDefaultKeys(['w', 'a', 's', 'd', 'i', 'j', 'k', 'l', 'enter']);
jaws.start(Menu, { fps: 60 });

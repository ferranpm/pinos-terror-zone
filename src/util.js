import jaws from './jaws.js';

export function createImage(path) {
  const image = new Image();
  image.src = path;
  return image;
}

export function outOfBounds(item) {
  return item.x > 0 && item.x < 800 && item.y > 0 && item.y < 600;
}

export function randomPosition(position) {
  const espai = 150;
  const x = Math.round(Math.random()*(jaws.canvas.width-64));
  const y = Math.round(Math.random()*(jaws.canvas.height-64));
  const pos = {
    x, y,
    right: x + 1,
    bottom: y + 1
  };
  const box = {
    x: position.x - espai,
    width: 64 + espai,
    y: position.y - espai,
    height: 90 + espai
  };

  if (!jaws.collideOneWithOne(pos, box)) return pos;
  return randomPosition(position);
}

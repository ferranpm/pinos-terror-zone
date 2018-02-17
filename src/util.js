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
    right: position.x + 64 + espai,
    y: position.y - espai,
    bottom: position.y + 90 + espai
  };

  if (!jaws.collideRects(pos, box)) return pos;
  return randomPosition(position);
}

export const drawItem = item => item.draw();

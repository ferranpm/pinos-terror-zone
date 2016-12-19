function createImage(path) {
  const image = new Image();
  image.src = path;
  return image;
}

function outOfBounds(item) {
  return item.x > 0 && item.x < 800 && item.y > 0 && item.y < 600;
}

const drawItem = (item) => item.draw();

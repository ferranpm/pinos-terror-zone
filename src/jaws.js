
class Sprite {
  constructor({ image, x, y }) {
    this.image = image;
    this.x = x;
    this.y = y;
  }

  get height() {
    return this.image.height;
  }

  get width() {
    return this.image.width;
  }

  setImage(image) {
    this.image = image;
  }

  draw() {
    jaws.context.drawImage(this.image, this.x, this.y)
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

const jaws = {}

jaws.state = {
  keys: {},
};

jaws._keys = {};
jaws._keyup_callbacks = {};

document.addEventListener('keydown', (event) => {
  jaws._keys[event.key.toLowerCase()] = true;
})

document.addEventListener('keyup', (event) => {
  const callbacks = jaws._keyup_callbacks[event.key.toLowerCase()] || [];
  jaws._keys[event.key.toLowerCase()] = false;
  callbacks.forEach(callback => callback(event));
});

jaws.on_keyup = (key, callback) => {
  jaws._keyup_callbacks[key.toLowerCase()] ||= [];
  jaws._keyup_callbacks[key.toLowerCase()].push(callback);
};

jaws.pressed = (key) => jaws._keys[key.toLowerCase()];

jaws.Sprite = Sprite;

jaws.preventDefaultKeys = (keys) => jaws.state.preventKeys = keys;

jaws.switchGameState = (scene) => {
  jaws.state.currentScene = new scene();
  jaws.state.currentScene.setup();
};

jaws.collideOneWithOne = (a, b) => {
  return (
    (a.x >= b.x && a.x <= b.x + b.width || b.x >= a.x && b.x <= a.x + a.width) &&
    (a.y >= b.y && a.y <= b.y + b.height || b.y >= a.y && b.y <= a.y + a.height)
  );
  // return (
  //   a.x < b.x + b.width && a.y < b.y + b.height &&
  //   b.x < a.x + a.width && b.y < a.height + a.y
  // );
};

jaws.collideOneWithMany = (one, others, callback) => {
  const collisions = others.filter(x => jaws.collideOneWithOne(one, x));
  if (callback) collisions.forEach(x => callback(one, x));
  return collisions;
};

jaws.collideManyWithMany = (ones, others, callback) => {
  return ones.forEach(one => {
    return others.forEach((other) => {
      if (jaws.collideOneWithOne(one, other)) {
        callback(one, other);
      }
    });
  });
};

jaws.start = (scene, options) => {
  jaws.canvas = document.getElementsByTagName("canvas")[0];
  jaws.context = jaws.canvas.getContext("2d");
  jaws.state.currentScene = new scene();
  jaws.state.currentScene.setup();
  jaws.state.lastTime = new Date();
  const mspf = (1.0/(options.fps || 30))*1000.0;
  const update = () => {
    const startTime = new Date();
    jaws.state.currentScene.update();
    jaws.state.currentScene.draw();
    const endTime = new Date();

    const timeout = mspf - (endTime - startTime)

    setTimeout(update, timeout);
  };
  update();
};

export default jaws;

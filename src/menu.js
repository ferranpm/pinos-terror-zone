function Menu() {
  var background; 
  var anim;
  var jugar;
  var count;
  var frames = 30;
  var pos;

  this.randomButtonPos = function() {
    var x = Math.round(Math.random()*(jaws.canvas.width - 205));
    var y = Math.round(Math.random()*(jaws.canvas.height - 80));
    return [x, y];
  }

  this.toGame = function() {
    jaws.switchGameState(Game);
  }

  this.setup = function() {
    background = document.createElement('img');
    background.src = 'img/background_menu.png';

    jugar = document.createElement('img');
    jugar.src = 'img/jugar1.png';

    pos = this.randomButtonPos();
    count = 0;

    jaws.on_keyup('enter', this.toGame);
  }

  this.update = function() {
    count++;
    if (count > frames) {
      jugar.src = 'img/jugar1.png';
      pos = this.randomButtonPos();
      count = 0;
    }
    if (count > frames/2) 
      jugar.src = 'img/jugar2.png';
  }

  this.draw = function() {
    jaws.context.drawImage(background, 0, 0);
    jaws.context.drawImage(jugar, pos[0], pos[1]);
  }
}

function Outro() {
  var background;
  this.setup = function() {
    background = document.createElement('img');
    background.src = 'img/background_outro.png';
  }
  this.update = function() {
    if (jaws.pressed('enter')) jaws.switchGameState(Menu);
  }
  this.draw = function() {
    jaws.context.drawImage(background, 0, 0);
  }
}

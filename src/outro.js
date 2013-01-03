function Outro() {
  var background;

  this.toMenu = function() {
    jaws.switchGameState(Menu);
  }

  this.setup = function() {
    background = document.createElement('img');
    background.src = 'img/background_outro.png';
    jaws.on_keyup('enter', this.toMenu);
  }

  this.update = function() {
  }

  this.draw = function() {
    jaws.context.drawImage(background, 0, 0);
  }
}

function Player(options) {
    jaws.Sprite.call(this, {image: 'img/pino.png', x: 500, y: 250});
    this.images = [
        'img/pino.png',
        'img/pino_omg.png',
        'img/pino_nom.png'];
    this.bullets = new Array();
    this.lives = 3;
    this.is_touched = 0;
    this.is_eating = 0;
    this.state = 0;
    this.vel = 8;

    this.touched = function() {
        if (!this.is_touched) {
            if (document.getElementById('sound').checked)
                new Audio('snd/au.wav').play();
            this.lives--;
            this.is_touched = 60;
        }
    }

    this.eat = function() {
        this.lives++;
        if (document.getElementById('sound').checked)
            new Audio('snd/nom.wav').play();
        if (!this.is_eating) {
            this.is_eating = 30;
        }
    }

    this.update = function() {
        if (this.is_eating > 0) {
            this.setImage(this.images[2]);
            this.is_eating--;
        }
        else if (this.is_touched > 0) {
            this.setImage(this.images[1]);
            this.is_touched--;
        }
        else this.setImage(this.images[0]);
        if (jaws.pressed('w') && this.y > 0) this.move(0,-this.vel);
        if (jaws.pressed('s') && this.y < 600-80) this.move(0,this.vel);
        if (jaws.pressed('a') && this.x > 0) this.move(-this.vel,0);
        if (jaws.pressed('d') && this.x < 800-64) this.move(this.vel,0);
    }
}
Player.prototype = jaws.Sprite.prototype;

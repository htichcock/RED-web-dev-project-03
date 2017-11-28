import {
  ballSize,
  ballSpeed,
  ballColor,
  SVG_NS
} from '../settings';

export default class Ball {

  constructor(boardWidth, boardHeight, game, player1, player2) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.radius = ballSize / 2;
    this.direction = this.setDirection();
    this.speed = ballSpeed;
    this.player1 = player1;
    this.player2 = player2;
    this.game = game;
    this.isPaused = true;
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.pong = new Audio('public/sounds/pong-02.wav');
    this.celebrate = new Audio('public/sounds/pong-04.wav');
    this.reset();
  }

  render(svg) {
    if (!this.isPaused) {
      this.setX();
      this.setY();
    }
    this.checkCollision();
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', ballColor);


    svg.appendChild(circle);
  }
  setY() {
    this.y = this.y + (this.speed * this.direction[1]);
  }
  setX() {
    this.x = this.x + (this.speed * this.direction[0]);
  }
  setDirection() {
    let x = Math.ceil(Math.random() * 10);
    let y = Math.ceil(Math.random() * 10);
    let length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    x = x / length;
    y = y / length;
    if (Math.ceil(Math.random() * 2) % 2) {
      x = -x;
    }
    if (Math.ceil(Math.random() * 2) % 2) {
      y = -y;
    }
    return [x, y];
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.speed = ballSpeed;
  }
  goal(player) {
    // this.togglePause(); 
    player.changeScore(player.score + 1);
    this.reset()
    this.direction = this.setDirection();
    if (player.score >= 5) {
      this.game.onWin(player);
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  checkCollision() {
    //check for goals
    if (this.x <= this.radius) {
      this.goal(this.player2);
      this.direction[0] = -Math.abs(this.direction[0]);
      this.celebrate.play();
    }
    if (this.x >= this.boardWidth - this.radius) {
      this.goal(this.player1);
      this.direction[0] = Math.abs(this.direction[0]);
      this.celebrate.play();
    }

    //check for wall bounce
    if (this.y <= this.radius) {
      this.y = this.radius;
      this.direction[1] = -this.direction[1];
      this.pong.play();
    }
    if (this.y >= this.boardHeight - this.radius) {
      this.y = this.boardHeight - this.radius;
      this.direction[1] = -this.direction[1];
      this.pong.play();
    }

    //check for paddle collision 
    //margin of error is ballSpeed since direction vector length is 1
    //not perfect but okay for now
    const playerTwoSideHit =
      this.x + this.radius >= this.player2.x &&
      this.x + this.radius <= this.player2.x + this.speed &&
      this.y >= this.player2.y &&
      this.y <= this.player2.y + this.player2.height;
    const playerOneSideHit =
      this.x - this.radius <= this.player1.x + this.player1.width &&
      this.x - this.radius >= this.player1.x + this.player1.width - this.speed &&
      this.y >= this.player1.y &&
      this.y <= this.player1.y + this.player1.height;


    if (this.direction[0] > 0) {
      if (playerTwoSideHit) {
        this.direction[1] = (this.y - this.player2.y - this.player2.height / 2) / this.player2.height; //sets y vector between -.5 and .5 depends on where it is 
        this.direction[0] = -Math.sqrt(1 - Math.pow(this.direction[1], 2)); //normalize vector to length 1 and reverse x
        this.ping.play();
        this.speed *= (Math.abs(this.direction[1] * 0.5) + 1); //speed up by a max of 1.5times depending on how close to the edge it was hit.
      }
    } else {
      if (playerOneSideHit) {
        this.direction[1] = (this.y - this.player1.y - this.player1.height / 2) / this.player1.height;
        this.direction[0] = Math.sqrt(1 - Math.pow(this.direction[1], 2));
        this.speed *= (Math.abs(this.direction[1] * .5) + 1);
        this.ping.play();
      }

    }
  }



}
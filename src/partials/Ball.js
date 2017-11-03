import { ballSize, ballColor, SVG_NS, KEYS} from '../settings';

export default class Ball {

  constructor(boardWidth, boardHeight, player1, player2) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.radius = ballSize/2;
    this.x = boardWidth/2;
    this.y = boardHeight/2;
    this.direction = this.setDirection();
    this.speed = 5;
    this.player1 = player1;
    this.player2 = player2;
    this.isPaused = false;
    document.addEventListener('keydown', event => {
      if (event.key === KEYS.pausePlay) {this.togglePause();}
    });
  }

  render(svg) {
    let circle = document.createElementNS(SVG_NS, 'circle');
    if (!this.isPaused){
      this.setX();
      this.setY();
    }
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', ballColor);


    svg.appendChild(circle);
  }
  setY() {
    if (this.y <= this.radius || this.y >= this.boardHeight - this.radius) {
      this.direction[1] = -1*this.direction[1];
    }
    this.y = this.y + (this.speed * this.direction[1]);
  }
  setX() {
    if (this.x <= this.radius) {
      this.reset(this.player2)
    }
    if (this.x >= this.boardWidth - this.radius) {
      this.reset(this.player1)
    }
    this.x = this.x + (this.speed * this.direction[0]);
  }
  setDirection() {
    let x  = Math.ceil(Math.random()*10);
    let y  = Math.ceil(Math.random()*10);
    let length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    x = x/length;
    y = y/length;
    if (Math.ceil(Math.random()*2)%2) {
      x = -x;
    }
    if (Math.ceil(Math.random()*2)%2) {
      y = -y;
    }
    return [x,y];
  }

  reset(player) {
    player.score = player.score + 1
    this.togglePause();
    this.x = this.boardWidth/2;
    this.y = this.boardHeight/2;
    this.direction = this.setDirection();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }



}
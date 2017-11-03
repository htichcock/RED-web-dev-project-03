import { paddleWidth , paddleHeight, paddleColor, paddleSpeed, boardGap, KEYS, SVG_NS} from '../settings';



export default class Paddle {

  constructor(boardWidth, boardHeight, player) {
    this.boardHeight = boardHeight;
    this.height = paddleHeight;
    this.width = paddleWidth;
    this.player = player;
    this.y = boardHeight/2 - paddleHeight/2;
    this.speed = paddleSpeed;
    this.score = 0;
    switch (player) {
      case 1:
        this.x = boardGap;
        document.addEventListener('keydown', event => {
          switch (event.key) { 
            case KEYS.playerOneUp: 
              this.upKey = true;
              break;
            case KEYS.playerOneDown: 
              this.downKey = true;
              break;
          }
        });
          document.addEventListener('keyup', event => {
            switch (event.key) { 
              case KEYS.playerOneUp: 
                this.upKey = false;
                break;
              case KEYS.playerOneDown: 
                this.downKey = false;
                break;
            }
        });
        break;
      case 2:
        this.x = boardWidth - boardGap - paddleWidth;
        document.addEventListener('keydown', event => {
          switch (event.key) { 
            case KEYS.playerTwoUp: 
              this.upKey = true;
              break;
            case KEYS.playerTwoDown: 
              this.downKey = true;
              break;
          }
        });
          document.addEventListener('keyup', event => {
            switch (event.key) { 
              case KEYS.playerTwoUp: 
                this.upKey = false;
                break;
              case KEYS.playerTwoDown: 
                this.downKey = false;
                break;
            }
        });
        break;
    }
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', `${paddleColor}`);
    rect.setAttributeNS(null, 'x', this.x);
    if (this.upKey) {
      this.moveUp();
    }
    if (this.downKey) {
      this.moveDown();
    }
    rect.setAttributeNS(null, 'y', this.y);

    svg.appendChild(rect);
  }

  moveUp() {
    this.y = Math.max(this.y - this.speed, 0);
  }
  moveDown() {
    this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
  }
  changeScore(score) {
    this.score = score;
  }
  getCoordinates() {
    return [this.x, this.x + this.width, this.y, this.y + this.height];
  }
}
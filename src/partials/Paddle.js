import {
  paddleWidth,
  paddleHeight,
  paddleColor,
  paddleSpeed,
  scoreSize,
  boardGap,
  KEYS,
  SVG_NS
} from '../settings';
import ScoreBoard from './Score';
import Message from './Message';



export default class Paddle {

  constructor(boardWidth, boardHeight, player) {
    this.boardHeight = boardHeight;
    this.height = paddleHeight;
    this.width = paddleWidth;
    this.player = player;
    this.y = boardHeight / 2 - paddleHeight / 2;
    this.speed = paddleSpeed;
    this.score = 0;
    this.isPaused = true;
    switch (player) {
      case 1: //player1 config
        this.x = boardGap;
        this.upInstruc = new Message(boardWidth / 4, scoreSize / 2, scoreSize / 2, `UP: ${KEYS.playerOneUp}`, '');
        this.downInstruc = new Message(boardWidth / 4, scoreSize, scoreSize / 2, `DOWN: ${KEYS.playerOneDown}`, '');
        this.scoreBoard = new ScoreBoard(boardWidth / 2 - 0.715 * scoreSize, scoreSize, scoreSize);
        document.addEventListener('keydown', event => {
          switch (event.key) {
            case KEYS.playerOneUp:
              this.eraseInstruc(2);
              this.upKey = true;
              if (this.downKey) {
                this.downKey = false;
              }
              break;
            case KEYS.playerOneDown:
              this.eraseInstruc(1);
              this.downKey = true;
              if (this.upKey) {
                this.upKey = false;
              }
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
      case 2: //player2 config
        this.upInstruc = new Message(3 * boardWidth / 4, scoreSize / 2, scoreSize / 2, `UP: ${KEYS.playerTwoUp}`, '');
        this.downInstruc = new Message(3 * boardWidth / 4, scoreSize, scoreSize / 2, `DOWN: ${KEYS.playerTwoDown}`, '');
        this.scoreBoard = new ScoreBoard(boardWidth / 2, scoreSize, scoreSize);
        this.x = boardWidth - boardGap - paddleWidth;
        document.addEventListener('keydown', event => {
          switch (event.key) {
            case KEYS.playerTwoUp:
              this.eraseInstruc(1);
              this.upKey = true;
              if (this.downKey) {
                this.downKey = false;
              }
              break;
            case KEYS.playerTwoDown:
              this.eraseInstruc(2);
              this.downKey = true;
              if (this.upKey) {
                this.upKey = false;
              }
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
    if (!this.isPaused) {
      if (this.upKey) {
        this.moveUp();
      }
      if (this.downKey) {
        this.moveDown();
      }
    }
    rect.setAttributeNS(null, 'y', this.y);
    this.scoreBoard.render(svg, this.score);
    if (this.upInstruc) {
      this.upInstruc.render(svg);
    }
    if (this.downInstruc) {
      this.downInstruc.render(svg);
    }
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
  getScore() {
    return this.score;
  }
  togglePause() {
    this.isPaused = !this.isPaused;
  }
  eraseInstruc(upOrDown) {
    if (!this.isPaused) {
      switch (upOrDown) {
        case 1:
          this.upInstruc = '';
          break
        case 2:
          this.downInstruc = '';
      }
    }

  }
}
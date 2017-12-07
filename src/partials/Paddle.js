import {
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_COLOR,
  PADDLE_SPEED,
  SCORE_SIZE,
  BOARD_GAP,
  KEYS,
  SVG_NS
} from '../settings';
import ScoreBoard from './Score';
import Message from './Message';



export default class Paddle {

  constructor(boardWidth, boardHeight, player) {
    this.boardHeight = boardHeight;
    this.height = PADDLE_HEIGHT;
    this.width = PADDLE_WIDTH;
    this.player = player;
    this.y = boardHeight / 2 - PADDLE_HEIGHT / 2;
    this.speed = PADDLE_SPEED;
    this.score = 0;
    this.isPaused = true;
    switch (player) {
      case 1: //player1 config
        this.x = BOARD_GAP;
        this.upInstruc = new Message(boardWidth / 4, SCORE_SIZE / 2, SCORE_SIZE / 2, `UP: ${KEYS.playerOneUp}`, '');
        this.downInstruc = new Message(boardWidth / 4, SCORE_SIZE, SCORE_SIZE / 2, `DOWN: ${KEYS.playerOneDown}`, '');
        this.scoreBoard = new ScoreBoard(boardWidth / 2 - 0.715 * SCORE_SIZE, SCORE_SIZE, SCORE_SIZE);
        this.addKeyListeners( KEYS.playerOneUp, KEYS.playerOneDown );
        break;
      case 2: //player2 config
        this.upInstruc = new Message(3 * boardWidth / 4, SCORE_SIZE / 2, SCORE_SIZE / 2, `UP: ${KEYS.playerTwoUp}`, '');
        this.downInstruc = new Message(3 * boardWidth / 4, SCORE_SIZE, SCORE_SIZE / 2, `DOWN: ${KEYS.playerTwoDown}`, '');
        this.scoreBoard = new ScoreBoard(boardWidth / 2, SCORE_SIZE, SCORE_SIZE);
        this.x = boardWidth - BOARD_GAP - PADDLE_WIDTH;
        this.addKeyListeners( KEYS.playerTwoUp, KEYS.playerTwoDown );
        break;
    }
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', `${PADDLE_COLOR}`);
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
  addKeyListeners(up, down) {
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case up:
          this.eraseInstruc(1);
          this.upKey = true;
          if (this.downKey) {
            this.downKey = false;
          }
          break;
        case down:
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
        case up:
          this.upKey = false;
          break;
        case down:
          this.downKey = false;
          break;
      }
    });
  }
  
}
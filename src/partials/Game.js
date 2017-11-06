import {
	SVG_NS,
	KEYS
} from '../settings';
import Board from './Board';
import Ball from './Ball';
import Paddle from './Paddle';
import Message from './Message';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.createGameElements();
		this.setInitialProperties();
		document.addEventListener('keydown', event => {
			if (event.key === KEYS.pausePlay) {
				this.togglePause();
			}
		});
	}

	render() {
		if (this.newGame) {
			if (!this.isPaused) {
				this.newGame = !this.newGame;
				this.createGameElements();
				this.setInitialProperties();
			}
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');

		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.message.render(svg);
	}

	togglePause() {
		if (this.isPaused) {
			this.message = new Message(0, 0, 0, '', '');
		} else {
			this.message = new Message(this.width / 2, this.height / 2, 35, 'Paused!', 'Press space to continue');
		}
		this.isPaused = !this.isPaused;
		this.ball.togglePause();
		this.player1.togglePause();
		this.player2.togglePause();
	}

	onWin(player) {
		this.isPaused = false;
		this.togglePause();
		this.newGame = true;
		this.message = new Message(this.width / 2, this.height / 2, 35, `Player${player.player} Wins!`, 'Press space to continue');
	}
	setInitialProperties() {
		this.isPaused = true;
		this.newGame = false;
	}
	createGameElements() {
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
		this.player1 = new Paddle(this.width, this.height, 1);
		this.player2 = new Paddle(this.width, this.height, 2);
		this.ball = new Ball(this.width, this.height, this, this.player1, this.player2);
		this.message = new Message(this.width / 2, this.height / 2, 35, 'Ready?', 'Press space to continue');
	}

}
import { SVG_NS } from '../settings';
import Board from './Board';
import Ball from './Ball';
import Paddle from './Paddle';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
		this.player1 = new Paddle(this.width, this.height, 1);
		this.player2 = new Paddle(this.width, this.height, 2);
		this.ball = new Ball(this.width, this.height, this, this.player1, this.player2);
	}

	render() {
		
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');

		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.player1.render(svg);
		this.player2.render(svg);
		
	}
	
}
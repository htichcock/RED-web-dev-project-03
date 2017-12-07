import {
  SVG_NS,
  PADDLE_COLOR
} from '../settings';
import ScoreBoard from './Score';

export default class Message extends ScoreBoard {
  constructor(x, y, size, message, sub) {
    super(x, y, size);
    this.message = message;
    this.subMessage = sub;
  }

  render(svg) {
    let text = document.createElementNS(SVG_NS, 'text');
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.setAttributeNS(null, 'alignment-baseline', 'central');
    text.setAttributeNS(null, 'x', this.x);
    text.setAttributeNS(null, 'y', this.y);
    text.setAttributeNS(null, 'font-size', this.size)
    text.setAttributeNS(null, 'fill', `${ PADDLE_COLOR }`);
    let subText = document.createElementNS(SVG_NS, 'text');
    subText.setAttributeNS(null, 'text-anchor', 'middle');
    subText.setAttributeNS(null, 'alignment-baseline', 'central');
    subText.setAttributeNS(null, 'x', this.x);
    subText.setAttributeNS(null, 'y', this.y + this.size);
    subText.setAttributeNS(null, 'font-size', this.size / 2)
    subText.setAttributeNS(null, 'fill', `${ PADDLE_COLOR }`);

    text.innerHTML = `${this.message}`
    subText.innerHTML = `${this.subMessage}`
    svg.appendChild(text);
    svg.appendChild(subText);
  }

}
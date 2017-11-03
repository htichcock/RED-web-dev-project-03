import './styles/game.css';
import Game from './partials/Game'
import { gameWidth, gameHeight } from './settings';

// create a game instance
const game = new Game('game', gameWidth, gameHeight);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();

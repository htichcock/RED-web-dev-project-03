import './styles/game.css';
import Game from './partials/Game'
import {
    GAME_WIDTH,
    GAME_HEIGHT
} from './settings';

// create a game instance
const game = new Game('game', GAME_WIDTH, GAME_HEIGHT);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();
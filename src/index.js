import SnakeGame from './SnakeGame';
import {AUTO_START} from './config';

const game = new SnakeGame();
game.init();

if (AUTO_START) game.start();

if (module.hot) {
  module.hot.accept('./SnakeGameLogic', () => {
    console.log('heyhey');
    game.cleanup();
    game.init();
    if (AUTO_START) game.start();
  })
}

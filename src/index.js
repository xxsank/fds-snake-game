import SnakeGame from './SnakeGame';
import SnakeGameLogic from './SnakeGameLogic';

const game = new SnakeGame(SnakeGameLogic);
game.init();

if (module.hot) {
  module.hot.accept('./SnakeGameLogic', () => {
    console.log('heyhey');
    game.cleanup();
    game.init();
  })
}

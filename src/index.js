import SnakeGame from './SnakeGame';

const game = new SnakeGame();
game.init();

if (module.hot) {
  module.hot.accept('./SnakeGameLogic', () => {
    console.log('heyhey');
    game.cleanup();
    game.init();
  })
}

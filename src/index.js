import './css/style.css';
import Game from './js/Game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game('#game-root');
  game.init();
});

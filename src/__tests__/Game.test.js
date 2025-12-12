/**
 * @jest-environment jsdom
 */

import Game from '../js/Game';
jest.mock('../img/goblin.png', () => 'test-file-stub');

describe('Game with event delegation', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<div id="game-root"></div>';
    game = new Game('#game-root');
    jest.useFakeTimers();
    game.init();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Goblin click increases score', () => {
    const index = game.goblin.currentIndex;
    const cell = game.cells[index];

    game.goblin.img.click();

    expect(game.score).toBe(1);
    expect(cell.contains(game.goblin.img)).toBe(false);
    expect(document.getElementById('score').textContent).toBe('1');
  });

  test('Missed goblins increase missed counter', () => {
    const index = game.goblin.currentIndex;
    const cell = game.cells[index];

    jest.advanceTimersByTime(1000);

    expect(game.missed).toBe(1);
    expect(cell.contains(game.goblin.img)).toBe(false);
    expect(document.getElementById('missed').textContent).toBe('1');
  });

  test('Game stops after maxMissed missed goblins', () => {
    jest.advanceTimersByTime(game.maxMissed * 1000);

    expect(game.missed).toBe(game.maxMissed);
    const gameOverDiv = document.getElementById('game-over');
    expect(gameOverDiv.style.display).toBe('block');
    expect(document.getElementById('final-score').textContent).toBe(game.score.toString());
  });
});

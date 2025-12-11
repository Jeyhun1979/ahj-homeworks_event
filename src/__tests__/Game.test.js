/**
 * @jest-environment jsdom
 */

import Game from '../js/Game';
jest.mock('../img/goblin.png', () => 'test-file-stub');

describe('Game with event delegation', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    game = new Game('#root');
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
  });

  test('Missed goblins increase missed counter', () => {
    const index = game.goblin.currentIndex;
    const cell = game.cells[index];

    jest.advanceTimersByTime(1000);

    expect(game.missed).toBe(1);
    expect(cell.contains(game.goblin.img)).toBe(false);
  });

  test('Game stops after 5 missed goblins', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    jest.advanceTimersByTime(5000);

    expect(game.missed).toBe(5);
    expect(window.alert).toHaveBeenCalledWith(
      `Игра окончена. Ваш счёт: ${game.score}`
    );
  });
});

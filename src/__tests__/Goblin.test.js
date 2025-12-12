import Goblin from '../js/Goblin';
jest.mock('../img/goblin.png', () => 'test-file-stub');

describe('Goblin class', () => {
  let goblin;

  beforeEach(() => {
    goblin = new Goblin();
  });

  test('img should have correct src', () => {
    expect(goblin.img.src).toContain('test-file-stub');
  });

  test('img should have class "goblin"', () => {
    expect(goblin.img.classList.contains('goblin')).toBe(true);
  });

  test('img should have alt attribute', () => {
    expect(goblin.img.alt).toBe('Гоблин');
  });

  test('currentIndex should be null initially', () => {
    expect(goblin.currentIndex).toBeNull();
  });
});

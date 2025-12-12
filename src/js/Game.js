import Goblin from './Goblin';

export default class Game {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.fieldSize = 4;
    this.cells = [];
    this.goblin = new Goblin();
    this.score = 0;
    this.missed = 0;
    this.maxMissed = 5; 
    this.currentTimeout = null;
    this.isGameOver = false;
  }

  init() {
    const container = document.createElement('div');
    container.id = 'game-container';
    container.style.display = 'flex';
    container.style.alignItems = 'flex-start';

    this.root.append(container);

    this.createScoreBoard(container);
    this.createField(container);
    this.addEventListeners();
    this.showGoblin();
  }

  createField(container) {
    const field = document.createElement('div');
    field.classList.add('game-field');

    for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      field.append(cell);
      this.cells.push(cell);
    }

    container.append(field);
  }

  createScoreBoard(container) {
    const board = document.createElement('div');
    board.id = 'score-board';
    board.innerHTML = `
      <p>Счёт: <span id="score">0</span></p>
      <p>Пропущено: <span id="missed">0</span></p>
      <div id="game-over" style="display:none;">
        <p>Игра окончена. Ваш счёт: <span id="final-score"></span></p>
      </div>
    `;
    board.style.marginLeft = '20px';
    container.append(board);
  }

  updateScoreBoard() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('missed').textContent = this.missed;
  }

  addEventListeners() {
    this.root.addEventListener('click', (event) => {
      if (event.target === this.goblin.img) {
        this.score++;
        this.goblin.img.remove();
        if (this.currentTimeout) {
          clearTimeout(this.currentTimeout);
          this.currentTimeout = null;
        }
        this.updateScoreBoard();

        if (!this.isGameOver) {
          this.showGoblin();
        }
      }
    });
  }

  showGoblin() {
    if (this.missed >= this.maxMissed) {
      this.stopGame();
      return;
    }

    const previousIndex = this.goblin.currentIndex;
    const index = this.getRandomIndex(previousIndex);

    if (previousIndex !== null && this.cells[previousIndex].contains(this.goblin.img)) {
      this.goblin.img.remove();
    }

    this.cells[index].append(this.goblin.img);
    this.goblin.currentIndex = index;

    this.currentTimeout = setTimeout(() => {
      if (this.cells[index].contains(this.goblin.img)) {
        this.goblin.img.remove();
        this.missed++;
        this.updateScoreBoard();
      }

      if (this.missed >= this.maxMissed) {
        this.stopGame();
      } else if (!this.isGameOver) {
        this.showGoblin();
      }
    }, 1000);
  }

  getRandomIndex(prevIndex) {
    let index;
    do {
      index = Math.floor(Math.random() * (this.fieldSize * this.fieldSize));
    } while (index === prevIndex);
    return index;
  }

  stopGame() {
    this.isGameOver = true;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    this.goblin.img.remove();

    const gameOverDiv = document.getElementById('game-over');
    document.getElementById('final-score').textContent = this.score;
    gameOverDiv.style.display = 'block';
  }
}

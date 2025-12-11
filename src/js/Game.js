import Goblin from './Goblin';

export default class Game {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.fieldSize = 4;
    this.cells = [];
    this.goblin = new Goblin();
    this.score = 0;
    this.missed = 0;
    this.currentTimeout = null;
    this.isGameOver = false;
  }

  init() {
    this.createField();
    this.addEventListeners();
    this.showGoblin();
  }

  createField() {
    const field = document.createElement('div');
    field.classList.add('game-field');

    for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      field.append(cell);
      this.cells.push(cell);
    }

    this.root.append(field);
  }

  addEventListeners() {
    this.root.addEventListener('click', (event) => {
      if (event.target === this.goblin.img) {
        this.score++;
        const index = this.goblin.currentIndex;
        if (this.cells[index].contains(this.goblin.img)) {
          this.cells[index].removeChild(this.goblin.img);
        }
        if (this.currentTimeout) {
          clearTimeout(this.currentTimeout);
          this.currentTimeout = null;
        }
        if (!this.isGameOver) {
          this.showGoblin();
        }
      }
    });
  }

  showGoblin() {
    if (this.missed >= 5) {
      this.stopGame();
      return;
    }

    const previousIndex = this.goblin.currentIndex;
    const index = this.getRandomIndex(previousIndex);

    if (previousIndex !== null && this.cells[previousIndex].contains(this.goblin.img)) {
      this.cells[previousIndex].removeChild(this.goblin.img);
    }

    this.cells[index].append(this.goblin.img);
    this.goblin.currentIndex = index;

    this.currentTimeout = setTimeout(() => {
      if (this.cells[index].contains(this.goblin.img)) {
        this.cells[index].removeChild(this.goblin.img);
        this.missed++;
      }

      if (this.missed >= 5) {
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
    if (this.cells[this.goblin.currentIndex]?.contains(this.goblin.img)) {
      this.cells[this.goblin.currentIndex].removeChild(this.goblin.img);
    }
    alert(`Игра окончена. Ваш счёт: ${this.score}`);
  }
}

import goblinImage from '../img/goblin.png';

export default class Goblin {
  constructor() {
    this.img = document.createElement('img');
    this.img.src = goblinImage;
    this.img.alt = 'Гоблин'; 
    this.img.classList.add('goblin');
    this.currentIndex = null;
  }
}

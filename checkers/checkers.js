class Checker {
  // класс шашка. создает саму шашку, задает ее цвет и обозначает методы движения
  constructor(posLetter, posNumber, color) {
    this.posLetter = posLetter;
    this.posNumber = posNumber;
    this.color = color;
    this.pos = `pos-${this.posNumber}-${this.posLetter}`;
  }

  geretateCheck() {}
}

class Simple extends Checker {
  // класс простой шашки. здесь написано ее движение и цвет, а также принимает позицию.
  constructor(posLetter, posNumber, color) {
    super(posLetter, posNumber, color);
    this.pos = `pos-${this.posNumber}-${this.posLetter}`;
  }

  generateCheck() {
    const check = document.createElement(`div`);
    check.style.cssText = `background-color: ${this.color};
    border: 2px solid gray;
    border-radius: 50px;
    width: 40px;
    height:40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);`;
    /*check.addEventListener(`click`, () => {
      this.handleMove()
    })*/
    return check;
  }
}

class Lady extends Checker {
  // здесь написаны движение дамки
  constructor() {}
}

class Field {
  // создание поля при помощи класса клетки
  constructor() {}
  generateField() {
    //const div = document.getElementById(`container`);
    const table = document.getElementsByTagName(`table`)[0];
    const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`];
    const human = new Human();
    const bot = new Bot();
    let checks = [];
    for (let i = 0; i < 8; i++) {
      const tr = document.createElement(`tr`);
      checks[i] = [];
      for (let j = 0; j < 8; j++) {
        let cellColor = (i + j) % 2 === 0 ? "white" : "black";
        const cell = new Cell(cellColor, `pos-${i + 1}-${letters[j]}`);
        const cellElement = cell.generateCell();
        if (i == 3 || i == 4) {
          tr.appendChild(cellElement);
          continue;
        }
        if (i + 1 == 6 || i + 1 == 7 || i + 1 == 8) {
          checks[i][j] = human.generateCheck(letters[j], i + 1);
        } else {
          checks[i][j] = bot.generateCheck(letters[j], i + 1);
        }
        if (cellColor == `black`) {
          cellElement.append(checks[i][j]);
        }
        tr.append(cellElement);
      }
      table.append(tr);
    }
  }
}

class Player {
  constructor() {}
}

class Human extends Player {
  constructor() {
    super()
    this.check = [];
  }
  generateCheck(posL, posN) {
    const check = new Simple(posL, posN, `white`).generateCheck();
    check.addEventListener(`click`, () => {
      alert(`${posL} + ${posN}`);
    });
    this.check.push(check);
    return check;
  }
}

class Bot extends Player {
  constructor() {
    super()
    this.check = [];
  }
  generateCheck(posL, posN) {
    const check = new Simple(posL, posN, `black`).generateCheck();
    check.addEventListener(`click`, () => {
      alert(`${posL} + ${posN} + BOT`);
    });
    this.check.push(check);
    return check;
  }
}

class Cell {
  constructor(color, id) {
    this.color = color;
    this.id = id;
  }

  generateCell() {
    const cell = document.createElement(`th`);
    cell.setAttribute(`id`, this.id);
    cell.style.cssText = `
    border: 1px solid rgb(32, 159, 209);
    width: 7%;
    padding-top: 10%; 
    position: relative;`;
    return cell;
  }
}

class Rules {
  constructor() {}
}

class Game {
  constructor() {}
}

class Application {
  constructor() {}
}

(function () {
  const field = new Field();
  field.generateField();
})();

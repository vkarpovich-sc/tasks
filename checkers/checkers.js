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
    //check.setAttribute(`id`, this.pos)
    check.setAttribute(`id`, this.pos);
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

  constructor() {
    this.field = [];
  }

  generateField(Human, Bot) {
    //const div = document.getElementById(`container`);
    const table = document.getElementsByTagName(`table`)[0];
    const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`];
    let checks = [];
    this.field = [];

    for (let i = 0; i < 8; i++) {
      const tr = document.createElement(`tr`);
      checks[i] = [];
      this.field[i] = [];
      for (let j = 0; j < 8; j++) {
        let cellColor = (i + j) % 2 === 0 ? "white" : "black";
        const cell = new Cell(
          cellColor,
          `pos-${i + 1}-${letters[j]}`
        ).generateCell();
        // const cellElement = cell.generateCell();
        if (i == 3 || i == 4) {
          this.field[i][j] = cell;
          tr.appendChild(cell);
          continue;
        }
        if (i + 1 == 6 || i + 1 == 7 || i + 1 == 8) {
          checks[i][j] = Human.generateCheck(letters[j], i + 1);
          this.field[i][j] = `pos-${letters[j]}-${i + 1}`;
        } else {
          checks[i][j] = Bot.generateCheck(letters[j], i + 1);
          this.field[i][j] = `pos-${letters[j]}-${i + 1}`;
        }
        if (cellColor == `black`) {
          cell.append(checks[i][j]);
          this.field[i][j] = checks[i][j];
        }
        tr.append(cell);
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
    super();
    this.check = [];
  }
  checkNearest(field, n1, n2) {
    console.log(field[n1][n2])
    console.log(field[n1 - 1][n2 + 1])
      if (field[n1 - 1][n2 + 1]!=`div` && field[n1 - 1][ n2 -1] != `div`) {
        let rowEl1 = document.getElementById(`${field[n1 - 1][n2 + 1].id}`)
        let rowEl2 = document.getElementById(`${field[n1 - 1][n2 - 1].id}`)
        rowEl1.style.backgroundColor = `yellow`
        rowEl2.style.backgroundColor = `yellow`
      }
  }
  checkMove(field, target) {
    const id = target.id;


    let check = null
    field.forEach((innerArray) => {
      innerArray.forEach((el) => {
        if (el.id == id){
          check = el
        // alert(`${field[field.indexOf(innerArray)][innerArray.indexOf(el)].id} + ${innerArray.indexOf(el)}`)
          this.checkNearest(field,field.indexOf(innerArray),  innerArray.indexOf(el))
        }
      });
    });
  }
  generateCheck(posL, posN) {
    const check = new Simple(posL, posN, `white`).generateCheck();
    // check.addEventListener(`click`, () => {
    //   alert(`${posL} + ${posN}`);
    // });
    this.check.push(check);
    return check;
  }
}

class Bot extends Player {
  constructor() {
    super();
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

  changeColor(cell, cellColor) {
    cellColor == `yellow`
      ? (cell.style.backgroundColor = `blue`)
      : cell.style.backgroundColor == `yellow`;
  }
}

class Rules {
  constructor() {}
}

class Game {
  constructor() {}

  startGame() {
    const field = new Field();
    const human = new Human();
    const bot = new Bot();
    field.generateField(human, bot);
    document.addEventListener("click", (event) => {
      if (event.target.localName === `div`) {
        human.checkMove(field.field, event.target);
      }
    });
    console.log(field.field);
  }
}

class Application {
  constructor() {}
}

(function () {
  const game = new Game();
  game.startGame();
})();

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
          this.field[i][j] = cell;
        } else {
          checks[i][j] = Bot.generateCheck(letters[j], i + 1);
          this.field[i][j] = cell;
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
    this.clickedFigure = null;
  }
  handleCheck(element, field) {
    field.forEach((innerArray) => {
      innerArray.forEach((el) => {
        if (el.id == element) {
          let th = document.getElementsByTagName(`th`);
          th = Array.from(th);
          let thWithChild = th.find((el) => {
            el.id == element;
          });
          thWithChild.firstChild = null;
          field[indexOf(innerArray)][indexOf(el)] = element;
        }
      });
    });
  }
  checkNearest(field, n1, n2) {
    const cell = new Cell();
    switch (true) {
      case field[n1 - 1][n2 - 1] == undefined &&
        field[n1 - 1][n2 + 1].localName != `div`:
        cell.highlightMoves(`${field[n1 - 1][n2 + 1].id}`);
        break;
      case field[n1 - 1][n2 + 1] == undefined &&
        field[n1 - 1][n2 - 1].localName != `div`:
        cell.highlightMoves(`${field[n1 - 1][n2 - 1].id}`);
        break;
      case field[n1 - 1][n2 + 1] == undefined &&
        field[n1 - 1][n2 - 1] == undefined:
        alert(`ходить нельзя`);
        break;

      case field[n1 - 1][n2 + 1].localName != `div` &&
        field[n1 - 1][n2 - 1].localName != `div`:
        cell.highlightMoves(
          `${field[n1 - 1][n2 + 1].id}`,
          `${field[n1 - 1][n2 - 1].id}`
        );
        break;

      case field[n1 - 1][n2 + 1].localName != `div` &&
        field[n1 - 1][n2 - 1].localName == `div`:
        cell.highlightMoves(`${field[n1 - 1][n2 + 1].id}`);
        break;
      case field[n1 - 1][n2 + 1].localName == `div` &&
        field[n1 - 1][n2 - 1].localName != `div`:
        cell.highlightMoves(`${field[n1 - 1][n2 - 1].id}`);
        break;

      case field[n1 - 1][n2 + 1].localName == `div` &&
        field[n1 - 1][n2 + 1].style.backgroundColor == `black` &&
        field[n1 - 2][n2 + 2].localName != `div`:
        cell.highlightMoves(`${field[n1 - 2][n2 + 2].id}`);
        // this.handleCheck( field[n1 - 1][n2 + 1].id, field)
        break;
      case field[n1 - 1][n2 - 1].localName == `div` &&
        field[n1 - 1][n2 - 1].style.backgroundColor == `black` &&
        field[n1 - 2][n2 - 2].localName != `div`:
        cell.highlightMoves(`${field[n1 - 2][n2 - 2].id}`);
        // this.handleCheck( field[n1 - 1][n2 - 1].id, field)
        break;
    }
  }
  checkMove(field, target) {
    const id = target.id;

    field.forEach((innerArray) => {
      innerArray.forEach((el) => {
        if (el.id == id) {
          this.clickedFigure = el.id;
          this.checkNearest(
            field,
            field.indexOf(innerArray),
            innerArray.indexOf(el)
          );
        }
      });
    });
  }

  handleMove(element, field, event) {
    field.forEach((innerArray) => {
      innerArray.forEach((el) => {
        if (el.id == event.target.id) {
          field[field.indexOf(innerArray)][innerArray.indexOf(el)] = element;
          console.log(`element - ${element}`);
          console.log(
            `f - ${field[field.indexOf(innerArray)][innerArray.indexOf(el)]}`
          );
        }

        if (el == element) {
          const cell = new Cell(`white`, el.id);
          field[field.indexOf(innerArray)][innerArray.indexOf(el)] =
            cell.generateCell();
          console.log(`el.id = ${el.id}`);

          element.id = event.target.id;
          event.target.append(element);
          cell.highlightMoves();
        }
      });
    });
    return field;
  }
  generateCheck(posL, posN) {
    const check = new Simple(posL, posN, `white`).generateCheck();
    this.check.push(check);
    return check;
  }
}

class Bot extends Player {
  constructor() {
    super();
    this.check = [];
    // this.clickedFigure = null;
  }

  handleMove(field) {
    const random = Math.floor(Math.random() * 12);

    const check = this.check[random];

    field.forEach((innerArray) => {
      innerArray.forEach((el) => {
        if (el.id == check.id) {
          const cell = new Cell(`black`, check.id);
          field[field.indexOf(innerArray)][innerArray.indexOf(check)] =
            cell.generateCell();
        }
      });
      innerArray.forEach((pos) => {
        const human = new Bot();
        if (
          pos.localName != `div` &&
          pos.style.backgroundColor == `rgb(23, 126, 211)`
        ) {
          check.id = pos.id;
          const string = check.id;
          let g = string.split(`-`);

          field[field.indexOf(innerArray)][innerArray.indexOf(pos)] =
            human.generateCheck(g[2], g[1]);
          pos.append(human.generateCheck(g[2], g[1]));
        }
      });
    });
    return field;
  }

  generateCheck(posL, posN) {
    const check = new Simple(posL, posN, `black`).generateCheck();
    /*check.addEventListener(`click`, () => {
      alert(`${posL} + ${posN} + BOT`);
    });*/
    this.check.push(check);
    return check;
  }
}

class Cell {
  static previousCells = [];
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

  highlightMoves(...ids) {
    const cell = [];

    for (let i = 0; i < Cell.previousCells.length; i++) {
      Cell.previousCells[i].style.backgroundColor = `rgb(23, 126, 211)`;
    }
    for (let i = 0; i < ids.length; i++) {
      cell[i] = document.getElementById(ids[i]);
      if (!Cell.previousCells.includes(cell[i])) {
        Cell.previousCells.push(cell[i]);
      }
      cell[i].style.backgroundColor = `yellow`;
    }
  }
}

class Rules {
  constructor() {}
}

class Game {
  constructor() {}
  generateHistoryField(move) {
    const div = document.getElementById(`container`);
    div.style.cssText = `display: grid;
     gap: 20px;
     grid-template-columns: 100% 10%;`;
    const innerDiv = document.getElementById(`innerDiv`);
    const p = document.createElement(`p`);
    p.innerHTML = move;
    innerDiv.append(p);
  }
  startGame() {
    const field = new Field();
    const human = new Human();
    const bot = new Bot();
    field.generateField(human, bot);

    document.addEventListener("click", (event) => {
      if (
        event.target.localName === `div` &&
        event.target.style.backgroundColor == `white`
      ) {
        human.checkMove(field.field, event.target);
      } else if (event.target.style.backgroundColor == `yellow`) {
        this.generateHistoryField(event.target.id);

        let a = document.getElementsByTagName(`div`);

        a = Array.from(a);

        a = a.find((el) => el.id == human.clickedFigure);

        field.field = human.handleMove(a, field.field, event);
       

        console.log(field.field);
      }
      field.field = bot.handleMove(field.field);
    });
  }
}

class Application {
  constructor() {}
}

(function () {
  const game = new Game();
  game.startGame();
})();

class Checker {
  static counter = 0;
  constructor(posLetter, posNumber, color) {
    this.posLetter = posLetter;
    this.posNumber = posNumber;
    this.color = color;
    this.pos = `pos-${this.posNumber}-${this.posLetter}`;
  }

  geretateCheck() {}
}

class Simple extends Checker {
  constructor(posLetter, posNumber, color) {
    super(posLetter, posNumber, color);
    this.pos = `pos-${this.posNumber}-${this.posLetter}`;
  }

  generateCheck() {
    const check = document.createElement(`div`);

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
    return check;
  }
}

class Lady extends Checker {
  constructor() {}
}

class Field {
  constructor() {
    this.field = [];
  }

  generateField(Human, Bot) {
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

  checkJump(field, n1, n2, cell, expression) {
    let i = 1;
    let lastFreeCell = null;

    const checking = () => {
      let isCellEmpty = null;

      if (expression == 1) {
        isCellEmpty =
          field[n1 - i][n2 - i] == undefined ||
          field[n1 - i][n2 - i]?.localName === "div" ||
          field[n1 - i][n2 - i] === null;

        if (isCellEmpty && cell.style.backgroundColor != "white") {
          if (n1 - i < 0 || n2 - i < 0) {
            return null;
          }
          i++;
          lastFreeCell = field[n1 - i][n2 - i];

          if (
            isCellEmpty &&
            (lastFreeCell === undefined ||
              lastFreeCell === null ||
              lastFreeCell.localName != "th")
          ) {
            return null;
          } else if (field[n1 - i][n2 - i].style.backgroundColor != "white") {
            checking();
          }
        } else {
          const FREEPOS = field[n1 - i][n2 - i];
          const lastPos = field[n1 - i - 1][n2 - i + 1];

          if (
            FREEPOS.localName != "div" &&
            lastPos.style.backgroundColor != "white" &&
            i >= 2
          ) {
            lastFreeCell = FREEPOS;
          }
        }
      }

      if (expression == 2) {
        isCellEmpty =
          field[n1 - i][n2 + i] == undefined ||
          field[n1 - i][n2 + i]?.localName === "div" ||
          field[n1 - i][n2 + i] === null;

        if (isCellEmpty && cell.style.backgroundColor != "white") {
          if (n2 + i >= field.length || n1 - i < 0) {
            return null;
          }
          i++;
          lastFreeCell = field[n1 - i][n2 + i];

          if (
            isCellEmpty &&
            (lastFreeCell === undefined ||
              lastFreeCell === null ||
              lastFreeCell.localName != "th")
          ) {
            return null;
          } else if (field[n1 - i][n2 + i].style.backgroundColor != "white") {
            checking();
          }
        } else {
          const FREEPOS = field[n1 - i][n2 + i];
          const lastPos = field[n1 - i - 1][n2 + i - 1];

          if (
            FREEPOS.localName != "div" &&
            lastPos.style.backgroundColor != "white" &&
            i >= 2
          ) {
          }
        }
      }
    };
    if (cell.style.backgroundColor === "black" && cell.localName === `div`) {
      checking();
    } else {
      return null;
    }
    i = 1;
    let lastPos = null;
    expression == 1
      ? (lastPos = field[n1 - 1][n2 - 1])
      : (lastPos = field[n1 - 1][n2 + 1]);
    if (
      lastFreeCell &&
      lastFreeCell.localName != `div` &&
      lastPos &&
      lastPos.style.backgroundColor != `white`
    ) {
      console.log(`lastFreecell - ${lastFreeCell.id}`);
      return lastFreeCell;
    } else {
      return null;
    }
  }

  checkNearest(field, n1, n2) {
    const cell = new Cell();
    const cell1 = field[n1 - 1][n2 + 1];
    const cell2 = field[n1 - 1][n2 - 1];
    const cell1IsEmpty = cell1 == undefined || cell1.localName === "div";
    const cell2IsEmpty = cell2 == undefined || cell2.localName === "div";
    const checkCondition = (
      cell,
      cellToCheck,
      highlight,
      cellToHighlight = cellToCheck
    ) => {
      const FREEPOS2 = this.checkJump(field, n1, n2, cellToCheck, 2);
      const FREEPOS1 = this.checkJump(field, n1, n2, cellToCheck, 1);
      if (FREEPOS1 != null && FREEPOS2 != null) {
        cell.highlightMoves(FREEPOS1.id, FREEPOS2.id);
      } else if (FREEPOS1 != null && FREEPOS2 == null) {
        cell.highlightMoves(FREEPOS1.id);
      } else if (FREEPOS2 != null && FREEPOS1 == null) {
        cell.highlightMoves(FREEPOS2.id);
      } else {
        if (highlight && cellToHighlight) {
          cell.highlightMoves(cellToHighlight?.id);
        }
      }
    };
    switch (true) {
      case cell2IsEmpty && !cell1IsEmpty:
        if (cell2 != undefined || cell2 != null) {
          checkCondition(cell, cell2, true, cell1);
        } else {
          cell.highlightMoves(cell1.id);
        }
        break;
      case cell1IsEmpty && !cell2IsEmpty:
        if (cell1 != undefined || cell1 != null) {
          checkCondition(cell, cell1, true, cell2);
        } else {
          cell.highlightMoves(cell2.id);
        }
        break;
      case cell1IsEmpty && cell2IsEmpty:
        if (cell1 != undefined || cell1 != null) {
          checkCondition(cell, cell1, false);
        }
        if (cell2 != undefined || cell2 != null) {
          checkCondition(cell, cell2, false);
        }
        break;
      case !cell1IsEmpty && !cell2IsEmpty:
        cell.highlightMoves(cell1.id, cell2.id);
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
        }

        if (el == element) {
          const cell = new Cell(`black`, el.id);
          field[field.indexOf(innerArray)][innerArray.indexOf(el)] =
            cell.generateCell();

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
  }

  handleMove(field) {
    const random = Math.floor(Math.random() * 12);

    const check = this.check[random];

    field.forEach((innerArray) => {
      innerArray.forEach((pos) => {
        if (
          pos.localName != `div` &&
          pos.style.backgroundColor == `rgb(23, 126, 211)`
        ) {
          check.id = pos.id;
          const string = pos.id;
          let g = string.split(`-`);

          field[field.indexOf(innerArray)][innerArray.indexOf(pos)] =
            this.generateCheck(g[2], g[1]);
          pos.append(this.generateCheck(g[2], g[1]));
        }
      });
    });
    return field;
  }

  generateCheck(posL, posN) {
    const check = new Simple(posL, posN, `black`).generateCheck();
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
  static whiteChecks = 12;
  static blackChecks = 12;
  constructor() {
    this.cellToClick1 = null;
    this.cellToClick2 = null;
  }

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
  static removeBlackCheck(id, field) {
    const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`];
    let nums = id.split(`-`);
    console.log(`id - ${id}`);
    Game.blackChecks--;
    const game = new Game();
    //  game.generateHistoryField(nums[0]);
    //  game.generateHistoryField(nums[1]);
    //  game.generateHistoryField(nums[2]);
    //  let k = nums.join(`-`);
    //  game.generateHistoryField(k);
    //  game.generateHistoryField(`index of nums[2] = ${letters.indexOf(nums[2])}`)
    console.log(`nums[1] - ${parseInt(nums[1])}`);
    const newPos1 = field[parseInt(nums[1])][letters.indexOf(nums[2]) + 1];
    const newPos2 = field[parseInt(nums[1])][letters.indexOf(nums[2]) - 1];
    console.log(`newPos - 1 - ${newPos1.id}, newPos2 - ${newPos2.id}`);
    if (
      newPos1.localName == `div` &&
      newPos1.style.backgroundColor == `black`
    ) {
      game.generateHistoryField(`вы сбили шашку врага`);
      game.generateHistoryField(`шашек врага осталось ${Game.blackChecks}`);
      const cell = new Cell(`black`, newPos1.id);
      field[parseInt(nums[1])][letters.indexOf(nums[2]) + 1] =
        cell.generateCell();

      document.getElementById(newPos1.id).replaceWith(` empty`);
    }
    return field;
  }

  static removeWhiteCheck() {
    Game.whiteChecks--;
    const game = new Game();
    game.generateHistoryField(`вы сбили шашку врага`);
    game.generateHistoryField(`шашек врага осталось ${Game.whiteChecks}`);
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
        Game.removeBlackCheck(event.target.id, field.field);
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

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
    width: 60px;
    height:60px;
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
  constructor(color, direction) {
    super();
    this.check = [];
    this.clickedFigure = null;
    this.color = color;
    this.direction = direction;
  }

  checkJump(field, n1, n2, cell, expression, sign) {
    let i = 1;
    let lastFreeCell = null;

    const checking = () => {
      let isCellEmpty = null;

      if (expression == 1) {
        isCellEmpty =
          field[eval(`${n1}${sign}${i}`)][n2 - i] == undefined ||
          field[eval(`${n1}${sign}${i}`)][n2 - i]?.localName === "div" ||
          field[eval(`${n1}${sign}${i}`)][n2 - i] === null ||
          field[eval(`${n1}${sign}${i}`)][n2 - i].style.backgroundColor ==
            this.color;

        if (isCellEmpty && cell.style.backgroundColor != this.color) {
          if (eval(`${n1}${sign}${i}`) < 0 || n2 - i < 0) {
            return null;
          }

          i++;
          if (n2 - i >= 0 && (n1 - i >= 0 || n1 + i < field.length)) {
            lastFreeCell = field[eval(`${n1}${sign}${i}`)][n2 - i];
          } else {
            return null;
          }
          if (
            isCellEmpty &&
            (lastFreeCell === undefined ||
              lastFreeCell === null ||
              lastFreeCell.localName != "th")
          ) {
            return null;
          } else if (
            field[eval(`${n1}${sign}${i}`)][n2 - i].style.backgroundColor !=
            this.color
          ) {
            checking();
          }
        } else {
          const FREEPOS = field[eval(`${n1}${sign}${i}`)][n2 - i];
          const lastPos = field[eval(`${n1}${sign}${i} - 1`)][n2 - i + 1];

          if (
            FREEPOS.localName != "div" &&
            lastPos.style.backgroundColor != this.color &&
            i >= 2
          ) {
            lastFreeCell = FREEPOS;
          }
        }
      }

      if (expression == 2) {
        isCellEmpty =
          field[eval(`${n1}${sign}${i}`)][n2 + i] == undefined ||
          field[eval(`${n1}${sign}${i}`)][n2 + i]?.localName === "div" ||
          field[eval(`${n1}${sign}${i}`)][n2 + i] === null ||
          field[eval(`${n1}${sign}${i}`)][n2 + i].style.backgroundColor ==
            this.color;
        if (isCellEmpty && cell.style.backgroundColor != this.color) {
          if (n2 + i >= field.length || n1 - i < 0) {
            return null;
          } else {
            i++;
            if (
              n2 + i < field.length &&
              (n1 - i >= 0 || n1 + i < field.length)
            ) {
              lastFreeCell = field[eval(`${n1}${sign}${i}`)][n2 + i];

              console.log(`lCell = ${lastFreeCell}`);
            } else {
              return null;
            }
          }

          if (
            isCellEmpty &&
            (lastFreeCell === undefined ||
              lastFreeCell === null ||
              lastFreeCell.localName != "th")
          ) {
            return null;
          } else if (
            field[eval(`${n1}${sign}${i}`)][n2 + i].style.backgroundColor !=
            this.color
          ) {
            checking();
          }
        } else {
          const FREEPOS = field[eval(`${n1}${sign}${i}`)][n2 + i];
          const lastPos = field[eval(`${n1}${sign}${i} - 1`)][n2 + i - 1];

          if (
            FREEPOS.localName != "div" &&
            lastPos.style.backgroundColor != this.color &&
            i >= 2
          ) {
            lastFreeCell = FREEPOS;
          }
        }
      }
    };
    let oppositeColor = null;
    this.color == `white`
      ? (oppositeColor = `black`)
      : (oppositeColor = `white`);
    if (
      cell.style.backgroundColor === oppositeColor &&
      cell.localName === `div`
    ) {
      checking();
    } else {
      return null;
    }
    i = 1;
    let lastPos = null;
    expression == 1
      ? (lastPos = field[eval(`${n1}${sign}1`)][n2 - 1])
      : (lastPos = field[eval(`${n1}${sign}1`)][n2 + 1]);
    if (
      lastFreeCell &&
      lastFreeCell.localName != `div` &&
      lastPos &&
      lastPos.style.backgroundColor != this.color
    ) {
      return lastFreeCell;
    } else {
      return null;
    }
  }

  checkNearest(field, n1, n2, sign) {
    const cell = new Cell();
    const cell1 = field[eval(`${n1}${sign}1`)][n2 + 1];
    const cell2 = field[eval(`${n1}${sign}1`)][n2 - 1];
    const cell1IsEmpty = cell1 == undefined || cell1.localName === "div";
    const cell2IsEmpty = cell2 == undefined || cell2.localName === "div";
    const checkCondition = (
      cell,
      cellToCheck,
      highlight,
      cellToHighlight = cellToCheck
    ) => {
      const FREEPOS2 = this.checkJump(field, n1, n2, cellToCheck, 2, sign);
      const FREEPOS1 = this.checkJump(field, n1, n2, cellToCheck, 1, sign);
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
    //console.log(`id - ${target.id}`);
    const id = target.id;
    let sign = null;
    this.direction == 0 ? (sign = `-`) : (sign = `+`);
    field.forEach((innerArray) => {
      innerArray.forEach((el) => {
        if (el.id == id) {
          this.clickedFigure = el.id;

          this.checkNearest(
            field,
            field.indexOf(innerArray),
            innerArray.indexOf(el),
            sign
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
    const check = new Simple(posL, posN, this.color).generateCheck();

    this.check.push(check);
    return check;
  }
}

class Bot extends Player {
  constructor(color) {
    super();
    this.check = [];
    this.color = color;
  }

  generateCheck(posL, posN) {
    const check = new Simple(posL, posN, this.color).generateCheck();
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
    this.turn = 0;
  }

  chooseSide() {
    return new Promise((resolve) => {
      const OPTIONS = document.getElementById("options");
      const CONTAINER = document.getElementById("container");
      OPTIONS.style.cssText = `
        position:absolute;
        width: 100%;
        height: 80%;`;
      CONTAINER.style.display = "none";

      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      const innerContainer = document.createElement(`div`);

      const h2 = document.createElement("h2");
      h2.innerText = "Выберите сторону: черные или белые";

      div1.style.cssText = ` position: relative; width: 80%; height: 80%; border: 3px solid black; margin: auto; text-align: center;`;
      div2.style.cssText = `background-color: white; width: 120px; height: 120px; border: 3px solid black; cursor: pointer; border-radius: 100px;`;
      div3.style.cssText = `background-color: black; width: 120px; height: 120px; border: 3px solid black; cursor: pointer;border-radius: 100px;`;
      innerContainer.style.cssText = `display: flex; flex-direction: row; justify-content: space-around;`;

      div1.append(h2);
      innerContainer.append(div2);
      innerContainer.append(div3);
      div1.append(innerContainer);
      div1.addEventListener("click", (event) => {
        if (event.target.localName == `div`) {
          if (event.target.style.backgroundColor == `black`) {
            OPTIONS.style.display = `none`;
            CONTAINER.style.display = `grid`;
            resolve({ color: `black` });
          } else if (event.target.style.backgroundColor == `white`) {
            OPTIONS.style.display = `none`;
            CONTAINER.style.display = `grid`;
            resolve({ color: `white` });
          }
        }
      });
      OPTIONS.append(div1);
    });
  }

  chooseOpponent() {
    // выбираем с кем играть: с ботом или игроком номер 2
    return new Promise((resolve) => {});
  }
  isGameOver() {
    if (Game.whiteChecks > Game.blackChecks) {
      this.generateHistoryField(Game.blackChecks);
      // this.generateHistoryField(`Победили белые`);
    } else {
      // this.generateHistoryField(`победили черные`);
    }
  }
  handlePlayersMove(human, field, isOpp, cell) {
    return new Promise((resolve, reject) => {
      const handleClick = (event) => {
        if (
          event.target.localName === `div` &&
          event.target.style.backgroundColor == human.color
        ) {
          cell.highlightMoves();
          human.checkMove(field.field, event.target);
        } else if (event.target.style.backgroundColor == `yellow`) {
          this.generateHistoryField(`попали на клетку - ${event.target.id} `);

          let a = document.getElementsByTagName(`div`);

          a = Array.from(a);

          a = a.find((el) => el.id == human.clickedFigure);
          field.field = Game.removeCheck(
            event.target.id,
            field.field,
            human.color,
            isOpp
          );
          field.field = human.handleMove(a, field.field, event);

          this.isGameOver();
          document.removeEventListener(`click`, handleClick);
          resolve(field.field);
          console.log(field.field);
        }
      };
      document.addEventListener("click", handleClick);

      // resolve(field.field);
    });
  }

  handleBotsMove(bot, field) {
    field.field = bot.handleMove(field.field);
    return field.field;
  }
  generateHistoryField(move) {
    const div = document.getElementById(`container`);
    div.style.cssText = `display: grid;
     gap: 20px;
     grid-template-columns: 100% 10%;`;
    const innerDiv = document.getElementById(`innerDiv`);
    innerDiv.style.cssText = `
    max-height: 400px;
    overflow-y:scroll;
     border: 2px solid black;`;
    const p = document.createElement(`p`);
    p.style.cssText = `border-bottom: 1px solid black;
    padding:2px;`;
    p.innerHTML = move;
    innerDiv.append(p);
  }

  static removeCheck(id, field, color, isOpp) {
    const game = new Game();
    const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`];
    const ids = id.split(`-`);
    game.generateHistoryField(`id - ${id} && ids[1] = ${parseInt(ids[1])}`);
    Game.blackChecks--;
    const realPos = parseInt(ids[1]) - 1;
    game.generateHistoryField(`realPos - ${realPos}`);
    let newPos1 = null;
    let newPos2 = null;
    if (isOpp) {
      newPos1 = field[parseInt(ids[1]) - 2][letters.indexOf(ids[2]) + 1];
      newPos2 = field[parseInt(ids[1]) - 2][letters.indexOf(ids[2]) - 1];
    } else {
      newPos1 = field[parseInt(ids[1])][letters.indexOf(ids[2]) + 1];
      newPos2 = field[parseInt(ids[1])][letters.indexOf(ids[2]) - 1];
    }

    //console.log(`newPos1.id = ${newPos1.id}, newPos2.id = ${newPos2.id}`);

    const replaceCellWithBlack = (cell) => {
      //const game = new Game();
      // game.generateHistoryField(`вы сбили шашку врага`);
      //game.generateHistoryField(`шашек врага осталось ${Game.blackChecks}`);
      const newCell = new Cell(`black`, cell.id);
      game.generateHistoryField(`cell.id = ${cell.id}`);
      const ths = Array.from(document.getElementsByTagName(`th`));
      const targetCell = ths.find((el) => el.id == cell.id);
      game.generateHistoryField(`id cell которую опустошаем-`, targetCell.id);
      targetCell.innerHTML = ` `;
      return newCell.generateCell();
    };

    let oppositeColor = null;
    color == `white` ? (oppositeColor = `black`) : (oppositeColor = `white`);
    console.log(`oppositeColor - ${oppositeColor}`);
    if (
      newPos1 &&
      newPos1.localName == `div` &&
      newPos1.style.backgroundColor == oppositeColor
    ) {
      isOpp
        ? (field[parseInt(ids[1]) - 2][letters.indexOf(ids[2]) + 1] =
            replaceCellWithBlack(newPos1))
        : (field[parseInt(ids[1])][letters.indexOf(ids[2]) + 1] =
            replaceCellWithBlack(newPos1));

      return field;
    } else if (
      newPos2 &&
      newPos2.localName == `div` &&
      newPos2.style.backgroundColor == oppositeColor
    ) {
      isOpp
        ? (field[parseInt(ids[1]) - 2][letters.indexOf(ids[2]) + 1] =
            replaceCellWithBlack(newPos2))
        : (field[parseInt(ids[1])][letters.indexOf(ids[2]) + 1] =
            replaceCellWithBlack(newPos2));
      return field;
    }

    return field;
  }
  static removeWhiteCheck() {
    Game.whiteChecks--;
    const game = new Game();
    game.generateHistoryField(`вы сбили шашку врага`);
    game.generateHistoryField(`шашек врага осталось ${Game.whiteChecks}`);
  }

  async startGame() {
    const { color } = await this.chooseSide();
    console.log(color);
    let human = null;
    let human2 = null;
    let bot = null;
    if (color == `white`) {
      human = new Human(`white`, 0);
      human2 = new Human(`black`, 1);
      bot = new Bot(`black`);
    } else {
      human = new Human(`black`, 0);
      human2 = new Human(`white`, 1);
      bot = new Bot(`white`);
    }
    const field = new Field();
    const cell = new Cell();
    field.generateField(human, human2);
    // this.generateHistoryField(`игра началась`)
    while (true) {
      if (this.turn == 0) {
        field.field = await this.handlePlayersMove(human, field, false, cell);

        this.turn = 1;
      } else if (this.turn == 1) {
        field.field = await this.handlePlayersMove(human2, field, true, cell);

        this.turn = 0;
      }
      console.log(this.turn);
    }
  }
}

class Application {
  constructor() {}
}

(function () {
  const game = new Game();
  game.startGame();
})();

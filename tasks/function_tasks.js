/*Написать реализацию вычисления числа Фибоначчи через рекурсию 
с подсчетом количества произведенных вызовов функции. 
Подсчет количества вызовов функции реализовать через замыкание. */

const fib = () => {
  let numberOfCalls = 0;
  const fibonachi = (number) => {
    numberOfCalls++;
    return number <= 1 ? number : fibonachi(number - 1) + fibonachi(number - 2);
  };

  const getCount = () => {
    return numberOfCalls;
  };

  return {
    fibonachi,
    getCount,
  };
};

let smth = fib();
console.log(
  `Число Фиббоначи для 8 - ${smth.fibonachi(8)}`,
  `число вызовов рекурсии - ${smth.getCount()}`
);

/*Реализовать вычисление функции Аккермана через рекурсию с мемоизацией (кешированием) промежуточных результатов.
 Функция растет очень быстро, поэтому ограничиться вычислением А(3, 3), А(3, n) или А(4, 2). */

const memoizeAckerman = () => {
  let cache = {};
  const calculateAckerman = (m, n) => {
    if (m === 0) {
      return n + 1;
    } else if (m > 0 && n === 0) {
      return calculateAckerman(m - 1, 1);
    } else if (m > 0 && n > 0) {
      return calculateAckerman(m - 1, calculateAckerman(m, n - 1));
    }
  };
  const calculate = (m, n) => {
    if (m in cache && n in cache[m]) {
      console.log("Fetching from cache");
      return cache[m][n];
    } else {
      console.log(`calculating...`);
      if (!(m in cache)) {
        cache[m] = {};
      }
      let result = calculateAckerman(m, n);
      cache[m][n] = result;
      return cache[m][n];
    }
  };

  return calculate;
};

let aw = memoizeAckerman();
console.log(aw(1, 2));

console.log(aw(1,2));

/*Реализовать генератор псевдослучайных чисел */

const genPseudoRandomNumber = (startPoint, a, c, m, count) => {
  let result = [];
  let x = startPoint;
  for (let i = 0; i < count; i++) {
    x = (a * x + c) % m;
    result.push(x);
  }

  return result;
};


let startPoint = 2;
let a = 145;
let c = 5678;
let m = 11;

let count = 5;
let random = genPseudoRandomNumber(startPoint,a,c,m,count)

console.log(random)

/*Реализовать с помощью замыкания колоду карт, которая будет выдавать необходимое количество карт по запросу, можно без рандома.*/

const createDeck = () => {
  const suits = ["пики", "черви", "бубны", "крести"];
  const ranks = ["6", "7", "8", "9", "10", "J", "D", "K", "A"];

  let deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(suits[i] + " " + ranks[j]);
    }
  }

  const giveCards = (count) => {
    let cards = [];
    if (count > deck.length) console.log("не хватает карт в колоде");

    for (let k = 0; k < count; k++) {
      let randomCard = Math.floor(Math.random() * deck.length);
      cards.push(deck.splice(randomCard, 1));
    }
    return cards;
  };
  return { give: giveCards };
};

const deck = createDeck();

let res = deck.give(34);

console.log(res);

res = deck.give(5);

console.log(res);


/*Рубли и копейки словами. Получить на ввод количество рублей и копеек и вывести в правильной форме в виде текста, 
например, три рубля, одиннадцать рублей тридцать пять копеек, двадцать две копейки. */

const rubels = prompt("введите количество рублей", 10);
const coins = prompt("введите количество копееек", 10);

const check = (cash) => {
  cash = Number(cash);
  return cash % 10;
};

const output = (rub, coins) => {
  div = document.getElementById("container");
  const rubRemain = check(rub);
  const coinsRemain = check(coins);
  switch (rubRemain) {
    case 1:
      console.log(rub);
      div.innerHTML += `<h1>${rub} рубль</h1>`;
      break;
    case 2:
    case 3:
    case 4:
      console.log(rub);
      div.innerHTML += `<h1>${rub} рубля</h1>`;
      break;
    case 0:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      console.log(rub);
      div.innerHTML += `<h1>${rub} рублей</h1>`;
      break;
  }

  switch (coinsRemain) {
    case 1:
      div.innerHTML += `<h1>${coins} копейка</h1>`;
      break;
    case 2:
    case 3:
    case 4:
      div.innerHTML += `<h1>${coins} копейки</h1>`;
      break;
    case 0:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      div.innerHTML += `<h1>${coins} копеек</h1>`;
      break;
  }
};

output(rubels, coins);

/*Крестики-Нолики. Реализовать игру Крестики-Нолики (консольный вариант) */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const players = ["PlayerX", "PlayerY"];

const checkIfWin = (field, symbol) => {
  for (let i = 0; i < 3; i++) {
    if (
      field[i][0] === symbol &&
      field[i][1] === symbol &&
      field[i][2] === symbol
    ) {
      console.log("You Win");
      rl.close();
      return;
    }
  }

  for (let j = 0; j < 3; j++) {
    if (
      field[0][j] === symbol &&
      field[1][j] === symbol &&
      field[2][j] === symbol
    ) {
      console.log("You Win");
      rl.close();
      return;
    }
  }

  if (
    (field[0][0] === symbol &&
      field[1][1] === symbol &&
      field[2][2] === symbol) ||
    (field[0][2] === symbol && field[1][1] === symbol && field[2][0] === symbol)
  ) {
    console.log("You Win");
    rl.close();
    return;
  }
};

const question = async (field, player) => {
  try {
    let symbol = "";
    let player = "";
    for (let y = 0; y < 9; y++) {
      const posX = await prompt(
        "What do you want to cross? (choose X - direction): "
      );

      const posY = await prompt(
        "What do you want to cross? (choose Y - direction): "
      );
      if (player == "PlayerX") {
        symbol = "X";
        field[posX][posY] = `${symbol}`;
        checkIfWin(field, symbol);
        player = players[1];
      } else {
        symbol = "O";
        field[posX][posY] = `${symbol}`;
        checkIfWin(field, symbol);
        player = players[0];
      }

      console.log("Free to use:", field);
      console.log(`Ur turn ${player}`);
    }
  } catch (e) {
    console.error("Unable to prompt", e);
  }

  return field;
};

const crossZero = async () => {
  try {
    let field = {};
    for (let i = 0; i < 3; i++) {
      field[i] = [];
      for (let j = 0; j < 3; j++) {
        field[i][j] = "_";
      }
    }

    console.log("Free to use:", field);
    console.log(`start ${players[1]}`);
    field = await question(field, players[0]);
  } catch (e) {
    console.error("Unable to prompt", e);
  }
};

crossZero();





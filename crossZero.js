const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const players = ["PlayerX", "Bot"];
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

const findX = (field, enSign) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (field[i][j] == `${enSign}`) {
        return {
          posX: i,
          posY: j,
        };
      } else continue;
    }
  }
};

const bot = (field, sign, enSign) => {
  let winCombinations = [
    [field[0][0], field[0][1], field[0][2]],
    [field[0][0], field[1][0], field[2][0]],
    [field[1][0], field[1][1], field[1][2]],
    [field[2][0], field[2][1], field[2][2]],
    [field[0][1], field[1][1], field[2][1]],
    [field[0][2], field[1][2], field[2][2]],
  ];
  winCombinations[0][0] = field[0][0];
  winCombinations[0][1] = field[0][1];
  winCombinations[0][2] = field[0][2];
  winCombinations[1][0] = field[0][0];
  winCombinations[1][1] = field[1][0];
  winCombinations[1][2] = field[2][0];
  winCombinations[2][0] = field[1][0];
  winCombinations[2][1] = field[1][1];
  winCombinations[2][2] = field[1][2];
  winCombinations[3][0] = field[2][0];
  winCombinations[3][1] = field[2][1];
  winCombinations[3][2] = field[2][2];
  winCombinations[4][0] = field[0][1];
  winCombinations[4][1] = field[1][1];
  winCombinations[4][2] = field[2][1];
  winCombinations[5][0] = field[0][2];
  winCombinations[5][1] = field[1][2];
  winCombinations[5][2] = field[2][2];
  if (bot.counter >= 6) {
    bot.counter = 0;
  }
  //let chosenCombination = Math.floor(Math.random() * 6);
  while (
    winCombinations[bot.chosenCombination][bot.counter] == `${enSign}` ||
    winCombinations[bot.chosenCombination][bot.counter + 1] == `${enSign}`
  ) {
    let newCombination = null;
    newCombination = Math.floor(Math.random() * 6);
    bot.chosenCombination = newCombination;
    bot.counter = 0;
  }

  winCombinations[bot.chosenCombination][bot.counter] = `${sign}`;

  field[0][0] = winCombinations[0][0];
  field[0][1] = winCombinations[0][1];
  field[0][2] = winCombinations[0][2];
  field[0][0] = winCombinations[1][0];
  field[1][0] = winCombinations[1][1];
  field[2][0] = winCombinations[1][2];
  field[1][0] = winCombinations[2][0];
  field[1][1] = winCombinations[2][1];
  field[1][2] = winCombinations[2][2];
  field[2][0] = winCombinations[3][0];
  field[2][1] = winCombinations[3][1];
  field[2][2] = winCombinations[3][2];
  field[0][1] = winCombinations[4][0];
  field[1][1] = winCombinations[4][1];
  field[2][1] = winCombinations[4][2];
  field[0][2] = winCombinations[5][0];
  field[1][2] = winCombinations[5][1];
  field[2][2] = winCombinations[5][2];
  bot.counter++;
  return field;
};

const question = async (field, players) => {
  try {
    let symbol = "";
    let player = players[0];
    for (let y = 0; y < 18; y++) {
      if (player == "PlayerX") {
        const posX = await prompt(
          "What do you want to cross? (choose X - direction): "
        );

        const posY = await prompt(
          "What do you want to cross? (choose Y - direction): "
        );
        symbol = "X";
        field[posX][posY] = `${symbol}`;

        checkIfWin(field, "X");
        player = players[1];
      } else {
        symbol = "O";
        field = bot(field, symbol, "X");
        checkIfWin(field, symbol);
        player = players[0];
      }

      console.log(
        "Free to use:",
        `\n`,
        field[0],
        `\n`,
        field[1],
        `\n`,
        field[2]
      );
      console.log(`Ur turn ${player}`);
    }
  } catch (e) {
    console.error("Unable to prompt", e);
  }

  return field;
};

const crossZero = async () => {
  try {
    let field = [];
    for (let i = 0; i < 3; i++) {
      field[i] = [];
      for (let j = 0; j < 3; j++) {
        field[i][j] = "_";
      }
    }

    console.log("Free to use:", `\n`, field[0], `\n`, field[1], `\n`, field[2]);
    console.log(`start ${players[0]}`);
    bot.counter = 0;
    bot.chosenCombination = Math.floor(Math.random() * 6);
    field = await question(field, players);
  } catch (e) {
    console.error("Unable to prompt", e);
  }
};

crossZero();

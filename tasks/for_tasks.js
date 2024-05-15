/*Вычислить n! */
let res = n;
for (let i = 1; i < n; i++) {
  res = res * i;
  if (i == n - 1) {
    alert(res);
  }
}

/*Дано пятизначное число. Найти число, получаемое при прочтении его цифр справа налево. 
Строки не использовать. */

function reverseNumber(number) {
  let reversed = 0;
  for (let n = number; n > 0; n = Math.floor(n / 10)) {
    reversed = reversed * 10 + (n % 10);
  }
  return reversed;
}

const originalNumber = 12345;
const reversedNumber = reverseNumber(originalNumber);

console.log(
  `Число, получаемое при прочтении цифр ${originalNumber} справа налево: ${reversedNumber}`
);

/*Напечатать таблицу перевода 1, 2, ... 20 долларов США
 в рубли по текущему курсу */
const currency = async () => {
  const currency_table = await fetch(`https://open.er-api.com/v6/latest/USD`)
    .then((res) => res.json())
    .then((data) => {
      return data.rates.BYN;
    });
  console.log(currency_table, typeof currency_table);

  return Number(currency_table);
};

(async function () {
  const byn_currency = await currency();
  console.log(typeof byn_currency);
  const container = document.getElementById("container");
  const table = document.createElement("Table");
  table.innerHTML = `<tr>
    <th>USD</th>
    <th>BYN</th>
    </tr>`;
  container.appendChild(table);
  for (let i = 0; i < 21; i++) {
    table.innerHTML += `<tr>
      <th>${i}</th>
      <th>${i * byn_currency}</th>
      </tr>`;
  }
})();

/*Напечатать таблицу Пифагора */

(function () {
  const container = document.getElementById("container");
  const table = document.createElement("Table");
  table.innerHTML = `<tr id="row">
    <th>X</th>
    </tr>`;
  container.appendChild(table);
  for (let i = 1; i < 11; i++) {
    let row = document.getElementById("row");
    row.innerHTML += `<th>${i}</th>`;
    table.innerHTML += `<tr id="column${i}"> </tr>`;

    for (let j = 0; j < 11; j++) {
      let jCopy = j;
      let column = document.getElementById(`column${i}`);
      j == 0
        ? (column.innerHTML += `<th>${(1 + jCopy) * i}</th>`)
        : (column.innerHTML += `<th>${j * i}</th>`);
    }
  }
})();

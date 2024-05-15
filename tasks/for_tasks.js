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

/*Напечатать таблицу перевода 1, 2, ... 20 долларов США в рубли по текущему курсу */

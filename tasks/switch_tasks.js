/*Мастям игральных карт условно присвоены следующие порядковые 
номера: масти "пики" — 1, масти "трефы" — 2, масти "бубны" — 3,
 масти "червы" — 4, а достоинству карт: "валету" — 11, 
 "даме" — 12, "королю" — 13, "тузу" — 14
(порядковые номера карт остальных достоинств соответствуют их
названиям: "шестерка", "девятка" и т. п.). 
По заданным номеру масти m (1 m 4) и номеру достоинства карты k
(6 k 14) определить полное название (масть и достоинство) 
соответствующей карты в виде "Дама пик", "Шестерка бубен"
 и т. п.*/

let m = prompt("введите масть от 1-4", 1);
let k = prompt("введите карту от 6-14", 6);
m = Number(m);
k = Number(k);

const ms = ["пики", "трефы", "бубны", "червы"];
const ks = [
  "шестерка",
  "семерка",
  "восьмерка",
  "девятка",
  "десятка",
  "валет",
  "дама",
  "король",
  "туз",
];

const check = (k, m) => {
  if (6 <= k <= 14) {
    alert(ms[m - 1] + " " + ks[k - 6]);
  }
};
switch (m) {
  case 1:
    check(k, 1);
    break;
  case 2:
    check(k, 2);
    break;
  case 3:
    check(k, 3);
    break;
  case 4:
    check(k, 4);
    break;
}

/* Дано целое число p (1 p 365). Определить, каким днем недели 
(понедельником, вторником, ..., субботой или воскресеньем)
является p-й день невисокосного года, 
в котором 1 января – понедельник*/

let p = prompt("введите день года", 345);
const leftOver = p % 7;
const days = ["Monday", "Tuesday", "wednesday", "thursday", "friday"];

switch (leftOver) {
  case 6:
    if (1 <= p < 100) {
      alert("суббота");
    } else if (100 <= k <= 365) alert("воскресенье");
    break;
  case 0:
    if (1 <= p < 100) {
      alert("воскресенье");
    }
    break;

  case 5:
    if (100 <= p <= 365) {
      alert("суббота");
    } else if (1 <= k < 100) alert("пятница");
    break;

  case 1:
  case 2:
  case 3:
  case 4:
    if (1 <= p < 100) {
      alert(days[leftOver - 1]);
    } else if (100 <= p <= 365) alert(days[leftOver]);
    break;
}

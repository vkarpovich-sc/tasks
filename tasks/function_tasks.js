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

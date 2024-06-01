// Птицы
// Базовый класс птица с полем имя. И методами заглушками: полет, бег, плавание. Классы наследники: курица, пингвин, утка, страус, в которых переопределить соответствующие методы.
class Bird {
  constructor(name) {
    this.name = name;
  }
  fly() {
    console.log(`${this.name} can fly`);
  }
  run() {
    console.log(`${this.name} can run`);
  }
  swim() {
    console.log(`${this.name} can swim`);
  }
}

class Chicken extends Bird {
  fly() {
    console.log(`${this.name} can fly for only 13 seconds`);
  }
  run() {
    console.log(`${this.name} can run sometimes`);
  }
  swim() {
    console.log(`${this.name} can't  swim`);
  }
}

class Penguin extends Bird {
  fly() {
    console.log(`${this.name} can't fly`);
  }
  run() {
    console.log(`${this.name} can run `);
  }
  swim() {
    console.log(`${this.name} very good at swimming`);
  }
}

class Duck extends Bird {
  fly() {
    console.log(`${this.name} can fly`);
  }
  run() {
    console.log(`${this.name} can run `);
  }
  swim() {
    console.log(`${this.name} pretty good at floating`);
  }
}

class Ostrich extends Bird {
  fly() {
    console.log(`${this.name} can't fly at all`);
  }
  run() {
    console.log(`${this.name} can run as fast as a car`);
  }
  swim() {
    console.log(`${this.name} not bad at swimming`);
  }
}

// Счета
// Базовый класс счет с методами вывода, добавления денег на счет и снятия денег со счета. Классы наследники: текущий – с простыми процентами и срочный со сложными процентами.
// Реализовать методы роста вклада за n лет в зависимости от числа процентов

class Account {
  constructor(money) {
    this.money = money;
  }

  checkAccount() {
    console.log(`на счете ${this.money}`);
  }

  addMoney(cashToAdd) {
    this.money += cashToAdd;
    console.log(`положено на счет ${cashToAdd} \n на счете ${this.money}`);
  }

  getMoney(moneyToWithdraw) {
    if (moneyToWithdraw > this.money) {
      console.log(`На счете нет таких средств, счет:${this.money}`);
      return;
    } else {
      this.money -= moneyToWithdraw;
      console.log(
        `снято со счета ${moneyToWithdraw} \n на счете ${this.money}`
      );
    }
  }
}

class Current extends Account {
  constructor(money, time, stake) {
    super(money);
    this.time = time;
    this.stake = stake;
    this.capital = this.money;
  }
  getPercents() {
    const s = this.capital * (1 + this.time * this.stake);
    console.log(`ваша наращенная сумма ${s}`);
  }
}

class Express extends Current {
  constructor(money, time, stake) {
    super(money, time, stake);
    this.capital = this.money;
  }
  getPercents() {
    const s = this.capital * ((1 + this.stake / 100) ^ this.time);
    console.log(`ваша наращенная сумма ${s}`);
  }
}
let a = new Express(10, 5, 2);
a.getPercents();
a.addMoney(20);
a.getPercents();
// Работники
// Построить три класса (базовый и 2 потомка), описывающих некоторых работников с почасовой оплатой (один из потомков) и фиксированной оплатой (второй потомок).
//Описать в базовом классе абстрактный метод для расчета среднемесячной заработной платы. Для «повременщиков» формула для расчета такова:
// «среднемесячная заработная плата = 20.8 * 8 * почасовую ставку»,
// для работников с фиксированной оплатой:
// «среднемесячная заработная плата = фиксированной месячной оплате».
// a) Упорядочить всю последовательность работников по убыванию среднемесячного заработка. При совпадении зарплаты – упорядочивать данные по алфавиту по имени.
// Вывести идентификатор работника, имя и среднемесячный заработок для всех элементов списка.
// b) Вывести первые 5 имен работников из полученного в пункте а) массива.
// c) Вывести последние 3 идентификатора работников из полученного в пункте а) массива.

class Worker {
  constructor(name) {
    this.name = name;
    this.salary = 0;
    this.id = Date.now();
  }

  getSalary() {
    return this.salary;
  }
  static averagePayment(workerA, workerB) {
    if (workerA.getSalary() != workerB.getSalary()) {
      return workerB.getSalary() - workerA.getSalary();
    } else {
      return workerA.name.localeCompare(workerB.name);
    }
  }

  static getFirstFiveNames(arr) {
    const sortedWorkers = arr.sort(Worker.averagePayment);
    const firstFiveNames = sortedWorkers
      .slice(0, 5)
      .map((worker) => worker.name);
    return firstFiveNames;
  }
  static getLastThreeIds(arr) {
    const sortedWorkers = arr.sort(Worker.averagePayment);
    const lastThreeId = sortedWorkers
      .slice(sortedWorkers.length - 3, sortedWorkers.length)
      .map((worker) => worker.id);
    return lastThreeId;
  }
}

class HourPaymentWorker extends Worker {
  constructor(name, salaryPerHour) {
    super(name);
    this.salaryPerHour = salaryPerHour;
  }

  getSalary() {
    const salary = 20.8 * 8 * this.salaryPerHour;

    this.salary = salary;
    return salary;
  }
}

class AverageMonthSalaryWorker extends Worker {
  constructor(name, salary) {
    super(name);
    this.salary = salary;
  }

  getSalary() {
    return this.salary;
  }
}
let workers = [
  new AverageMonthSalaryWorker("Vadim", 832),
  new HourPaymentWorker("Ilya", 4.3),
  new Worker(`Nikita`),
  new HourPaymentWorker(`Matsvei`, 7.8),
  new AverageMonthSalaryWorker(`Vitaliy`, 500),
  new AverageMonthSalaryWorker(`Kosnatin`, 900),
  new HourPaymentWorker(`Alexand`, 60),
  new Worker(`Viacheslav`),
];
let d = workers.sort(Worker.averagePayment);
let b = Worker.getFirstFiveNames(workers);
let c = Worker.getLastThreeIds(workers);
console.log(a);
console.log(b);
console.log(c);
// Класс-контейнер для водоплавающих
// Реализовать класс-контейнер для водоплавающих: лодка, гусь, утка, катер,
//спасательный
//жилет. Набор доступных операций определяется интерфейсами объектов,
// помещаемых в контейнер.
// Дополнительный элемент контейнера – топор.

class Container {
  constructor() {
    this.classes = [];
    this.axe = `Топор`;
  }

  addClass(obj) {
    this.classes.push(obj);
  }
  do() {
    this.classes.forEach((obj) => obj.do());
  }

  useAxe() {
    console.log(`${this.axe}  замахнулся и рубанул`);
  }
}

class Goose {
  do() {
    console.log(`Goose is flying`);
  }
}

class Duck {
  do() {
    console.log(`Duck is ducking`);
  }
}

class Boat {
  do() {
    console.log(`Boat is boating`);
  }
}

class SafeJacket {
  do() {
    console.log(`safejacket is saving`);
  }
}

class MotorBoat {
  do() {
    console.log(`motorboar is motorboating`);
  }
}

const container = new Container();

const boat = new Boat();
const goose = new Goose();
const duck = new Duck();
const motorBoat = new MotorBoat();
const safeJacket = new SafeJacket();

container.addClass(boat);
container.addClass(goose);
container.addClass(duck);
container.addClass(motorBoat);
container.addClass(safeJacket);

container.do();
container.useAxe();

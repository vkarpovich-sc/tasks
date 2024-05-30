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
          super(money)
          this.time = time
          this.stake = stake
          this.capital = this.money
      }
      getPercents() {
          const s =  this.capital*(1 + this.time*this.stake)
          console.log(`ваша наращенная сумма ${s}`)
      }
  }

  class Express extends Current{
    constructor(money, time, stake) {
       super(money, time, stake)
       this.capital = this.money
    }
    getPercents() {
        const s =  this.capital* ((1 + (this.stake/100))^this.time)
        console.log(`ваша наращенная сумма ${s}`)
    }
  }
  let a = new Express(10, 5, 2)
  a.getPercents()
  a.addMoney(20)
  a.getPercents()
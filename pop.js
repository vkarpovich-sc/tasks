let residents = 100;
let arrivedResidents = 0;

/*const generateAmount = (amount) => {
  let arr = []
  for ( let i =0; i < amount; i++) {
    arr.push(this.floorNumber, Math.floor(Math.random() * 9))
  }
  return peopleOnFloor
}*/

class Person {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  checkDirection(elEndPoint) {
    // проверяем, стоит ли жителю заходить в лифт
    this.startPoint < elEndPoint ? false : true;
  }
}

class Floor {
  constructor(floorNumber, peopleAmount) {
    this.floorNumber = floorNumber;
    this.peopleAmount = peopleAmount;
  }
  generatePeople() {
    let peopleOnFloor = []; // массив с жителями этажа
    for (let i = 0; i < this.peopleAmount; i++) {
      peopleOnFloor.push(
        new Person(this.floorNumber, Math.floor(Math.random() * 9))
      );
    }
    console.log(
      `людей на этаже ${this.floorNumber} -- ${peopleOnFloor.length}`
    );
    return peopleOnFloor;
  }
  checkPersonFloor() {}
  setArrived() {}
  removeWaiting() {}
}

class Elevator {
  constructor(elStartPoint, capacity) {
    this.elStartPoint = elStartPoint;
    this.capacity = capacity;
  }

  checkCapacity() {}
  goTo() {}
  checkDirection() {

  }
  updateNumberOfPassengers() {}
}

class Building {
  constructor(numberOfFloors, peopleAmount) {
    this.numberOfFloors = numberOfFloors;
    this.peopleAmount = peopleAmount;
  }

  generateFloors() {
    let floors = [];
    for (let i = 0; i < this.numberOfFloors; i++) {
      let residentsPerFloor = Math.floor(Math.random() * residents);
      residents = residents - residentsPerFloor; // уменьшаем возможное перенаселение офиса
      floors.push(new Floor(i, residentsPerFloor));
      floors[i].generatePeople(); // создаем жителей этажа
    }
    return floors;
  }
  startProcess() {
    let floors = this.generateFloors();
    let startPoint = floors.find((el) => {
      el.length > 1;
    });
    const startElevator = () => {
      while (arrivedResidents < 100) {
        const elevator = new Elevator(startPoint, 6);
      }
    };
  }

  checkArrival() {}
}

const start = new Building(9, 100);
start.generateFloors();

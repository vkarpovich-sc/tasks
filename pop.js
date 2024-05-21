let residents = 100;
let arrivedResidents = 0;

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
  updateNumberOfPassengers(people) {
    this.capacity -= people.length;
    let direction = people.sort((a, b) => a.endPoint - b.endPoint);
    ///console.log('direction', direction[0]);
    return { direction: direction[0], capacity: this.capacity, people: people };
  }

  checkCapacity(floors) {
    if (floors[this.elStartPoint].peopleAmount <= this.capacity) {
      return this.updateNumberOfPassengers(floors[this.elStartPoint].people);
    } else {
      let passengers = floors[this.elStartPoint].people.splice(
        1,
        this.capacity
      );
      return this.updateNumberOfPassengers(passengers);
    }
    // this.updateNumberOfPassengers(people);
  }
  goTo(passengersInfo) {
    this.elStartPoint = passengersInfo.direction.endPoint;
    for (let i = 0; i < passengersInfo.people.length; i++) {
      if (this.elStartPoint == passengersInfo.people[i].endPoint) {
        arrivedResidents++;
        console.log(arrivedResidents)
        this.capacity++;
        console.log(
          `${JSON.stringify(passengersInfo.people[i])} доехал до нужного этажа`
        );
        passengersInfo.people.splice(i, 1);
        i--
      } else continue;
    }
   
    return passengersInfo;
  }

  checkDirection(passengersInfo) {
    //this.elStartPoint = passengersInfo.direction.endPoint
    this.goTo(passengersInfo);
  }
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
      floors[i] = new Floor(i, residentsPerFloor);
      floors[i].people = floors[i].generatePeople(); // создаем жителей этажа
    }
    return floors;
  }
  startProcess() {
    let floors = this.generateFloors();
    const startElevator = (arrivedResidents) => {
      let startPoint = floors.find((el) => el.peopleAmount > 0);
      startPoint = startPoint.floorNumber;
      const elevator = new Elevator(startPoint, 6);
      const passengersInfo = elevator.checkCapacity(floors);
      elevator.goTo(passengersInfo);
    };
    while (arrivedResidents < 100) {
      startElevator();
    }
  }

  checkArrival() {}
}

const start = new Building(9, 100);
start.startProcess();

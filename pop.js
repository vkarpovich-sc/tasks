let residents = 100;
let arrivedResidents = 0;

class Person {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
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
      let startPoint, endPoint;
      do {
        startPoint = this.floorNumber;
        endPoint = Math.floor(Math.random() * 9);
      } while (startPoint === endPoint); // Repeat until startPoint and endPoint are not equal
      peopleOnFloor.push(new Person(startPoint, endPoint));
    }
    console.log(
      `людей на этаже ${this.floorNumber} -- ${peopleOnFloor.length}`
    );
    return peopleOnFloor;
  }
}

class Elevator {
  constructor(elStartPoint, capacity) {
    this.elStartPoint = elStartPoint;
    this.capacity = capacity;
  }
  updateNumberOfPassengers(people, floors) {
    this.capacity -= people.length;
    let direction = {};
    if (this.capacity == 6) {
      direction.floorNumber = [...people].sort(
        (a, b) => a.endPoint - b.endPoint
      );
    } else {
      direction.floorNumber = floors.filter((el) => el.peopleAmount > 0);
    }
    return {
      direction: direction.floorNumber[0].floorNumber,
      capacity: this.capacity,
      people: people,
      floor: floors,
      residents: null,
    };
  }

  checkCapacity(floors, people) {
    if (floors[this.elStartPoint].peopleAmount <= this.capacity) {
     // console.log(floors[this.elStartPoint].people);
      let passengers = floors[this.elStartPoint].people.splice(
        0,
        floors[this.elStartPoint].peopleAmount
      );
      people = people.push(passengers)
      floors[this.elStartPoint].peopleAmount = 0;
      return this.updateNumberOfPassengers(
        people,
        floors
      );
    } else if (this.capacity != 0 && floors[this.elStartPoint].peopleAmount > this.capacity ) {
     
      let passengers = floors[this.elStartPoint].people.splice(
        0,
        this.capacity
      );
      people = people.push(passengers)
      floors[this.elStartPoint].peopleAmount =floors[this.elStartPoint].peopleAmount - passengers.length
  
      return this.updateNumberOfPassengers(people, floors);
    }
    // this.updateNumberOfPassengers(people);
  }

  goTo(passengersInfo, residents) {
    
    //console.log(passengersInfo.residents)
    for (let i = 0; i < passengersInfo.people.length; i++) {
      if (passengersInfo.people[i].endPoint == this.elStartPoint) {
        console.log(`Высадка пассажирa на этаже ${this.elStartPoint}`);
        console.log(`вышел пассажир ${passengersInfo.people[i]}`);
        residents--;
        this.capacity++;
        passengersInfo.people.splice(i, 1); 
        i--
      } 
    }
    this.elStartPoint = passengersInfo.direction;
   
    passengersInfo.residents = residents;
  
    return passengersInfo;
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

    const startElevator = () => {
      let startPoint = floors.find((el) => el.peopleAmount > 0);
      startPoint = startPoint.floorNumber;
      const elevator = new Elevator(startPoint, 6);
      let passengersInfo = elevator.checkCapacity(floors, []);
      console.log(`first trial`,passengersInfo)

      while (
        passengersInfo.people.length > 0 ||
        floors.some((floor) => floor.peopleAmount > 0)
      ) {
        passengersInfo = elevator.checkCapacity(passengersInfo.floor, passengersInfo.people)
        passengersInfo = elevator.goTo(passengersInfo, this.peopleAmount);
        this.peopleAmount = passengersInfo.residents;
        // counter++
      }
    };
    startElevator();
  }

  checkArrival() {}
}

const start = new Building(9, 100);
start.startProcess();

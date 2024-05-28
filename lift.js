class Person {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }
}

class Floor {
  constructor(floorNumber, peopleAmount) {
    this.floorNumber = floorNumber;
    this.people = [];

    for (let i = 0; i < peopleAmount; i++) {
      let endPoint;
      do {
        endPoint = Math.floor(Math.random() * 9);
      } while (endPoint === floorNumber);
      this.people.push(new Person(floorNumber, endPoint));
    }
  }

  hasPeople() {
    return this.people.length > 0;
  }
}

class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.capacity = 6;
    this.people = [];
  }

  loadPeople(floor) {
    const remainingCapacity = this.capacity - this.people.length;

    const passengers = floor.people.splice(0, remainingCapacity);
    this.people = this.people.concat(passengers);
  }

  unloadPeople() {
    const unloadedPeople = this.people.filter(
      (person) => person.endPoint === this.currentFloor
    );
    this.people = this.people.filter(
      (person) => person.endPoint !== this.currentFloor
    );
    return unloadedPeople;
  }

  goToNextFloor() {
    this.currentFloor = (this.currentFloor + 1) % 9;
  }

  isFinished(building) {
    return (
      building.floors.every((floor) => !floor.hasPeople()) &&
      this.people.length === 0
    );
  }

  operate(building) {
    while (!this.isFinished(building)) {
      const currentFloor = building.floors[this.currentFloor];

      if (currentFloor.hasPeople()) {
        this.loadPeople(currentFloor);
        const unloadedPeople = this.unloadPeople();
        if (unloadedPeople.length > 0) {
          console.log(
            `Высажены ${unloadedPeople.length} человек на этаже ${this.currentFloor}`
          );
          unloadedPeople.forEach((person) => {
            console.log(
              `- Человек с этажа ${person.startPoint} на этаж ${person.endPoint}`
            );
          });
        }
      }
      else {
        const unloadedPeople = this.unloadPeople();
        console.log(
          `Высажены ${unloadedPeople.length} человек на этаже ${this.currentFloor}`
        );
        unloadedPeople.forEach((person) => {
          console.log(
            `- Человек с этажа ${person.startPoint} на этаж ${person.endPoint}`
          );
        });
      }

      this.goToNextFloor();
    }
  }
}

class Building {
  constructor() {
    this.floors = [];
    this.amount = 0;
    for (let i = 0; i < 9; i++) {
      const peopleAmount = Math.floor(Math.random() * (101 - this.amount));
      this.amount += peopleAmount;
      this.floors.push(new Floor(i, peopleAmount));
      console.log(
        this.floors[i].floorNumber,
        `населяет ${peopleAmount} челвоек`
      );
    }
  }

  startElevator() {
    const building = this;
    const elevator = new Elevator();
    elevator.operate(building);
    console.log("Все жители доставлены.");
  }
}

const building = new Building();
building.startElevator();

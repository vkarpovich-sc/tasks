class Person {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  checkDirection() {}
}

class Floor {
  constructor(floorNumber, peopleAmount) {
    this.floorNumber = floorNumber;
    this.peopleAmount = peopleAmount;
  }
  generatePeople() {}
  checkPersonFloor() {}
  setArrived() {}
  removeWaiting() {}
}

class Elevator {
  constructor(elStartPoint, elEndPoint, capacity) {
    this.elStartPoint = elStartPoint;
    this.elEndPoint = elEndPoint;
    this.capacity = capacity;
  }

  checkCapacity() {}
  goTo() {}
  checkDirection() {}
  updateNumberOfPassengers() {}
}

class Building {
  constructor(numberOfFloors, peopleAmount) {
    this.numberOfFloors = numberOfFloors;
    this.peopleAmount = peopleAmount;
  }

  generateFloors () {}
  startProcess () {}
  checkArrival() {}
}

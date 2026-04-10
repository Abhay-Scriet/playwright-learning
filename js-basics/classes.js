const { describe } = require("node:test");

class Car {
    constructor(brand, color) {
      this.brand = brand;
      this.color = color;
    }
  
    drive() {
      console.log(`${this.brand} is driving!`);
    }
  
    describe() {
      console.log(`${this.color} ${this.brand}`);
    }
  }
  
  const car1 = new Car('Toyota', 'Red');
  const car2 = new Car('BMW', 'Blue');
  
  car1.drive();
  car1.describe();
  car2.drive();
  car2.describe();
  

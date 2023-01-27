"use strict";
// const Person = function (firstName, birthYear) {
//   (this.firstName = firstName), (this.birthYear = birthYear);

//   console.log(this);

//   //never create methods inside the constructor functions
//   // this.calcAge = function () {
//   //   console.log(2037 - 2000);
//   // };
// };

// Person.hey = function () {
//   console.log(this);
//   console.log("Hi there🙋‍♂️");
// };

// Person.hey();

// const king = new Person("Jonas", 1991);
// console.log(king);

// console.log(king instanceof Person);

// const jack = new Person("jack", 1990);

// console.log(jack);

// // Protoype

// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2050 - this.birthYear);
// };

// king.calcAge();

// console.log(king.__proto__);
// console.log(jack.__proto__);

// console.log(king.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(king));
// console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype.species = "Homo sapiens";

// console.log(king.species, jack.species);

// console.log(king.hasOwnProperty("firstName"));
// console.log(king.hasOwnProperty("species"));
// // console.log(king.calcAge)

// console.log(Person.prototype.constructor);

// const arr = [12, 3, 4, 5];
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// console.log(document.querySelector("h1"));

// // how objects are created using function constructor in javascript👇⭐

// // 1. New {} is created
// // 2. function is called, this={}
// // 3. {} linked to prototype
// // 4. function automatically return {}

// //coding challenge

// const car = function (make, speed) {
//   (this.make = make), (this.speed = speed);
// };

// const mercedes = new car("mercedes", 95);
// const bmw = new car("bmw", 120);

// car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();

// //// ES6 Classes
// class PersonCl {
//   constructor(firstName, birthYear) {
//     (this.firstName = firstName), (this.birthYear = birthYear);
//   }
//   //Instance methods
//   //Methods will be added to the .prototype property

//   calcAge() {
//     console.log(2090 - this.birthYear);
//   }

//   get age() {
//     return 2090 - 2002;
//   }

//   //static method
//   static hey() {
//     console.log("Hi there🙋‍♂️");
//   }
// }

// PersonCl.hey();

// const jessica = new PersonCl("King", 1999);

// console.log(jessica.age);

// PersonCl.prototype.greet = function () {
//   console.log(`Hi ${this.firstName}!`);
// };

// console.log(jessica);
// jessica.calcAge();
// jessica.greet();

// //1. Classes are NOT hoisted
// //2. Class are first class citizens
// //3. Classes are executed in strict mode

// //-------------------Setters and Getters in javascript--------------------------------------//

// const account = {
//   owner: "king",
//   movements: [23, 4, 2, 34],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     return this.movements.push(mov);
//   },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.movements);

// const PersonProto = {
//   calcAge() {
//     console.log(2090 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// console.log(steven);

// steven.name = "Steven";

// steven.birthYear = 2000;
// steven.calcAge();
// console.log(steven.__proto__ === PersonProto);

// const sarah = Object.create(PersonProto);
// sarah.init("Sarah", 1979);
// sarah.calcAge();

// class Car {
//   constructor(make, speed) {
//     (this.make = make), (this.speed = speed);
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h...🚘`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h...`);
//   }

//   get speedUs() {
//     return this.speed / 1.6;
//   }

//   set speedUs(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new Car("Ford", 120);
// console.log(ford.speedUs);
// ford.accelerate();
// ford.accelerate();

// ford.brake();
// ford.speedUs = 50;
// console.log(ford);

// const Person = function (firstName, birthYear) {
//   (this.firstName = firstName), (this.birthYear = birthYear);
// };

// Person.prototype.calcAge = function () {
//   console.log(2090 - this.birthYear);
// };

// const student = function (firstName, birthYear, course) {
//   // this.firstName = firstName;
//   // this.birthYear = birthYear;

//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// student.prototype = Object.create(Person.prototype);

// student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new student("Mike", 2020, "Computer Science");

// mike.introduce();
// console.log(mike);

// //Linking prototypes
// // console.log(student)

// const car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed}km/h.`);
// };

// car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed}km/h.`);
// };
// const EV = function (make, speed, charge) {
//   car.call(this, make, speed);
//   this.charge = charge;
// };

// //Link the prototypes
// EV.prototype = Object.create(car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 10;
//   this.charge--;
//   console.log(
//     `${this.make} is going at ${this.speed}km/h, with a charge of ${this.charge} `
//   );
// };

// const tesla = new EV("Tesla", 120, 23);
// tesla.chargeBattery(90);
// tesla.accelerate();
// console.log(tesla);
// tesla.brake();

// //Inheritance using ES6 classes in javascript

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2090 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2090 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(" ")) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method

//   static hey() {
//     console.log("Hey there🙋‍♂️");
//   }
// }

// class studentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     //Always needes to happen first
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }
// }

// // const martha = new studentCl("martha jones", 2012);
// const martha = new studentCl("martha jones", 2012, "computer science");
// martha.introduce();
// martha.calcAge()
// console.log(martha);

// ////-------------------Inheritance using Object.create() in javascript------------------------////

// const PersonProto = {
//   calcAge() {
//     console.log(2037-this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const studentProto = Object.create(PersonProto);
// studentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// const jay = Object.create(studentProto);

// // jay.init('king', 1999)
// jay.init("king", 1999, "Civil Engineering");

// studentProto.introduce = function () {
//   console.log(`My name is ${this.firstName}`);
// };
// console.log(jay);
// jay.introduce();
// jay.calcAge();

// class Account {
//   //1) Public Fields
//   locale = navigator.language;

//   //2) Private fields
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;
//     // this._movements = [];
//     // this.locale = navigator.language;
//     console.log(`Thanks for opening an account, ${this.owner}`);
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }

//   withdraw(val) {
//     // this.movements.push(-val);
//     this.deposit(-val);
//     return this;
//   }

//   getMovements() {
//     return this.#movements;
//   }

//   //Private method 👇
//   // #requestLoan(val)
//   _requestLoan(val) {
//     this.deposit(val);
//     console.log(`Loan approved!`);
//     return this;
//   }
// }

// const acc1 = new Account("king", "rupees", 1222);

// acc1.deposit(250);
// acc1.withdraw(140);
// acc1._requestLoan(1000);
// // acc1.approveLoan();

// console.log(acc1.getMovements());
// // console.log()
// console.log(acc1);
// // console.log(acc1.#pin);//It will throw an error because we are trying to access protected fields

// acc1.deposit(300).deposit(900)._requestLoan(232).withdraw(23);

// console.log(acc1.getMovements())

const car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

class carcl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
    return this;
  }
}

class EVcl extends carcl {
  //Private fields
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 10;
    this.#charge--;

    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }.`
    );
    return this;
  }
}

const rivian = new EVcl("Rivian", 120, 40);
console.log(rivian);

rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();

console.log(rivian.speedUs);
console.log();

"use strict";
const Person = function (firstName, birthYear) {
  (this.firstName = firstName), (this.birthYear = birthYear);

  console.log(this);

  //never create methods inside the constructor functions
  // this.calcAge = function () {
  //   console.log(2037 - 2000);
  // };
};

const king = new Person("Jonas", 1991);
console.log(king);

console.log(king instanceof Person);

const jack = new Person("jack", 1990);

console.log(jack);

// Protoype

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2050 - this.birthYear);
};

king.calcAge();

console.log(king.__proto__);
console.log(jack.__proto__);

console.log(king.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(king));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = "Homo sapiens";

console.log(king.species, jack.species);

console.log(king.hasOwnProperty("firstName"));
console.log(king.hasOwnProperty("species"));
// console.log(king.calcAge)

console.log(Person.prototype.constructor);

const arr = [12, 3, 4, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

console.log(document.querySelector("h1"));

// how objects are created using function constructor in javascript👇⭐

// 1. New {} is created
// 2. function is called, this={}
// 3. {} linked to prototype
// 4. function automatically return {}

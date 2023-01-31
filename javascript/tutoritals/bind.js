//----------------------Bind Method in Javascript------------------------//

const king = {
  name: "king",
  class: 1,
};

const jack = {
  name: "jack",
  class: 2,
};

const greet = function (fullname, roll) {
  console.log(`Hello ${this.name}, full: ${fullname}, roll: ${roll}`);
};
    
greet.call(king, "king k", 33);
greet.apply(jack, ["jack j", 45]);

const jackgreet = greet.bind(jack, "jack j", 45);

jackgreet();

//partial function application
const jackgreet2 = greet.bind(jack, "jack j");

jackgreet2(45);

const handleClick = function () {
  console.log(`Hello ${this.name}`);
};

const button = document.querySelector("button");

button.addEventListener('click', handleClick.bind(jack));


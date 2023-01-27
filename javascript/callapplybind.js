"use strict";

//-----------------------call apply and bind methods in javascript------------------------------//

//-----------------------------------call method--------------------------------------//

const king = {
  name: "king",
  class: 1,
  greet: function (fullname, roll) {
    console.log(`Hello ${this.name}, ${this.class}, ${fullname}, ${roll}`);
  },
};

const jack = {
  name: "jack",
  class: 2,
};

const greet = king.greet;

// greet.call(jack, "jack j", 23);
// greet.call(king, "king k", 3);

//apply method

const jackDetails=["jack j", 23]

// greet.apply(jack, jackDetails);

// greet.call(jack, ...jackDetails);






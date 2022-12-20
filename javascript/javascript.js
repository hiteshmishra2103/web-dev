"use strict";

//destructuring arrays

// const restaurant = {
//   name: "simple restaurant",
//   location: "india",
//   categories: ["indian", "american", "italian", "nepali"],
//   starterMenu: ["cholle", "chowmein", "aalu", "roti", "sabzi", "paneer"],
//   mainMenu: ["parathe", "sabzi", "butter"],
//   order:function(starterIndex, mainIndex){
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   }
// };

// // const [a,b,c,d]=restaurant.categories;
// // console.log(a,b,c,d);

// // const [a,b,c]=restaurant.categories;
// // console.log(a,b,c);

// let [a,,c]=restaurant.categories;
// console.log(a,c);

// //switching variables without using destructuring
// // const temp=a;
// // a=c;
// // c=temp;
// // console.log(a,c);

// //Switching variables using destructuring
// [a,c]=[c,a];
// console.log(a,c);

// const [starterCourse,mainCourse]=restaurant.order(2,0);

// console.log(starterCourse, mainCourse);

// //destructuring nested arrays
// const nested=[1,2,[3,4]];
// const[x,,[y,z]]=nested;
// console.log(x,y,z);

// //default values, default values are useful when we get data from an API
// const [p=1,q=1,r=1]=[3232,456];
// console.log(p,q,r);

//destructuring objects

// const restaurant = {
//   name: "simple restaurant",
//   location: "india",
//   categories: ["indian", "american", "italian", "nepali"],
//   starterMenu: ["cholle", "chowmein", "aalu", "roti", "sabzi", "paneer"],
//   mainMenu: ["parathe", "sabzi", "butter"],
//   order: function (starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0,
//       close: 24, //open for 24 hrs
//     },
//   },
// };

// const{name, openingHours}=restaurant;
// console.log(name, openingHours)

//giving custom names to the properties in object destructuring

// const {name:restaurantName, openingHours:OpensAt}=restaurant;
// console.log(restaurantName, OpensAt)

//Setting default values
// const {name:restaurantName=[], menu=[], openingHours:OpensAt=[]}=restaurant;
// console.log(restaurantName,menu,OpensAt);

//changing values

// let a=1212;
// let b=12;
// const obj={a:123,b:445};
// ({a,b}=obj);
// console.log(a,b);

//nested objects
// const {fri}=restaurant.openingHours;
// const{fri:{open, close}}=restaurant.openingHours;
// console.log(fri, open,close);

// const newArr=[2,3,4,5];
// console.log(...newArr);

// // SPREAD, because on right side of =
// const arr=[1,3,44,5,...[324,4,5,5]];

// //REST, because on left side of =
// const [a,b,c,...others]=[1,2,3,4,5,5,6];
// console.log(a,b,others);

// const ordersSet = new Set(["pizza", "pizza", "pasta", "risotto", "pasta"]);
// console.log(ordersSet.size);
// console.log(ordersSet.has("ching"));
// console.log(ordersSet.has("pizza"));
// console.log(new Set("john"));
// ordersSet.add("chewing gum");
// ordersSet.delete("chewing gum");
// console.log(ordersSet);

// //example
// const staff = ["waiter", "chef", "waiter", "manager"];
// console.log(staff);
// const staffUnique = [...new Set(staff)];
// console.log(new Set(staff).size);
// console.log(staffUnique);
// const rest = new Map();
// rest.set(1, "singham");
// console.log(rest);
// rest.set(2, "chewing gum");
// console.log(rest);
// console.log(rest.size);

// rest
//   .set("categories", ["Indian", "Italian"])
//   .set("open", 11)
//   .set("close", 23)
//   .set(true, "We are open :D")
//   .set(false, "We are closed :(");

// console.log(rest.get("name"));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 21;
// console.log(rest.get(time > rest.get("open") && time < rest.get("close")));
// rest.delete(1);
// rest.set(document.querySelector("h1"), "heading");
// console.log(rest);
// console.log(rest.has("categories"));
// const arr = [1, 2];
// rest.set(arr, true);
// console.log(rest.get(arr));

// const question = new Map([
//   ["question", "What is the best programming language in world!"],
//   [1, "c"],
//   [2, "java"],
//   [3, "c++"],
//   [4, "python"],
//   [5, "javascript"],
//   ['correct',3],
//   [true, "Correct 🎉"],
//   [false,"Try again!"]
// ]);

// console.log(question.get('question'));
// for(const [key,value] of question){
//     if(typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// // const answer =prompt;

// console.log(question);

// const gameEvents = new Map([
//   [17, "goal"],
//   [36, "substitution"],
//   [47, "goal"],
//   [61, "substitution"],
//   [64, "yellow card"],
//   [69, "red card"],
//   [70, "substitution"],
//   [72, "goal"],
//   [76, "goal"],
//   [80, "goal"],
//   [92, "yellow card"],
// ]);

// //values method returns the object that contains the values for each element

// console.log(gameEvents.values());
// const events = [...new Set(gameEvents.values())];

// gameEvents.delete(64);
// console.log(events);

// //3:print "an event happened, on average, every 9 minutes" every nine minutes

// console.log(`An event happened every ${90 / gameEvents.size} minutes`);

// const time = [...gameEvents.keys()];

// for (const [minute, event] of gameEvents) {
//   const half = minute <= 45 ? "First" : "Second";
//   console.log(`[${half} Half] ${minute}: ${event}`);
// }

// const lastValue = time.pop();
// console.log(lastValue);

// const airline = "air india";
// const plane = "A320";

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log(plane[3]);

// console.log(airline.length);
// console.log("air india r".length);
// //indexOf gives us the first occurence of the word r
// console.log(airline.indexOf("r"));
// //lastindexOf gives us the last occurence of the word r
// console.log(airline.lastIndexOf("r"));
// console.log(airline.slice(0, airline.indexOf(" ")));
// console.log(airline.slice(-2));

// console.log(airline.toLowerCase());
// console.log(airline[0].toUpperCase());

// //replacing
// const priceEU = "12,34E";
// const priceUS = priceEU.replace("E", "$").replace(",", ".");
// console.log(priceUS);

// const announcement = "All Students come here come!";
// console.log(announcement.replaceAll("come", "go"));

// //booleans
// const planes = "A3233";
// console.log(planes);
// console.log(planes.startsWith("A3"));

// console.log("a+very+nice+string".split("+"));
// console.log("Air India".split(" "));

// const [firstName, lastName] = "Hitesh mishra".split(" ");

// const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
// console.log(newName);

// //padding a string: It means to add a number of characters to the string until a string has a certain
// //desired length

// const message = "Go to gate 23!";
// console.log(message.padStart(25, "+").padEnd(35, "+"));

// const maskCreditCard = (number) => {
//   const str = number + "";
//   const last = str.slice(-4);
//   return last.padStart(str.length, "*");
// };

// console.log(maskCreditCard(3242423434));
// console.log(maskCreditCard(12349659544));
// console.log(maskCreditCard(32424343999));

// //repeat
// const message2 = "Bad Weather all departures delayed!";
// console.log(message2.repeat(2));

// /*
// underscore_case
// first_name
// Some_variable
// calculate_AGE
// delayed_departure
// */

// const newstr="underscore_case first_name Some_variable calculate_AGE delayed_departure";

// const newstr2=newstr.split(" ");

// console.log('\n')

// for(const [index,news] of newstr2.entries()){
//   // const [first,last]=news.split('_');
//   // const final=first[0].toUpperCase()+first.slice(1).toLowerCase()+" "+last[0].toUpperCase()+last.slice(1);
//   // console.log(final);

//   const [first,last]=news.toLowerCase().trim().split('_');
//   const output=`${first} ${last.replace(last[0], last[0].toUpperCase())}`;
//   console.log(`${output.padEnd(20)} ${'⭐'.repeat(index+1)}`);

// }

//strings method practice

// const flights =
//   "_Delayed_Departure;fao234212231;txl234242314;11:25; _arrival;LAB157875;fao235675643;11:45; _Delayed_Arrival;hel87649087458;fao9793723;12:05; _Departure;fao35389;lis232855;12:30;";

// //🛑 Delayed Departure from FAO to TXL (11h25)
// //    Arrival from BRU to FAO (11h25)
// //    🛑Delayed Arrival from HEL to FAO (12h05)
// //          Departure from FAO to LIS (12h30)

// for (const flight of flights.split(" ")) {
//   const [type, from, to, time] = flight.split(";");
//   const output=`${type.startsWith("_Delayed")?'🛑':''}${type.replaceAll("_"," ")} ${from.slice(0,3).toUpperCase()} to ${to.slice(0,3).toUpperCase()} (${time.replace(":", "h")})`.padStart(38);
//   console.log(output);
// }

// //functions in depth
// //default parameters

// const bookings=[];
// const createBooking = function (flightNum=1, numPassengers=1, price=199*numPassengers) {

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('kkk');
// createBooking('k2wk','3');
// createBooking('k2wk',3,444);

// const flight = "lh232";
// const king = {
//   name: "Singh is King",
//   passport: 1212121,
// };
// const checkIn=(flightNum,passenger)=>{
//   flightNum='lh344',
//   passenger.name='Mr.'+passenger.name;
//   if(passenger.passport===1212121){
//     alert("Checked in!");
//   }
//   else{
//     alert("Wrong passport!");
//   }
// }

// checkIn(flight,king);
// console.log(flight);
// console.log(king);

// const oneWord=function(str){
//   return str.replace(/ /g, "").toLowerCase();
// }

// const upperFirstWord=function(str){
//   const [first,...others]=str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// }

// //higher order function
// const transformer=function(str,fn){
// console.log(`Original String: ${str}`);
// console.log(`Transformed String: ${fn(str)}`);

// console.log(`Transformed by: ${fn.name} function`);
// };

// transformer("Javascript is best!", upperFirstWord);
// transformer("Javascript is best!", oneWord);

// const greet=(greeting)=>{
//   return function(name){
//     console.log(`${greeting} ${name}`)
//   };
// };

// const greeterHey=greet('Hey');
// greeterHey('Jonas');
// greeterHey('King');

// greet('Hey')('Queen!');

// //above function using arrow functions
// const greetArr=greeting=>name=>console.log(`${greeting} ${name}`);
// greetArr("hello")("albert!");

// const lufthansa = {
//   airline: "Lufthansa",
//   iataCode: "LH",
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, "Steve Smith");
// lufthansa.book(44, "Mitchell Stark");

// //call method

// const euroWings = {
//   airline: "EuroWings",
//   iataCode: "EW",
//   bookings: [],
// };

// const book = lufthansa.book;

// book.call(euroWings, 23, "Sarah");
// book.call(lufthansa, 23, "singham");
// console.log(euroWings);

// const swiss = {
//   airline: "Swiss Air Lines",
//   iataCode: "LX",
//   bookings: [],
// };

// book.call(swiss, 454, "Mary");
// console.log(swiss);

// //apply method: It takes an array of arguments instead of list of arguments

// const flightData = [583, "George Cooper"];
// book.apply(swiss, flightData);
// console.log(swiss);

// book.call(swiss, ...flightData);

// //bind method
// //book.call(euroWings, 23, "Sarah");
// const bookEW = book.bind(euroWings); //this will not call the book function instead it will return
// //a new function where this keyword will be set to EuroWings

// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, "Steven Williams");

// const bookEW23 = book.bind(euroWings, 23); //Here we have applied a part of arguments of the original function, this is known as partial application
// bookEW23("Hitesh Mishra");

// //with event listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// //Partial Application

// const addTax=(rate, value)=>value+value*rate;

// console.log(addTax(0.1,200));

// const addVAT=addTax.bind(null, 0.23);
// // addVAT=value=>value+value*23;

// console.log(addVAT(100));

// const addTaxRate=function(rate){
//   return function(value){
//     return value+value*rate;
//   }
// }

// const addVAT2=addTaxRate(0.23);
// console.log(addVAT2(100));

// const poll = {
//   question: "What is your favourite programming language?",
//   options: ["0:Javascript", "1: Python", "2: Rust", "3: C++"],
//   //This generates [0,0,0,0]. More in the next section 😁
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     //Get answer

//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join("\n")}\n(Write option number)`
//       )
//     );
//     console.log(answer);

//     //register answer
//     typeof answer==='number' && answer<this.answers.length && this.answers[answer]++;
//   },
//   displayResults(type ='array'){
//     if(type==='array'){
//       console.log(this.answers);
//     }else if(type==='string'){
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   }
// };

// document.querySelector('.poll').addEventListener("click", poll.registerNewAnswer.bind(poll));
// poll.displayResults.call({answers:[5,2,3]}, 'string');
// poll.displayResults.call({answers:[23,4,4,3]});

// const runOnce=function(){
//   console.log('This will never run again!');
// }

// runOnce();

// //immediately invoked function expressions

// (function(){
//   console.log("This will never run again!");
// })();

// (()=>console.log("this will never run again!"))()

//closures

// const secureBooking= function(){
//   let passengerCount=0;

//   return function(){
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   }
// }

// const booker=secureBooking();

// booker();
// booker();
// booker();

//closure examples

//--first example---

// let f;
// const g = function () {
//   let a = 23;
//   f = function () {
//     a = a * 2;
//     console.log(a);
//   };
// };
// const h = function () {
//   let b = 223;
//   f = function () {
//     b = b * 2;
//     console.log(b);
//   };
// };
// g();
// f();
// console.dir(f);
// h();
// f();

// //---second example---

// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers.`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait*1000);

//   console.log(`We will start boarding in ${wait} seconds!`);
// };

// boardPassengers(180,1);

// (function () {
//   const header = document.querySelector("h1");
//   header.style.color = "red";

//   document.querySelector("body").addEventListener("click", function () {
//     header.style.color = "blue";
//   });
// })();

//-------------------------arrays in depth-----------------------------------------//

//slice
let arr = ["a", "b", "c", "d", "e"];

console.log(arr.slice(2, -1));
console.log(arr.slice());

//splice method
console.log(arr.splice(2));
console.log(arr.splice(1, 2));
console.log(arr.splice(1, 2, 4));
console.log(arr);

//Reverse

arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());

//concat() method

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN

console.log(letters.join(""));
console.log(letters.join("-"));

//at method

const atarray = ["a", "b", "c"];

console.log(atarray[0]);
console.log(atarray.at(0));

//getting last array element traditionally before ES6

console.log(atarray[atarray.length - 1]);
console.log(atarray.slice(-1)[0]);

//getting last array element using 'at method'

console.log(atarray.at(-1));

//for each loop

const movements = [200.45, -400, 300, -650, -130, 70, 1300];

for(const movement of movements){
  if(movement>0){
    console.log(`You deposited ${movement}`);
  }
  else{
      console.log(`You withdrew ${Math.abs(movement)}`);
  }
}


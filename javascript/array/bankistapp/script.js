"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "AB",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "CD",
  movements: [5000, 34000, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "EF",
  movements: [200, -20, 340, -300, -20, 50, 400, -40],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "GH",
  movements: [430, 10000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawl";

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--deposit">${
            i + 1
          } ${type}</div>
          <div class="movements__value">${movement}</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${acc.balance} INR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes} INR`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr);

  labelSumOut.textContent = `${Math.abs(out)} INR`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest} INR`;
};

const updateUI = (currentAccount) => {
  //display movements
  displayMovements(currentAccount.movements);

  //display balance
  calcDisplayBalance(currentAccount);

  //display summary
  calcDisplaySummary(currentAccount);
};

// const createUserNames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };

// createUserNames(accounts);
console.log(accounts);

let currentAccount;

btnLogin.addEventListener("click", function (event) {
  //prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.owner === inputLoginUsername.value.trim()
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and welcome message

    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = "100%";

    //CLEAR THE INPUT FIELDS
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();

  const amountTransfer = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.owner === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amountTransfer > 0 &&
    receiverAccount &&
    currentAccount.balance >= amountTransfer &&
    receiverAccount?.owner !== currentAccount.owner
  ) {
    console.log("Transfer valid!");
  }

  //Doing the transfer
  currentAccount.movements.push(-amountTransfer);
  receiverAccount.movements.push(amountTransfer);

  //updating the ui
  updateUI(currentAccount);
});

btnLoan.addEventListener("click", (event) => {
  event.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);

  //checking if the loan amount requested is greater than 0 and amount in currentuser account
  // is at least equals the 10% of requested loan

  if (
    loanAmount > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmount * 0.1)
  ) {
    //add movement
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", (event) => {
  event.preventDefault();
  //checking if the credentials are correct

  if (
    inputCloseUsername.value === currentAccount.owner &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.owner === currentAccount.owner
    );

    accounts.splice(index, 1);

    //hide ui
    containerApp.style.opacity = "0";
  }
});

let sorted = false;

btnSort.addEventListener("click", (event) => {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);

  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const eurotousd = 1.1;

// const movementsusd = movements.map(function (mov) {
//   return mov * eurotousd;
// });

// const movementsusdfor = movements.map((movement) => movement * eurotousd);

// const movementsDescriptions = movements.map(
//   (mov, i, arr) =>
//     `Movement ${i + 1}: You ${
//       mov > 0 ? "deposited" : "withdrew"
//     } deposited ${Math.abs(mov)}`
// );

// console.log(movementsDescriptions);

// console.log(movements);

// console.log(movementsusd);

// console.log(movementsusdfor);

// const deposits = movements.filter((mov) => mov > 0);

// console.log(movements);
// console.log(deposits);

// const withdrawals = movements.filter((mov) => mov < 0);

// console.log(withdrawals);

// //reduce method has one extra parameter which is accumulator which is like snowball, its value can
// const balance = movements.reduce((acc, curr, i, arr) => acc + curr, 0);
// console.log(balance);

// const max = movements.reduce(
//   (acc, curr) => (acc > curr ? acc : curr),
//   movements[0]
// );

// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(humanAges);

//   const adultDogs=humanAges.filter(age=>age>18);
//   console.log(adultDogs);
//   const avgHumanAgeOfAdultDogs=adultDogs.reduce((acc,age,i,arr)=>acc+age,0)/adultDogs.length;
//   console.log(avgHumanAgeOfAdultDogs);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// ////magic of chaining methods

// const totalmovementsinUsd = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * 1.1)
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(totalmovementsinUsd);

//find method
// const firstwithdrawal = movements.find((mov) => mov < 0);
// console.log(movements);

// console.log(accounts);

// const account = accounts.find((acc) => acc.owner === "Jessica Davis");

// console.log(account);

// ////some and every methods

// console.log(movements.includes(-130));

// //it returns true if the condition is true for any value

// const anyMovements = movements.some((mov) => mov > 100);
// console.log(anyMovements);

// //unlike some method every method returns true only if all the elements satisfies the condition
// //every
// console.log(account4.movements.every((mov) => mov > 0));
// console.log(movements.every((mov) => mov > 0));

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// console.log(arr.flat());

// const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];

// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map((acc) => acc.movements);

// console.log(accountMovements);

// const allMovements = accountMovements.flat();

// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalance);

// //flatmap method

// const overallBalance2 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance2);

/////----------------------------sorting of arrays-----------------------
// const owners = ["Jonas", "Zach", "Adam", "Martha"];

// console.log(owners.sort()); //sort function is javascript sorts the string in ascending order

// console.log(movements);

// //⭐if return is less than 0, then a,b
// //⭐else if return is greater than 0, then b,a

// //sorting the integer array in ascending order

// //note: 👉the sort method mutates the original array
// movements.sort((a, b) => {
//   if(a<b){
//     return -1
//   }
//   if(a>b){
//     return 1;
//   }
// });
// console.log(movements);

// movements.sort((a,b)=>a-b);
// console.log("Concise version of ascending sorting")
// console.log(movements);
// console.log("Concise version of descending sorting")
// movements.sort((a,b)=>b-a);
// console.log(movements);
// //sorting the integer array in descending order
// movements.sort((a, b) => {
//   if(a>b){
//     return -1
//   }
//   if(a<b){
//     return 1;
//   }
// });

// console.log(movements);

////-----------------------fill method---------------------------

//ways of creating an array

//it will create an array with following elements
const y = [1.3, 4, 4, 5, 6];

//it will also create an array with elements passed as an arguments to Array constructor

const z = new Array(1, 2, 4, 5, 5, 6);

//following code will create an array of size👉 7 but with ⭐no elements inside(i.e: ⭐empty array of 7 size)

const x = new Array(7);

//if you want to fill the above array you have to use fill() method

// x.fill(1);//it will insert "7" 1 in array and it will also mutate the original x array

console.log(x);

x.fill(1, 3, 5);

console.log(x);

y.fill(23, 3, 5);

console.log(y);

//Array.from()

const arr = Array.from({ length: 7 }, () => 1);
console.log(arr);

const arra = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(arra);

labelBalance.addEventListener("click", () => {
  const movementsUi = Array.from(
    document.querySelectorAll(".movements__value")
  );

  const movementsUi2 = [...document.querySelectorAll(".movements__value")];

  console.log(movementsUi.map((ele) => ele.textContent.concat(" INR")));
});

////Arrays method practice

const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, curr) => sum + curr, 0);
console.log(bankDepositSum);

//counting the movements which are greater than 1000
// const depositsGreaterThan1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov > 1000).length;

const depositsGreaterThan1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, curr) => (curr >= 1000 ? ++acc : acc), 0);

console.log(depositsGreaterThan1000);

//reduce method advance case

const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr)

      sums[curr > 0 ? "deposits" : "withdrawals"] += curr;
      return sums;
    },

    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

////WAP to convert words in a sentence to a Title Case

//This is a nice title case => This Is a Nice Title Case

const convertTitleCase = function (title) {
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "with", "in"];

  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");

  return capitalize(titleCase);
};

console.log(convertTitleCase("this is a nice title case"));
console.log(convertTitleCase("this is a LONG title case"));
console.log(convertTitleCase("this is a an the title case"));
console.log(convertTitleCase("and this is a an the title case"));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));

console.log(dogSarah);

console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  }`
);

//2
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners);

console.log(ownersEatTooMuch);

//3
const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);

console.log(ownersEatTooLittle);

//4
console.log(`${ownersEatTooMuch.join(" and ")} dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")} dogs eat too little!`);

//5
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

//6

const checkEatingOkay = dogs.some(
  (dog) => dog.curFood > dog.recFood * 0.9 && dog.recFood < dog.recFood * 1.1
);

console.log(checkEatingOkay);

//7
console.log(
  dogs.filter(
    (dog) => dog.curFood > dog.recFood * 0.9 && dog.recFood < dog.recFood * 1.1
  ).length
);

//8

const dogsSorted=dogs.slice().sort((a,b)=>a.recFood-b.recFood);

console.log(dogsSorted); 



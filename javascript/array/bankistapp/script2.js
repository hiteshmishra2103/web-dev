"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency    and locale

const account1 = {
  owner: "Hitesh Mishra",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0); //we added 1 here because
    const year = date.getFullYear();

    const displayDate = `${day}/${month}/${year}`;

    const formattedMov = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} INR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} INR`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} INR`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} INR`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
labelTimer.textContent = " ";

const startLogOutTimer = function () {
  let time = 120;

  const timer = setInterval(() => {
    let min = String(Math.floor(time / 60)).padStart(2, 0);

    let sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
    time--;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "";
      containerApp.style.opacity = 100;
    }
  }, 1000);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

//Experimenting API

const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  weekday: "long",
  month: "long",
  year: "numeric",
};

const locale = navigator.language;
console.log(locale);

const now = new Date();
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// const date = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0); //we added 1 here because
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();

// labelDate.textContent = `${date}/${month}/${year}, ${hour}:${min}`;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// console.log(23 === 23.0);
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3); //false

// //conversion
// console.log(Number(0.2));
// console.log(+"0.2");

// //parsing
// console.log(Number.parseInt("90px"));
// console.log(Number.parseInt("e23")); //To make parseInt work string should start with a number

// console.log(Number.parseFloat(" 2.5px"));
// console.log(Number.parseInt(" 2.5px"));

// //checking if a value is not a number

// console.log(Number.isNaN(20));
// console.log(Number.isNaN("20"));
// console.log(Number.isNaN(+"20x"));
// console.log(Number.isNaN(20 / 0)); //it will return false because 'Infinity' is
// //considered a number in javascript

// //Number.isFinite() checks if a value is number or not and a number is finite or not
// console.log(Number.isFinite(20)); //It will return true
// console.log(Number.isFinite(20 / 0)); //it will return false because infinity is not finite
// console.log(Number.isFinite(20.3));

// //Checking if a number is integer or not
// console.log(Number.isInteger(20));
// console.log(Number.isInteger(20.2)); //it will return false because this value is float
// console.log(Number.isInteger(20 / 0)); //it will return false because infinity is not integer

// console.log(Math.sqrt(25));

// console.log(Math.max(2, 3, 445, 6, 89));
// console.log(Math.max(2, 3, "445", 6, 89)); //It will do type coercion and return 445 as max value
// console.log(Math.max(2, 3, "445px", 6, 89));

// console.log(Math.min(2, 5, 6, 7, 8));
// console.log(Math.min("2", 5, 6, 7, 8));

// console.log(Math.PI * Number.parseFloat("10px") ** 2);

// console.log(Math.floor(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));

// //Rounding integers

// console.log(Math.trunc(2.4));
// console.log(Math.round(2.5)); //It will round off to nearest integer

// console.log(Math.ceil(2.1));
// console.log(Math.ceil(2.9));

// console.log(Math.floor("2.1"));
// console.log(Math.floor(2.99));
// console.log(Math.floor("-2.99"));

// console.log(Math.trunc(-2.9));
// console.log(Math.trunc("-2.9"));

// //rounding decimals
// //toFixed() returns a string, so to convert it into a number we used "+"
// console.log(+(2.7).toFixed(0));
// console.log(+(2.7).toFixed(2));
// console.log(+(2.3434).toFixed(5));

// //remainder operator

// console.log(5 % 2);
// console.log(5 / 2);
// console.log(8 % 3);

// const isEven = (n) => n % 2 == 0;

// console.log(isEven(2));
// console.log(isEven(9));

// labelBalance.addEventListener("click", function () {
//   [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = "orangered";
//     }
//   });
// });

// //Numeric seperators

// const diameter = 187_000_000_99;
// console.log(diameter);

// const Price = 232_343_4;

// console.log(Price);

// console.log(Math.PI);

// //BigInt
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2332323232332434566435423453453452345n);

// console.log(BigInt(2332323232332434566435423453453452345));

// const num = 23;
// const huge = 2332323232332434566435423453453452345n;

// console.log(100n + 1000n);

// console.log(huge * BigInt(num));

// console.log(Math.sqrt(25n));

// console.log(Math.floor(BigInt(233.33)))
//exceptions for bigint
// console.log(20n === 20);
// console.log(20n == 20);
// console.log(20n === "20");

// console.log(huge + "  This number is really big!");

// console.log(11n / 3n);

///////-----------------------------dates and times in javascript-------------

// ////creating a date

// const now=new Date()
// console.log(now);

// console.log(Date.now())
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2001,10,19,15,23,5));

// console.log(new Date(2001,10,30));
// console.log(new Date(2009, 10,33));

// console.log(new Date(0));

// console.log(new Date(3*24*60*60*1000));

// const future = new Date(2037, 10, 19, 15, 23);

// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.getMilliseconds());
// console.log(future.getTime());

// console.log(new Date(future.getTime()))

console.log(new Date().toISOString());
const future = new Date(2037, 10, 19, 15, 23);

console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(
  new Date(2037, 10, 19, 15, 23),
  new Date(2038, 10, 19, 15, 23)
);

console.log(days1);

//////-----------------------Formatting number-------------------------------------

// const num = 34342367.99;

// const options2 = {
//   style: "currency",
//   unit: "celsius",
//   currency: "INR",
//   // useGrouping:false
// };

// console.log("US: ", new Intl.NumberFormat("en-US", options2).format(num));
// console.log("India: ", new Intl.NumberFormat("en-IN", options2).format(num));
// console.log("Germany: ", new Intl.NumberFormat("de-De", options2).format(num));

// const ingredients = ["", "olives"];

// const pizzaTimer = setTimeout(
//   () => console.log("Here is your pizza!"),
//   1000,
//   ...ingredients
// );

// if (ingredients.includes("spinach")) {
//   clearTimeout(pizzaTimer);
// }

//timers and intervals

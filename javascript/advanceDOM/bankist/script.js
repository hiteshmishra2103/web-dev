"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector(".header");

const allsections = document.querySelectorAll(".section");
// console.log(allsections);

// console.log(document.getElementById("section--1"));
// console.log(document.getElementsByTagName("button"));

// console.log(document.getElementsByClassName("btn"));

//creating and inserting elements

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent="";
message.innerHTML =
  "We use cookie for improved functionality and analytics.<button class='btn btn--close-cookie'>Got it!</button>";

header.prepend(message);
// header.append(message);
// header.insertAdjacentElement("beforebegin", message);
// header.append(message.cloneNode(true));

// header.after(message);
// header.before(message);
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  // message.remove();
  message.parentElement.removeChild(message);
});

//styles

message.style.backgroundColor = "#37383d";
message.style.width = "100%";
// message.style.height = "";

// console.log(message);
// console.log(message.style.height);
// console.log(getComputedStyle(message).background);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// //working with attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.classList);

// console.log(logo.className);

// console.log(logo.getAttribute("designer"));
// console.log(logo.getAttribute("src"));

//// const link = document.querySelector(".twitter-link");

// console.log(link.href); //It will return the absolute path
// console.log(link.getAttribute("href")); //It will return the relative path

// console.log(logo.dataset.versionNumber);

//Classes
// logo.classList.add("c", "j");
// logo.classList.remove("c", "j");
// logo.classList.toggle("c");
// console.log(logo.classList.contains("c"));

//don't use this because it will override all the existing classes and also it allows to only put one
//classes

logo.className = "king";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

//Tabbed components
const tabs = document.querySelectorAll(".operations__tab");

const tabsContainer = document.querySelector(".operations__tab-container");

const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

//button scrolling

//page-navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });

//   });
// });

// btnScrollTo.addEventListener("click", () => {
//   const s1coords = section1.getBoundingClientRect();
//   //   console.log(s1coords);
//   //   console.log(event.target.getBoundingClientRect());

//   //   console.log("Current scroll(X/Y)", window.pageXOffset, window.pageYOffset); //It tells the scroll position
//   //   //with respect to x and y

//   //   console.log(
//   //     "height/width viewport",
//   //     document.documentElement.clientHeight,
//   //     document.documentElement.clientWidth
//   //   );

//   //scrolling
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: "smooth",
//   });

//   //   section1.scrollIntoView({ behavior: 'smooth' });
// });

// const h1 = document.querySelector("h1");

//events

// const alertH1 = (e) => {
//   alert("addEventListener: Great! You are reading the heading:D");
// };

// h1.addEventListener("mouseenter", alertH1);

// setTimeout(() => {
//     h1.removeEventListener("mouseenter", alertH1);
// }, 3000);

//We can add multiple event listeners to an element using addEventListener on the other hand we can't
//do so with other method for adding event listener, such as

// h1.addEventListener('mouseenter', (e)=>{
//     alert("Hello!");
// })

//another way of attaching event listeners to an element in javascript
// h1.onmouseenter = (e) => {
//   alert("addEventListener: Great! You are reading the heading:D");
// };

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//event delegation

// 1). Add event listener to common parent element.
// 2). Determine which elements originated the event.

document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    // this.style.backgroundColor = randomColor();

    event.preventDefault();

    ////stop propagation
    //   event.stopPropagation();

    if (event.target.classList.contains("nav__link")) {
      const id = event.target.getAttribute("href");

      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

// tabs.forEach((t) => t.addEventListener("click", () => console.log("tab")));//bad practice

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  //Guard clause
  if (!clicked) return;

  //Remove active classes

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));

  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  //active tab
  if (clicked) {
    clicked.classList.add("operations__tab--active");
  }

  //Active content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Menu fade animation

const handleHover = function (event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

//sticky navigation


//Using scroll event for sticky navigation causes👉 poor performance,⭐ you can use it but it is not
//a good practice, Below is the code for doing so👇

// const initialCoords=section1.getBoundingClientRect();

// window.addEventListener("scroll", function (e) {
//   console.log(this.window.scrollY);

//   if(this.window.scrollY>initialCoords.top){
//       nav.classList.add('sticky')
//   }
//   else{
//     nav.classList.remove('sticky')
//   }
// });



// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("container", e.target);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("nav", e.target);
// });

// document.querySelector(".nav").addEventListener("click", function(e) {
//   console.log('link');
// });

// //DOM Traversal⭐⭐⭐👇

// //query selector finds the children no matter how deep it is in the DOM tree

// const h1 = document.querySelector("h1");

// //Going downwards: child

// console.log(h1.querySelectorAll(".highlight"));

// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = "blue";
// h1.lastElementChild.style.color = "blue";

// console.log(h1.firstChild);
// console.log(h1.lastChild);

// // Going upwards: parents👇

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// //closest() is a very important method that we are gonna use it all the time while doing event delegation

// //closest() finds the parent no matter how up it is in the DOM tree and it is opposite of query selector

// h1.closest(".header").style.background = "var(--gradient-secondary)"; //It selected the closest header
// //to our h1 element⭐

// //Going sideways: Traversing the siblings

// console.log(h1.previousSibling);
// console.log(h1.previousElementSibling);

// console.log(h1.nextElementSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {

//   if (el !== h1) el.style.transform = "scale(0.5)";

// });

// //call and apply method

// const lufthansa = {
//   airline: "Lufthansa",
//   iataCode: "LH",
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
//   },
// };

// lufthansa.book(239, "king");
// lufthansa.book(200, "queen");

// const eurowings = {
//   name: "Eurowings",
//   iataCode: "EW",
//   bookings: [],
// };

// const book = lufthansa.book;

// book.call(eurowings, 343, "ace");
// console.log(eurowings);
// book.call(lufthansa, 23, "jack");
// console.log(lufthansa);

// //Apply method
// const flightData = [583, "George Cooper"];

// book.apply(eurowings, flightData);

// book.call(eurowings, ...flightData);

// //Bind method

// const bookEw = book.bind(eurowings);
// const bookLh = book.bind(lufthansa);

// const bookEw23 = book.bind(eurowings, 23);

// bookLh(45, "John");

// bookEw(34, "Pearls");

// bookEw23("hitesh");

// // //With event Listeners
// // lufthansa.planes = 300;
// // lufthansa.buyPlane = function () {
// //   console.log(this);

// //   this.planes++;
// //   console.log(this.planes);
// // };

// // document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// //partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addGST = addTax.bind(null, 0.23);

// console.log(addGST(100));
// console.log(Math.round(addGST(11)));

// const addTAXRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVAT2 = addTAXRate(0.23);

// console.log(addVAT2(100));
// console.log(addVAT2(12));

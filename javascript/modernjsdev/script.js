//Importing modules

// import {
//   addToCart,
//   totalPrice as price,
//   totalPrice,
//   totalQuantity as quantity,
//   totalQuantity,
// } from "./shoppingcart.js";
// console.log("Importing modules");

// // console.log(totalPrice, totalQuantity);

// // console.log(price, quantity);

// import * as shoppingcart from "./shoppingcart.js";

//exports=> named exports and default exports

// import add, * as shoppingcart from "./shoppingcart.js";

// //We should not mixed named and default modules like below, because it is not
// //a good practice

// import add, { cart } from "./shoppingcart.js";

// add("roti", 34);
// console.log(cart);
// console.log(shoppingcart.totalPrice);

//Top level await: In es6 we can use await without and async function in modules but not in simple
//javascript file
//It blocks further code execution

// console.log("Started Fetching!....");
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);

// console.log("Finished Fetching!....");

//top level await usage 👇
// const getLastPost = async function () {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = await getLastPost();

// console.log(lastPost);

//If one module imports another module which has top level await then the importing module will wait
//for the imported module to finish the blocking code

// const shoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart(shipping cost is ${shippingCost})`
//     );
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// shoppingCart2.addToCart("apple", 2);
// shoppingCart2.addToCart("banana", 4);

// console.log(shoppingCart2);
// console.log(shoppingCart2.shippingCost);

//Besides ES6 modules pattern, there are also other modules systems that had been used and common js
//modules are one of, they are not native to javascript and common js module
//Common Js modules

//Exporting modules
// export.addToCart=function (product, quantity) {
//         cart.push({ product, quantity });
//         console.log(
//           `${quantity} ${product} added to cart(shipping cost is ${shippingCost})`
//         );
//       };

//Importing modules

// const {addToCart}=require('./shoppingcart')

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
// import cloneDeep from "lodash-es/cloneDeep.js";
// import cloneDeep from "lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    {
      product: "bread",
      quantity: 5,
    },
    {
      product: "roti",
      quantity: 6,
    },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

const s = {
  name: "india",
  class: 10,
  new: {
    name: "singham",
    class: 122,
  },
};

const news = Object.assign({}, s);
s.class = 122;
s.new.class = 22;
console.log(news);

if (module.hot) {
  module.hot.accept();
}

console.log("Jonas" ?? null);
console.log(state.cart.find((el) => el.quantity >= 2));

//Polifilling 
import "core-js/stable";

//Polifilling async functions
import "regenerator-runtime/runtime";

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

import add from "./shoppingcart.js";

add("roti", 34);
console.log(shoppingcart.totalPrice);


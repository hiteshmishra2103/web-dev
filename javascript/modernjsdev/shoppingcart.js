//Exporting modules

console.log("Exporting modules");

const shippingCost = 10;

console.log("Start fetching users");

//top level await 👇
const res = await fetch("https://jsonplaceholder.typicode.com/users");

// console.log(res)

console.log("Finished fetching users");

export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

export const totalPrice = 20;
const totalQuantity = 23;

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

// export { totalPrice as price, totalQuantity };

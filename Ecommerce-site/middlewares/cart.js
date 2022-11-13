const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;
  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice 
    );
  }

  //making cart object available to all the other middleware functions and views throughout this request response cycle

  res.locals.cart = cart;
  next();
}

module.exports = initializeCart;

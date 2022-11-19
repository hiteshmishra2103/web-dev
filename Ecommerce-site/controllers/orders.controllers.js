const Order = require("../models/order.model");
const User = require("../models/user.model");
const { get } = require("../routes/auth.routes");

//the random key(secret key) which I had provided as an argument to the stripe package will be
//used internally by stripe package for sending the requests to stripe
//⚠️Don't share this random key to anyone because this key can be used to make
//charges connected to your account.
//The secret key is used in your backend code to send any other request to Stripe's API.
//You need to be careful never to leak your secret key,
//as it could be used to access your account and cause all sorts of troubles (refunding past charges,
//canceling subscriptions, deleting saved customers, etc.).

const stripe = require("stripe")(
  "sk_test_51M5TxkSBfbeuMwK3Di5lPq9wovBMtPGIDNTmcS8BDXI5S1HOqqTX5hDCylm5mOgnZwTA3FSUl3gC7mOifyp6lK7g00sICDj6yM"
);

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;

  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }
  //removing the items from the cart and adding them to the orders page
  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items:cart.items.map(function(item){
      return {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "INR",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price*100,
        },
        quantity: +item.quantity,
      }
    }),
    mode: "payment",
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  //we redirect user to stripe website here 👇, so that on the stripe website payment can be made
  //securely⭐ and when the payment will be completed then stripe will redirect user to the main website
  //depending on the status of payment(success or cancel). Code of redirecting in line 66 and 67 stripe.

  res.redirect(303, session.url);
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}

function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getFailure: getFailure,
  getSuccess: getSuccess,
};

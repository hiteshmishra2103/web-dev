class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }
  //method for creating the add an item cart functionality
  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    //Logic for If user adds same product to the cart
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.product.id === product.id) {
        //converting explicitly cartItem.quantity to number by placing "+" before item.quantity
        cartItem.quantity = +item.quantity + 1;
        cartItem.totalPrice = +cartItem.quantity*product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += +product.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += +product.price;
  }

//Function for updating the cart data

  updateItem(productId, newQuantity)
  
  {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.product.id === productId && newQuantity > 0) {
        const cartItem = { ...item };

        const quantityChange = newQuantity - item.quantity;

        cartItem.quantity = newQuantity;
        cartItem.totalPrice = +newQuantity * item.product.price;
        this.items[i] = cartItem;

        this.totalQuantity = this.totalQuantity + quantityChange;
        this.totalPrice += quantityChange * item.product.price;

        return { updatedItemPrice: cartItem.totalPrice };

      } 

      else if (item.product.id === productId && newQuantity <= 0)
      {

        this.items.splice(i, 1);
        this.totalQuantity = +this.totalQuantity - item.quantity;
        this.totalPrice -= +item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    }
  }
}

module.exports = Cart;

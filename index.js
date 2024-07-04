const cart = [];

// When click 'Cart Icon'
const displayCart = (cart) => {
  const cartItems = document.getElementById('cart');
  cartItems.innerHTML = '';

  cart.map((item, index) => {
    const oneItemInfo = document.createElement('div');
    const oneItemPrice = document.createElement('div');
    const oneItemQuantity = document.createElement('div');
    const oneItemSubtotal = document.createElement('div');

    oneItemInfo.textContent = `${item.name}, ${item.category}, ${item.color}, ${item.size}`;
    oneItemPrice.textContent = `${item.price}`;
    oneItemQuantity.textContent = `${item.quantity}`;
    oneItemSubtotal.textContent = `${item.subTotal}`;

    cartItems
      .appendChild(oneItemInfo)
      .appendChild(oneItemPrice)
      .appendChild(oneItemQuantity)
      .appendChild(oneItemSubtotal);
  });
};

displayCart(cart);

// When click 'Cart Icon'
const sumCartItems = (array) => {
  return cart.reduce((a, b) => a.subTotal + b.subTotal);
};

// when click 'Buy now'
const addToCart = (newItem) => {
  let itemFound = cart.find((item) => item.id === newItem.id);

  if (itemFound) {
    itemFound.quantity++;
    itemFound.subTotal += Number(newItem.price);
  } else {
    let quantity = 1;
    let subTotal = +newItem.price * quantity;
    cart.push({ ...newItem, quantity: quantity, subTotal: subTotal });
  }
  console.log(cart);
  displayCart(cart);
};

addToCart({
  id: 1,
  name: 'shoe',
  category: 'Mens TShirt',
  color: 'black',
  size: 'M',
  price: '19.99',
});
addToCart({
  id: 2,
  name: 'sho',
  category: 'Women TShirt',
  color: 'blue',
  size: 'M',
  price: '19.99',
});
addToCart({
  id: 1,
  name: 'shoe',
  category: 'Mens TShirt',
  color: 'black',
  size: 'M',
  price: '19.99',
});
addToCart({
  id: 3,
  name: 'tops',
  category: 'Women TShirt',
  color: 'black',
  size: 'M',
  price: '19.99',
});

sumCartItems(cart);

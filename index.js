const cart = [];

// When click 'Cart Icon'
const displayCart = (cart) => {
  const cartItems = document.getElementById('cart');
  cartItems.innerHTML = '';

  cart.map(item => {
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
displayTotal()

// When click 'Cart Icon'
const sumCartItems = (array) => {
  const total = array.reduce((total, currentItem) => (
    (total || 0) + currentItem.subTotal)
  , 0);
  return total
};

const displayTotal = () => {
  const total = document.getElementById('total-price')
  total.innerText = sumCartItems(cart)
}

displayTotal()

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
  // displayCart(cart);
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

console.log(cart);
const total = sumCartItems(cart);
console.log(total);

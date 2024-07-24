export const displayCart = (cart) => {
  const cartItems = document.getElementById('cart');
  cartItems.innerHTML = '';

  cart.map((item) => {
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

export const addToCart = (newItem, cart, inventory) => {
  // newItem is a number, not the object
  let itemFound = cart.findIndex((item) => item.id === newItem);
  let inventoryItem = inventory.find((item) => item.id === newItem);

  if (itemFound !== -1) {
    cart[itemFound] = {
      ...cart[itemFound],
      quantity: cart[itemFound].quantity + 1,
      subTotal: (cart[itemFound].subTotal += Number(inventoryItem.price)),
    };
  } else {
    let quantity = 1;
    cart.push({
      ...inventoryItem,
      quantity: quantity,
      subTotal: Number(inventoryItem.price),
    });
  }

  //displayCart(cart);
  updateBasketQuantity(cart)
};

export const updateBasketQuantity = (cart) => {
  const basketElement = document.getElementById('addTobasket');
  basketElement.classList.remove('hidden');
  const quantityItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  basketElement.innerHTML = quantityItems;
};

export const sumCartItems = (array = []) => {
  return array.length != 0
    ? array.reduce((a, b) => a.subTotal + b.subTotal)
    : 0;
};

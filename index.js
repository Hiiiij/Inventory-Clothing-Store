const cart = [];

// const displayCart = (cart) => {
//   const listItems = document.getElementById('cartItems');
//   listItems.innerHTML = '';

//   cart.map((item) => {
//     const oneItem = document.createElement('li');
//     oneItem.textContent = item;
//     listItems.appendChild(oneItem);
//   });
// };

const addToCart = (newItem) => {
  let itemFound = cart.find((item) => item.id === newItem.id)
  console.log('itemFound', itemFound);
  
    if (itemFound) {
      itemFound.quatity++;
      itemFound.subTotal += Number(newItem.price);
    } else {
      let quatity = 1;
      let subTotal = +newItem.price * quatity;
    
      cart.push({ ...newItem, quatity: quatity, subTotal: subTotal });
      console.log('new item added');
    }

  // displayCart(cart);
};

addToCart({ id: 1, name: 'shoe', price: '19.99' });
addToCart({ id: 2, name: 'sh', price: '19.99' });
addToCart({ id: 1, name: 'shoe', price: '19.99' });
console.log(cart);
console.log(cart.keys());

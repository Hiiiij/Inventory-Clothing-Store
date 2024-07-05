function loadCSV(url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => callback(data))
    .catch(error => console.error('Error loading CSV file:', error));
}

function parseCSV(data) {
  const lines = data.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const items = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    if (line.length === headers.length) {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = line[index].trim();
      });
      items.push(item);
    }
  }
  return items;
}

function displayItems(array) {
  const displayList = document.getElementById('display-list');
  displayList.innerHTML = ''; 

  array.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');

    const image = document.createElement('img');
    image.classList.add('h-auto', 'max-w-full', 'rounded-lg');
    image.src = item.image;
    image.alt = item.name;

    const id = document.createElement('p');
    id.classList.add('text-lg', 'font-bold', 'mb-2');
    id.innerText = item.id;

    const name = document.createElement('p');
    name.classList.add('text-lg', 'font-bold', 'mb-2');
    name.innerText = item.name;

    const category = document.createElement('p');
    category.classList.add('text-gray-700', 'mb-2');
    category.innerText = `Category: ${item.category}`;

    const color = document.createElement('p');
    color.classList.add('text-gray-700', 'mb-2');
    color.innerText = `Color: ${item.color}`;

    const size = document.createElement('p');
    size.classList.add('text-gray-700', 'mb-2');
    size.innerText = `Size: ${item.size}`;

    const price = document.createElement('p');
    price.classList.add('text-green-500', 'font-bold');
    price.innerText = `Price: $${item.price}`;

    const btn = document.createElement('button');
    btn.classList.add('text-lg', 'font-bold', 'mb-2');
    btn.innerText = "Buy now";

    card.appendChild(image);
    card.appendChild(id);
    card.appendChild(name);
    card.appendChild(category);
    card.appendChild(color);
    card.appendChild(size);
    card.appendChild(price);
    card.appendChild(btn);

    displayList.appendChild(card);
  });
}

function filterItems(items, query) {
  return items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );
}

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchBar').value;
  loadCSV('items.csv', data => {
    const inventory = parseCSV(data);
    const filteredItems = filterItems(inventory, query);
    displayItems(filteredItems);
  });
});

// Initial load 
loadCSV('items.csv', (data) => {
  const inventory = parseCSV(data);
  displayItems(inventory);
});

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

import { displayCart, addToCart, updateBasketQuantity, sumCartItems  } from "./cart_functions.js";

function testing() {
  console.log('hi');
}

const cart = []
// displayCart(cart)

function loadCSV(url, callback) {
  fetch(url)
  .then((response) => response.text())
  .then((data) => callback(data))
  .catch((error) => console.error('Error loading CSV file:', error));
}

function parseCSV(data) {
  const lines = data.split('\n');
  const headers = lines[0].split(',').map((header) => header.trim());
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

document.addEventListener('DOMContentLoaded', function () {
  const bgBlur = document.querySelector('.bg-purple-100');
  
  // Function to toggle blur class based on scroll position
  function toggleBlurClass() {
    if (window.scrollY > 100) {
      // Horizontal scroll position
      bgBlur.classList.add('blur-on-scroll');
    } else {
      bgBlur.classList.remove('blur-on-scroll');
    }
  }
  
  // Add scroll event listener to toggle blur class
  window.addEventListener('scroll', toggleBlurClass);
  
  // Initial call to set the initial state based on scroll position
  toggleBlurClass();
});

function displayItems(array) {
  const displayList = document.getElementById('display-list');
  displayList.innerHTML = '';
  
  array.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');
    
    card.setAttribute('data-id', item.id);
    
    const id = document.createElement('p');
    id.classList.add('text-lg', 'font-bold', 'mb-2', 'hidden');
    
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
    price.classList.add('text-purple-500', 'font-bold');
    price.innerText = `Price: $${item.price}`;
    
    const btn = document.createElement('button');
    btn.classList.add('text-lg', 'font-bold', 'mb-2', 'buy-now');
    btn.id = item.id;
    btn.innerText = 'Buy now';
    
    card.appendChild(id);
    card.appendChild(name);
    card.appendChild(category);
    card.appendChild(color);
    card.appendChild(size);
    card.appendChild(price);
    card.appendChild(btn);
    
    displayList.appendChild(card);
  });
  
  const buyNow = document.getElementsByClassName('buy-now');
  
  for (var i = 0; i < buyNow.length; i++) {
    const id = buyNow[i].id;
    buyNow[i].addEventListener('click', (event) => {
      addToCart(id, cart, inventory);
    });
  }
}



function filterItems(items, query) {
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );
}

function filterByGender(items, gender) {
  if (gender === 'Men') {
    return items.filter((item) => !item.name.toLowerCase().includes("women's"));
  }
  if (gender === 'Women') {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes("women's") ||
        item.name.toLowerCase().includes('unisex')
    );
  }
  return items;
}

function filterByCategory(items, category) {
  if (category === 'All categories') {
    return items;
  } else {
    return items.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }
}

function applyFilters(items, gender, category, query) {
  let filteredItems = items;

  if (gender) {
    filteredItems = filterByGender(filteredItems, gender);
  }

  if (category) {
    filteredItems = filterByCategory(filteredItems, category);
  }

  if (query) {
    filteredItems = filterItems(filteredItems, query);
  }

  return filteredItems;
}

let inventory = [];

function loadAndDisplayItems(
  url,
  gender = null,
  category = null,
  query = null
) {
  loadCSV(url, (data) => {
    const inv = parseCSV(data);
    const filteredItems = applyFilters(inv, gender, category, query);
    displayItems(filteredItems);
    inventory = filteredItems;
  });
}

function toggleBtn() {
  document.getElementById('shoppingCartList').style.display = 'none';
}

//event handler for close-btn on modal
document.getElementById('closeCart').onclick = toggleBtn;

// Initial load of all items from CSV
loadAndDisplayItems('items.csv');

// Handle click events on gender filter buttons
document.querySelectorAll('[data-gender]').forEach((button) => {
  button.addEventListener('click', () => {
    const gender = button.getAttribute('data-gender');
    const category = document
      .getElementById('dropdownButton')
      .textContent.trim();
    const query = document.getElementById('searchBar').value;

    document
      .querySelectorAll('[data-gender]')
      .forEach((btn) => btn.classList.remove('active'));
    // button.classList.add('active');

    loadAndDisplayItems(
      'items.csv',
      gender,
      category !== 'All categories' ? category : null,
      query
    );
  });
});

// Handle click events on gender filter buttons
// document.querySelectorAll('[data-gender]').forEach(button => {
//   button.addEventListener('click', () => {
//     const isActive = button.classList.contains('active');
//     let gender = null;
//     document.querySelectorAll('[data-gender]').forEach(btn => btn.classList.remove('active'));
//     // Toggle active state
//     if (isActive) {
//       button.classList.remove('active');
//     } else {

//       button.classList.add('active');
//       gender = button.getAttribute('data-gender');
//     }

//     const category = document.getElementById('dropdownButton').textContent.trim();
//     const query = document.getElementById('searchBar').value;

//     loadAndDisplayItems('items.csv', gender, category !== 'All categories' ? category : null, query);
//   });
// });

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchBar').value;
  const gender =
    document
      .querySelector('[data-gender].active')
      ?.getAttribute('data-gender') || null;
  const category = document.getElementById('dropdownButton').textContent.trim();

  loadAndDisplayItems(
    'items.csv',
    gender,
    category !== 'All categories' ? category : null,
    query
  );
});

document.getElementById('dropdownButton').addEventListener('mouseenter', () => {
  console.log('mouse enter');
  document.getElementById('dropdownMenu').classList.remove('hidden');
});
console.log('mouse enter');

document.getElementById('dropdownButton').addEventListener('mouseleave', () => {
  setTimeout(() => {
    if (!document.getElementById('dropdownMenu').matches(':hover')) {
      document.getElementById('dropdownMenu').classList.add('hidden');
    }
  }, 200);
});

console.log('mouse enter');
document.getElementById('dropdownMenu').addEventListener('mouseleave', () => {
  setTimeout(() => {
    if (!document.getElementById('dropdownButton').matches(':hover')) {
      document.getElementById('dropdownMenu').classList.add('hidden');
    }
  }, 200);
});
console.log('mouse enter');
// Prevent dropdown menu from disappearing when mouse is over it
document.getElementById('dropdownMenu').addEventListener('mouseenter', () => {
  document.getElementById('dropdownMenu').classList.remove('hidden');
});
console.log('mouse enter');
// Handle category selection
document.querySelectorAll('#dropdownMenu a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const category = event.target.getAttribute('data-category');
    document.getElementById('dropdownButton').innerHTML = `${category}
      <svg class="h-5 w-5 text-gray-400 ml-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clip-rule="evenodd" />
      </svg>`;
    console.log('mouse enter');
    const gender =
      document
        .querySelector('[data-gender].active')
        ?.getAttribute('data-gender') || null;
    const query = document.getElementById('searchBar').value;

    loadAndDisplayItems(
      'items.csv',
      gender,
      category !== 'All categories' ? category : null,
      query
    );

    document.getElementById('dropdownMenu').classList.add('hidden');
  });
});

// Function to render products
function renderProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-md');

    const image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.name;
    image.classList.add(
      'h-48',
      'w-full',
      'object-cover',
      'object-center',
      'mb-4'
    );

    const name = document.createElement('p');
    name.classList.add('text-lg', 'font-bold', 'mb-2');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.classList.add('text-purple-500', 'font-bold');
    price.textContent = `$${product.price}`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add(
      'mt-4',
      'block',
      'w-full',
      'bg-indigo-600',
      'hover:bg-indigo-700',
      'text-white',
      'px-4',
      'py-2',
      'rounded-md',
      'text-center',
      'font-semibold',
      'focus:outline-none'
    );
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.addEventListener('click', () => addToCart(product));

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(addToCartBtn);

    productList.appendChild(card);
  });
}

// Function to add product to cart
cart.forEach((item) => {
  const cartItem = document.createElement('div');
  cartItem.classList.add(
    'flex',
    'items-center',
    'justify-between',
    'border-b',
    'border-gray-200',
    'py-4'
  );

  const itemDetails = document.createElement('div');
  itemDetails.classList.add('flex', 'items-center', 'space-x-4');

  const image = document.createElement('img');
  image.src = item.imageUrl;
  image.alt = item.name;
  image.classList.add('h-12', 'w-12', 'object-cover', 'rounded-md');

  const itemName = document.createElement('span');
  itemName.classList.add('text-lg', 'font-medium', 'text-gray-900');
  itemName.textContent = item.name;

  const itemPrice = document.createElement('span');
  itemPrice.classList.add('text-gray-500');
  itemPrice.textContent = `$${item.price.toFixed(2)}`;

  const itemQuantity = document.createElement('span');
  itemQuantity.classList.add('text-gray-500');
  itemQuantity.textContent = `x${item.quantity}`;

  itemDetails.appendChild(image);
  itemDetails.appendChild(itemName);
  itemDetails.appendChild(itemPrice);
  itemDetails.appendChild(itemQuantity);

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('text-red-500', 'hover:text-red-700');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => removeFromCart(item.id));

  cartItem.appendChild(itemDetails);
  cartItem.appendChild(removeBtn);

  cartItems.appendChild(cartItem);

  subtotal += item.price * item.quantity;
});

// document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;

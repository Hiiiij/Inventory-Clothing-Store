loadCSV('items.csv', (data) => {
  const inventory = parseCSV(data);
  //do anything with data here
  displayItems(inventory)
  console.log(inventory)
});

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

const displayItems = (array) => {
  const displayList = document.getElementById('display-list') // div element in html file
  displayList.innerHTML = ''
  
  array.map(item => {
    const card = document.createElement('div')
    const image = document.createElement('img')
    const name = document.createElement('p')
    const category = document.createElement('p')
    const color = document.createElement('p')
    const size = document.createElement('p')
    const price = document.createElement('p')

    image.innerText = 'add the src'
    name.innerText = item.name
    category.innerText = item.category
    color.innerText = item.color
    size.innerText = item.size
    price.innerText = item.price

    card.appendChild(name).appendChild(category).appendChild(color).appendChild(size).appendChild(price)
    displayList.appendChild(card)
  })
}
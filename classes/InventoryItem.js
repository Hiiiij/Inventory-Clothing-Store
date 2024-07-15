export default class InventoryItem {
  constructor(id, name, category, price, color, size) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.color = color;
    this.size = size;
  };
  displayDetails() {
    console.log(`ID: ${this.id}, Name: ${this.name}, Category: ${this.category}, Price: ${this.price}, Color: ${this.color}, Size: ${this.size}`)
  }
}
//add methods and 

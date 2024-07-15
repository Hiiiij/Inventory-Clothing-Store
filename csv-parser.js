
import inventoryItem from './classes/InventoryItem.js';


export function parseCSV(data) {
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


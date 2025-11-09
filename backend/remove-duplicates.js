const fs = require('fs');
const path = require('path');

// Load products
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'));

// Find duplicates by name
const seen = new Set();
const duplicates = [];
const unique = products.filter(product => {
  const key = product.name?.toLowerCase().trim();
  if (seen.has(key)) {
    duplicates.push(product);
    return false;
  }
  seen.add(key);
  return true;
});

console.log(`Original: ${products.length}, Unique: ${unique.length}, Duplicates: ${duplicates.length}`);

// Write unique back
fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(unique, null, 2));

console.log('Duplicates removed from products.json');

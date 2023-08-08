// recover.js
const bs58 = require('bs58');
const fs = require('fs');
b = bs58.decode('4396S3xvyTbE7XcvcPg3U24rqqxFjQ4tUYCtUPzN8encvk1ZRkHwo2o1R53tM7kcZbbExJJEA49qBNBSmSEkLvRL');
j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
fs.writeFileSync('key.json', `[${j}]`);
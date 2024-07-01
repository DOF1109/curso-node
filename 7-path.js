const path = require('node:path');

// Barra searadora de path segun el S.O.
console.log('\n' + path.sep);

// Unir path
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log('\n' + filePath);

// Nombre del archivo
const fileName = path.basename('temp/prueba/miArchivo.txt')
console.log('\n' + fileName);

// Extension del archivo
const extension = path.extname('miImagen.jpeg')
console.log('\n' + extension);
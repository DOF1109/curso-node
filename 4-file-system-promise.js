const fs = require('node:fs/promises')

console.log('\nLeyendo el 1° archivo...');
fs.readFile('./archivo.txt', 'utf-8')
    .then(text => {
        console.log('***** Primer archivo: ', text);
    })

console.log('\nLeyendo el 2° archivo...');
fs.readFile('./archivo2.txt', 'utf-8')
    .then(text => {
        console.log('***** Segundo archivo: ', text);
    })

console.log('\nHacer cosas mientras lee el archivo...');

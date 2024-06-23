import { readFile } from 'node:fs/promises';

console.log('\nLeyendo el 1° archivo...');
const text = await readFile('./archivo.txt', 'utf-8');
console.log('***** Primer archivo: ', text);

console.log('\nLeyendo el 2° archivo...');
const secondText = await readFile('./archivo2.txt', 'utf-8');
console.log('***** Segundo archivo: ', secondText);

console.log('\nHacer cosas mientras lee el archivo...');

import { readFile } from 'node:fs/promises';

Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
])
.then( ([text, secondText]) => {
    console.log('\nLeyendo el 1° archivo...');
    console.log(text);
    console.log('\nLeyendo el 2° archivo...');
    console.log(secondText);
})

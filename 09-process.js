// Argumentos de entrada
console.log(process.argv);

// Current Working Directory
console.log(process.cwd());

// Controlar eventos del proceso
process.on('exit', () => {
    // limpiar los recursos
})

// Variables de entorno
console.log(process.env.MI_VARIABLE);

// Controlar el proceso y su salida
process.exit(0); // todo ok
process.exit(1); // con un error
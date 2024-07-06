const http = require("node:http");
const findAvaliablePort = require("./12-free-port");

// Lo defino al ejecutar el archivo "PORT=1234 node 11-http.js"
// Las varialbes de entorno son propias de node y no es necesario un .env
// por eso la defino antes de ejecutar el archivo
const desiredPort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log("Request received");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hola Mundo");
});

findAvaliablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});

// El puerto "0" busca el primer puerto disponible y lo utiliza
// server.listen(0, () => {
//   console.log(
//     `Server listening on port http://localhost:${server.address().port}`
//   );
// });

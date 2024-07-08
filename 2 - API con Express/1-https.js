const http = require("node:http");
const fs = require("node:fs");

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("<h1>Bienvenido a mi página de inicio!</h1>");
  } else if (req.url === "/img-express.png") {
    fs.readFile("./img-express.png", (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end("<h1>Internal server error</h1>")
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/png")
        res.end(data)
      }
    })
  } else if (req.url === "/contact") {
    res.statusCode = 200;
    res.end("<h1>Contacto</h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1>Página no encontrada</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`);
});

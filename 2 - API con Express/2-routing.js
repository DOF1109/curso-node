const http = require("node:http");

const dittoJson = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "aplcication/json; charset=utf-8");
          return res.end(JSON.stringify(dittoJson));
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end("<h1>Página no encontrada</h1>");
      }

    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = "";
          // Escucho el evento data y lo guardo a medida que llegan los datos en fragmentos
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          // Escucho el evento end
          req.on("end", () => {
            const data = JSON.parse(body);
            // llamar a una bbdd para almacenar info
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });
          break;
        }
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end("<h1>Página no encontrada</h1>");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log("Server is listening port http://localhost:1234");
});

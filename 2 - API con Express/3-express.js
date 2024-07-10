const express = require("express");
const ditto = require("./pokemon/ditto.json");

const PORT = process.env.PORT ?? 1234;

const app = express();
// Oculto la tecnología que utilizo por seguridad
app.disable("x-powered-by");

app.get("/pokemon/ditto", (req, res) => {
  // res.send("<h1>Mi página!</h1>");
  res.json(ditto);
});

app.post("/pokemon", (req, res) => {
  let body = "";
  // Escucho el evento data y lo guardo a medida que llegan los datos en fragmentos
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  // Escucho el evento end
  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    res.status(201).json(data);
  });
});

// Tiene que ser la ultima y usar "use" para el 404
app.use((req, res) => {
  res.status(404).send("<h1>404 :P</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listenting port http://localhost:${PORT}`);
});

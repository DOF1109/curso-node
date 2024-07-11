const express = require("express");
const ditto = require("./pokemon/ditto.json");

const PORT = process.env.PORT ?? 1234;

const app = express();
// Oculto la tecnología que utilizo por seguridad
app.disable("x-powered-by");

// ------------ Middleware ------------
// middleware de express que obtiene la info enviada con la request
// y la deja disponible en "req.body" en formato objeto de js
app.use(express.json());

// ------------ Endpoints ------------
app.get("/pokemon/ditto", (req, res) => {
  // res.send("<h1>Mi página!</h1>");
  res.json(ditto);
});

app.post("/pokemon", (req, res) => {
  // req.body podriamos guardar en bbdd
  res.status(201).json(req.body);
});

// Tiene que ser la ultima y usar "use" para el 404
app.use((req, res) => {
  res.status(404).send("<h1>404 :P</h1>");
});

// ------------ Inicia el server ------------
app.listen(PORT, () => {
  console.log(`Server is listenting port http://localhost:${PORT}`);
});

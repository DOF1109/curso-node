const express = require("express");
const movies = require("./movies.json");
const crypto = require("node:crypto"); // para crear los id
// const { validateMovie } = require("./schemas/movies");

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by"); // desabilita el header X-Powered-By: Express

// ------------ Middleware ------------
app.use(express.json());

// ------------ Endpoints ------------
app.get("/", (req, res) => {
  res.json({ saludo: "Hola mundo!" });
});

app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((gen) => gen.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  console.log("Recived request");
  const resultValidation = validateMovie(req.body);

  if (resultValidation.error) {
    console.log("Validation error");
    res.status(400).json({
      error: JSON.parse(resultValidation.error.message),
    });
  }

  const newMovie = {
    id: crypto.randomUUID(), // crea un Universal Unique IDentifier
    ...resultValidation.data, // recibo los datos porque los validé previamente
  };
  movies.push(newMovie);
  res.status(201).json(newMovie); // devuelvo lo creado para actualizar la caché
});

// ------------ Inicia el server ------------
app.listen(PORT, () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
);

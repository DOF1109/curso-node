const express = require("express");
const movies = require("./movies.json");
const crypto = require("node:crypto"); // para crear los id
const cors = require("cors"); // para permitir CORS desde navegador
const { validateMovie, validatePartialMovie } = require("./schemas/movies.js");

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by"); // desabilita el header X-Powered-By: Express

// Metodos simples: GET, HEAD, POST
// Metodos complejos: PUT, PATCH, DELETE

// CORS PRE-Fligth --> para metodos complejos
// Hace una peticion OPTIONS antes de hacer un PUT, PATCH o DELETE

// ------------ Middleware ------------
app.use(express.json());
// Personalizo los origenes permitidos para consumir la API
app.use(
  cors({
    origin: (origin, callback) => {
      // Origenes acetados por CORS
      const ACCEPTED_ORIGINS = [
        "http://localhost:8080",
        "https://movie.com",
        "https://midu.dev",
      ];

      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// ------------ Endpoints ------------
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
  const resultValidation = validateMovie(req.body);

  if (resultValidation.error) {
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

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    res.status(404).json({ message: "Movie not found" });
  }

  // eliminamos el elemento
  movies.splice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});

app.patch("/movies/:id", (req, res) => {
  const resultValidation = validatePartialMovie(req.body);

  if (resultValidation.error) {
    res.status(404).json({
      error: JSON.parse(resultValidation.error.message),
    });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    res.status(404).json({
      message: "Movie not found",
    });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...resultValidation.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

// ------------ Inicia el server ------------
app.listen(PORT, () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
);

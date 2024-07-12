const express = require("express");
const movies = require("./movies.json");

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by"); // desabilita el header X-Powered-By: Express

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
    return res.json(filteredMovies)
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

// ------------ Inicia el server ------------
app.listen(PORT, () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
);

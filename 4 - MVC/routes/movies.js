import { Router } from "express";
import { readJSON } from "../utils.js";
import { randomUUID } from "node:crypto"; // para crear los id
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

const movies = readJSON("./movies.json");
const moviesRouter = Router();

moviesRouter.get("/", (req, res) => {
    const { genre } = req.query;

    if (genre) {
        const filteredMovies = movies.filter((movie) =>
        movie.genre.some((gen) => gen.toLowerCase() === genre.toLowerCase())
        );
        return res.json(filteredMovies);
    }
    res.json(movies);
})

moviesRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === id);
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
})

moviesRouter.post("/", (req, res) => {
    const resultValidation = validateMovie(req.body);
  
    if (resultValidation.error) {
      res.status(400).json({
        error: JSON.parse(resultValidation.error.message),
      });
    }
  
    const newMovie = {
      id: randomUUID(), // crea un Universal Unique IDentifier
      ...resultValidation.data, // recibo los datos porque los validé previamente
    };
    movies.push(newMovie);
    res.status(201).json(newMovie); // devuelvo lo creado para actualizar la caché
})

moviesRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
  
    if (movieIndex === -1) {
      res.status(404).json({ message: "Movie not found" });
    }
  
    // eliminamos el elemento
    movies.splice(movieIndex, 1);
  
    return res.json({ message: "Movie deleted" });
})

moviesRouter.patch("/:id", (req, res) => {
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
})

export default moviesRouter;
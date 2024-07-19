import { Router } from "express";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
import { MovieModel } from "../models/movie.js";

const moviesRouter = Router();

moviesRouter.get("/", async (req, res) => {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
})

moviesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
})

moviesRouter.post("/", async (req, res) => {
    const resultValidation = validateMovie(req.body);
  
    if (resultValidation.error) {
      res.status(400).json({
        error: JSON.parse(resultValidation.error.message),
      });
    }
  
    const newMovie = await MovieModel.create({ input: resultValidation.data });
    res.status(201).json(newMovie); // devuelvo lo creado para actualizar la caché
})

moviesRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const result = await MovieModel.delete({ id });
  
    if (result) return res.json({ message: "Movie deleted" });
    
    return res.status(404).json({ message: "Movie not found" });
})

moviesRouter.patch("/:id", async (req, res) => {
    const resultValidation = validatePartialMovie(req.body);
  
    if (resultValidation.error) {
      return res.status(404).json({
        error: JSON.parse(resultValidation.error.message),
      });
    }
  
    const { id } = req.params;
    const updatedMovie = await MovieModel.update({ id, input: resultValidation.data });
  
    if (!updatedMovie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    return res.json(updatedMovie);
})

export default moviesRouter;
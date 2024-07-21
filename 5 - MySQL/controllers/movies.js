import { MovieModel } from "../models/local-file-system/movie.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ error: "Movie not found" });
  }

  static async create(req, res) {
    const resultValidation = validateMovie(req.body);

    if (resultValidation.error) {
      return res.status(400).json({
        error: JSON.parse(resultValidation.error.message),
      });
    }
    const newMovie = await MovieModel.create({ input: resultValidation.data });
    res.status(201).json(newMovie); // devuelvo lo creado para actualizar la caché
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await MovieModel.delete({ id });

    if (result) return res.json({ message: "Movie deleted" });

    res.status(404).json({ message: "Movie not found" });
  }

  static async update(req, res) {
    const resultValidation = validatePartialMovie(req.body);

    if (resultValidation.error) {
      return res.status(400).json({
        error: JSON.parse(resultValidation.error.message),
      });
    }

    const { id } = req.params;
    const updatedMovie = await MovieModel.update({
      id,
      input: resultValidation.data,
    });

    if (!updatedMovie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.json(updatedMovie);
  }
}

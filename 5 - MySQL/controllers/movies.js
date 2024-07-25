import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query;
    const movies = await this.movieModel.getAll({ genre });
    res.json(movies);
  }

  getById = async (req, res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ error: "Movie not found" });
  }

  create = async (req, res) => {
    const resultValidation = validateMovie(req.body);

    if (resultValidation.error) {
      return res.status(400).json({
        error: JSON.parse(resultValidation.error.message),
      });
    }
    const newMovie = await this.movieModel.create({ input: resultValidation.data });
    res.status(201).json(newMovie); // devuelvo lo creado para actualizar la caché
  }

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.movieModel.delete({ id });

    if (result) return res.json({ message: "Movie deleted" });

    res.status(404).json({ message: "Movie not found" });
  }

  update = async (req, res) => {
    const resultValidation = validatePartialMovie(req.body);

    if (resultValidation.error) {
      return res.status(400).json({
        error: JSON.parse(resultValidation.error.message),
      });
    }

    const { id } = req.params;
    const updatedMovie = await this.movieModel.update({
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

import { readJSON } from "../../utils.js";
import { randomUUID } from "node:crypto"; // para crear los id

const movies = readJSON("./movies.json");

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) => {
        return movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase());
      });
    }
    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(), // crea un Universal Unique IDentifier
      ...input,
    };
    movies.push(newMovie);
    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    // Elimino el elemento
    movies.splice(movieIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    const updateMovie = {
      ...movies[movieIndex],
      ...input,
    };

    movies[movieIndex] = updateMovie;
    return movies[movieIndex];
  }
}

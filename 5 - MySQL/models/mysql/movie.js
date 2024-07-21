import mysql from "mysql2/promise";

// Configuracion de conexion
const config = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "moviesdb",
};

// Conexion a la base de datos
const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      // Obtengo el id del género que coincide con el género ingresado en minusculas
      const [genres] = await connection.query(
        "SELECT id, name FROM genre WHERE LOWER(name) =?",
        [lowerCaseGenre]
      );

      // Si no encontró el genero
      if (genre.length === 0) return [];

      // Obtengo el id del género encontrado
      const [{ id }] = genres;

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // devolver resultados
      return []; // cambiar al realizar
    }
    const [movies] = await connection.query(
      "SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie;"
    );
    console.log(movies);
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}

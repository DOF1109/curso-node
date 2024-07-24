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
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate 
        FROM movie
        WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (movies.length === 0) return null;

    return movies[0];
  }

  // falta extraer e insertar los generos
  static async create({ input }) {
    // Extraigo los valores del input
    const {
      genre: genreInput, // un array
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;

    // todo: crear la conexion de genre

    // Genero un uuid con mysql
    const [uuidResult] = await connection.query(`SELECT UUID() uuid;`);
    const [{ uuid }] = uuidResult;

    try {
      // Inserto la pelicula en la BD
      const result = await connection.query(
        `INSERT INTO movie (id, title, year, duration, director, poster, rate)
          VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, duration, director, poster, rate]
      );
    } catch (error) {
      throw new Error("Error creating movie");
      // los detalles del error enviar a un servicio interno no al usuario
      // sendLog(error)
    }

    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) AS id, title, year, duration, director, rate, poster
        FROM movie
        WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {}

  static async update({ id, input }) {}
}

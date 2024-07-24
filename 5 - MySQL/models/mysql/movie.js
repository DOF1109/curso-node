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
      // Obtengo las movies que coinciden con el género ingresado en minusculas
      const [movies] = await connection.query(
        `SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate
          FROM movies m
          JOIN movie_genre mg ON m.id = mg.movie_id
          JOIN genre g ON mg.genre_id = g.id
          WHERE LOWER(g.name) = ?;`,
          [genre.toLowerCase()]
      )

      // Si no encontró movies con ese genero
      if (movies.length === 0) return [];

      return movies;
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

  static async delete({ id }) {
    try {
      const [result] = await connection.query(
        `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error creating movie");
      // los detalles del error enviar a un servicio interno no al usuario
      // sendLog(error)
    }
  }

  static async update({ id, input }) {}
}

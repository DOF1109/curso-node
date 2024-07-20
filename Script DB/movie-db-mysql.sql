-- Creacion de DB
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

-- Usar
USE moviesdb;

 -- Crear tablas
 CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2,1) UNSIGNED NOT NULL
 );
 
 CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genre (
	movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

-- Insertar datos
INSERT INTO genre (name) VALUES
("Drama"),
("Action"),
("Crime"),
("Sci-Fi"),
("Adventure"),
("Romance");

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
(UUID_TO_BIN(UUID()), "Gladiator", 2000, "Ridley Scott", 155, "https://img.fruugo.com/product/0/60/14417600_max.jpg", 8.5),
(UUID_TO_BIN(UUID()), "Interstellar", 2014, "Christopher Nolan", 169, "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg", 8.6);

INSERT INTO movie_genre (movie_id, genre_id) VALUES
((SELECT id FROM movie WHERE title = "Inception"), (SELECT id FROM genre WHERE name = "Action")),
((SELECT id FROM movie WHERE title = "Inception"), (SELECT id FROM genre WHERE name = "Adventure")),
((SELECT id FROM movie WHERE title = "Gladiator"), (SELECT id FROM genre WHERE name = "Action")),
((SELECT id FROM movie WHERE title = "Gladiator"), (SELECT id FROM genre WHERE name = "Drama")),
((SELECT id FROM movie WHERE title = "Interstellar"), (SELECT id FROM genre WHERE name = "Adventure")),
((SELECT id FROM movie WHERE title = "Interstellar"), (SELECT id FROM genre WHERE name = "Sci-Fi"));

SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie;

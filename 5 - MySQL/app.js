import express, { json } from "express";
import moviesRouter from "./routes/movies.js";
import corsMiddleware from "./middlewares/cors.js";

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by"); // desabilita el header X-Powered-By: Express

// ------------ Middleware ------------
// Middleware para obtener los datos enviados en la request
app.use(json());
// Personalizo los origenes permitidos para consumir la API
app.use(corsMiddleware());

// ------------ Endpoints ------------
app.use("/movies", moviesRouter);

// ------------ Inicia el server ------------
app.listen(PORT, () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
);

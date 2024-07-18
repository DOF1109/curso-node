import cors from "cors"; // para permitir CORS desde navegador

// Metodos simples: GET, HEAD, POST
// Metodos complejos: PUT, PATCH, DELETE

// CORS PRE-Fligth --> para metodos complejos
// Hace una peticion OPTIONS antes de hacer un PUT, PATCH o DELETE

// Origenes acetados por CORS
const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  "https://movie.com",
  "https://midu.dev",
];

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
})

export default corsMiddleware;
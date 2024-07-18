// Leer json con ESModules
// import movies from "./movies.json" with { type: "json" }; todavia no es estable
import { createRequire } from "node:module";
const require = createRequire(import.meta.url); // creo un require

export const readJSON = (path) => require(path) // uso mi require para leer el json

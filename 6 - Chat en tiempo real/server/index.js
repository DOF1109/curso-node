import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;

// Creamos un servidor http y que tenga la funcionalidad de socket.io
const app = express();
const server = createServer(app);
const io = new Server(server);

// Mostrar en consola los logs de las request al server
app.use(logger("dev"));

io.on("connetion", () => {
  console.log("A user has connected!");
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

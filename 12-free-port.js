const net = require("node:net");

function findAvaliablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(desiredPort, () => {
      const port = server.address().port;
      server.close(() => {
        resolve(port);
      });
    });

    server.on("error", (err) => {
      if (err.code === "EADDINUSE") {
        findAvaliablePort(0).then((port) => resolve(port));
      } else {
        reject(err);
      }
    });
  });
}

module.exports = findAvaliablePort;

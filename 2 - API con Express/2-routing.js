const http = require("node:http")

const processRequest = (req, rep) => {

}

const server = http.createServer(processRequest)

server.listen(1234, () => {
    console.log("Server is listening port http://localhost:1234");
})
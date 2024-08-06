const http = require("http");
const fs = require("fs");
const socketIo = require("socket.io");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading index.html");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    console.log("Received from client:", data);

    socket.emit("data", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

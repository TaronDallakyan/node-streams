const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const filePath = "example.txt";

  if (req.url === "/") {
    const readStream = fs.createReadStream(filePath);

    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    readStream.pipe(res);

    readStream.on("error", (err) => {
      console.error("Error reading the file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

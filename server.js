const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "." + (req.url === "/" ? "/index.html" : req.url);
  const ext = path.extname(filePath) || ".html";

  const map = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css"
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
    } else {
      res.writeHead(200, { "Content-Type": map[ext] || "text/plain" });
      res.end(content);
    }
  });
});

server.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});

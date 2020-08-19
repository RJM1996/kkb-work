const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  handleRequest(req, res)
});

server.listen(8080);

const handleRequest = (req, res) => {
  res.setHeader("content-type", "text/html; charset=utf-8");
  if (req.url === "/") {
    const indexHtml = fs.readFileSync("./index.html");
    res.end(indexHtml);
  }
}

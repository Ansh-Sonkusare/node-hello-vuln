const http = require('http');
const port = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  res.statusCode = 200;
  
  const msg = 'Hello Node!\n';
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

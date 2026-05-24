const http = require('http');
const data = JSON.stringify({
  name: 'test',
  email: 'test@example.com',
  phone: '9999999999',
  city: 'Lucknow',
  service: 'pvc-panel',
  message: 'test',
});

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  console.log('STATUS', res.statusCode);
  console.log('HEADERS', res.headers);
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log('BODY', body));
});

req.on('error', (err) => console.error('ERROR', err));
req.write(data);
req.end();

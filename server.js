const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const msgpack = require('@msgpack/msgpack');

const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.raw({ type: '*/*' }));
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.post('/', (req, res) => {
  const decoded = msgpack.decode(req.body);
  const encoded = msgpack.encode(decoded);
  res.header('Content-Type', 'application/msgpack');
  res.send(Buffer.from(encoded));

  console.info((new Date()).toLocaleString());
  console.info('received', req.body.byteLength);
  console.info('sent', encoded.length, '\n');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

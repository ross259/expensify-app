const express = require ('express');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.use(function (req, res, next) {
  process.env.ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';
	res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
	next();
});

app.get('*', (req, res) => {
  // res.sendFile('../public/index.html', { root: __dirname });
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {console.log('Server listening on port', port)});
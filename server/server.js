
require('dotenv').config({path: './server/.env'});
require('./config/database-config');

const express = require ('express');
const app = express();

const cookieSession = require("cookie-session");
app.use(cookieSession({
	maxAge:7 * 24 * 60 * 60 * 1000,
	keys: process.env.SESSION_KEY
}))
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const passportConfig = require('./config/passport-config');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// const passportSocial = require('./middleware/passport')(app, passport);

app.use((req, res, next) => {
	process.env.ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || 'http://localhost:9000';
	res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
	next();
});

// Two different ways to use routes
const routes = require('./routes/routes');
routes(app);

const authRoutes = require ('./routes/auth-routes')
app.use('/api/auth', authRoutes)

const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
	// res.sendFile('../public/index.html', { root: __dirname });
  res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log('Server listening on port', port)});
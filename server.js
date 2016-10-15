const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const PORT = process.env.PORT || 8000;

// 3RD PARTY MIDDLEWARE
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// GENERAL MIDDLEWARE
app.use(express.static('build'));

// WEBPACK CONFIG
const compiler = webpack(webpackConfig);
app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  hot: true,
  path: webpackConfig.output.path
}));

// ERROR CHECKING
app.use((req, res, next) => {
  res.hasError = (err, data) => res.status(err ? 400 : 200).send(err || data);
  next();
});

// ROUTES
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/managefavorites', require('./routes/favoriteRoutes'));

// ALLOW REACT ROUTING
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// SERVER LISTEN
app.listen(PORT, (err) => {
  console.log(err || `Express listening on port ${PORT}`);
});

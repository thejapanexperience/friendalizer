const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
let socketEmitter;
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const printscreen = require('printscreen');
var sendmail = require('sendmail')();

// require('dotenv').config({ silent: true });

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('SOCKET ON');
  socketEmitter = (type, data) => socket.emit(type, data);
});
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 8005;
server.listen(PORT);

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});


// 3RD PARTY MIDDLEWARE
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// GENERAL MIDDLEWARE
app.use(express.static('build'));
app.use((req, res, next) => {
 res.socketEmitter = socketEmitter;
 next();
});

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
app.post('/mail', (req, res) => {
  console.log('sending mail')
  console.log('req.body: ', req.body)
  sendmail({
    from: 'no-reply@yourdomain.com',
    to: req.body.to,
    subject: 'Your Friendalyzer Results',
    html: `
    <h1>Hi Here are your Friendalyzer results!</h1>
    <img src=${req.body.data.pics[0]} alt="" />
    <h2>You look lovely by the way!</h2>
    <br />
    <h2>Your results based on your messages and photos show the following:</h2>
    <h3>${req.body.data.totals[0][0]} = ${Math.round((req.body.data.totals[0][1])/req.body.data.counts.query*100)}%.</h3>
    <h3>${req.body.data.totals[1][0]} = ${Math.round((req.body.data.totals[1][1])/req.body.data.counts.query*100)}%.</h3>
    <h3>${req.body.data.totals[2][0]} = ${Math.round((req.body.data.totals[2][1])/req.body.data.counts.query*100)}%.</h3>
    <h3>${req.body.data.totals[3][0]} = ${Math.round((req.body.data.totals[3][1])/req.body.data.counts.query*100)}%.</h3>
    <h3>${req.body.data.totals[4][0]} = ${Math.round((req.body.data.totals[4][1])/req.body.data.counts.query*100)}%.</h3>
    <h3>${req.body.data.totals[5][0]} = ${Math.round((req.body.data.totals[5][1])/req.body.data.counts.pics*100)}%.</h3>
    <h2>If you are unhappy with these results, please tell your friend to piss the fuck off.</h2>
    <h1>Have a lovely day!</h1>
    `,
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
})
app.get('/screenshot', (req, res) => {
  console.log('CAPTURE');
  printscreen('http://localhost:8000/', {}, (err, data) => {
    console.log(data);
    require('fs').stat(data.file, (err, stats) =>
      console.log(`
        - There are divs in this page.
        - Your screenshot is available at ${data.file} and is ${stats.size} bytes.
      `));
  });
});

// ALLOW REACT ROUTING
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// SERVER LISTEN
// app.listen(PORT, (err) => {
//   console.log(err || `Express listening on port ${PORT}`);
// });

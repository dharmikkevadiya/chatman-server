const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const errorHandler = require('./middleware/errorHandler');
const { PORT } = require('./config');
const app = express();
const socket = require('socket.io');

//connect db
require('./db/conn');

//middlewares
app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

//start
app.get('/', (req, res) => {
  // res.send("Welcome to this API...");

  const one = req.ip;
  const two = req.socket.remoteAddress;
  const three = req.headers['x-forwarded-for'];
  res.json({
    one,
    two,
    three,
  });
});

//routes
app.use('/', require('./routes/auth'));

// CELEBRATE ERROR HANDLING
app.use(errorHandler);

const server = app.listen(PORT, (req, res) => {
  console.log(`App running on: http://localhost:${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: '*', // Replace with the actual client URL
  },
});
require('./socket')(io);

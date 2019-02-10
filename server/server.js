const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();

// Only include useMongoClient only if your mongoose version is < 5.0.0
mongoose.connect(config.database, {useNewUrlParser: true}, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});
//read data in json format
app.use(bodyParser.json());
//extended is false because in the future we want to
// read an image as well
//we can read all sort of data types
app.use(bodyParser.urlencoded({ extended: false }));
//morgan will log out all the requests on the terminal
app.use(morgan('dev'));

//help the frontend to communicate with the server side
//cross origin resource
app.use(cors());

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller');
const producrSearchRoute = require('./routes/product-search');
app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);// we give this a prefix name api/accounts, we group this api under accounts
app.use('/api/seller', sellerRoutes);
app.use('/api/search', producrSearchRoute);



app.listen(config.port, err => {
  console.log('Magic happens on port ' + config.port);
});

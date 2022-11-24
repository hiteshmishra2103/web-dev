const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//adding "/images" before express.static means that the following middleware will
//become active if the requests starts with "/images" 
app.use(express.static('images'));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});

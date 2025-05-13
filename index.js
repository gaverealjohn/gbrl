// import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const routes = require('./routes/routes');

// connect to db
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

// create instance of express
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

// allows us to accept data in JSON format
app.use(express.json());

// listen to changes
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});


const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { resolve } = require('path');

const { notFoundError, renderPage404 } = require('./middlewares/404');
const routes = require('./routes');

const app = express();
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(routes);

app.use(notFoundError);
app.use(renderPage404);

module.exports = app;

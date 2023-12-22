import express = require('express');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');

// Import routes
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, () => console.log('Listening on port 3000'));

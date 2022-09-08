require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersLoginRouter = require('./routes/usersLogin');
var loginRouter = require('./routes/usersLogin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usersLogin', usersLoginRouter);
app.use('/login', loginRouter);

app.use((req,res,next) => {
    const err = new Error('Not Found...!');
    err.status = 404;
    next(err);
})

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
        Error:{
            status:err.status || 500,
            Message:err.message
        }
    })
    console.log(err);
})

module.exports = app;

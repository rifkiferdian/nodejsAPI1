require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    const err = new Error('Not Found....!');
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



app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use((req,res,next) => {
//     const er = new Error('Page ngk ada !');
//     er.status = 400;
//     next(er);
// })

// app.use((error,req,res,next) => {
//     res.status(error.status || 500);
//     res.json({
//         error:{
//             message:error.message
//         }
//     })
// });

module.exports = app;

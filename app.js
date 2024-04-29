const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/alumnes', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error:'));
db.once('open', function() {
    console.log('Conectado a MongoDB');
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'UnaCadenaMuyLargaYDifícilDeAdivinar123456', 
    resave: false,
    saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const httpsCertificados = {
    key: fs.readFileSync('./public/claves/GP1_privada.key'),
    cert: fs.readFileSync('./public/claves/GP1.crt')
};

const server = https.createServer(httpsCertificados, app);

server.listen(3001, () => {
    console.log('Server running on https://localhost:3001/');
});

module.exports = app;

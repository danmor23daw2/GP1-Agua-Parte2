const express = require('express');
const http = require('http');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

async function main() {
    mongoose.set('strictQuery', false);

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/daw2');

        const Schema = mongoose.Schema;

        // Esquema alumne
        const alumneSchema = new Schema({
            nom: String,
            email: String,
            nota: {
                type: Number,
                min: 0,
                max: 10,
                required: [true, "No pot ser no avaluat"],
            }
        });

        // Model de dades
        const AlumneModel = mongoose.model('Alumne', alumneSchema);

        const alumne1 = new AlumneModel({ nom: "SERGI", email: 'sergi', nota: 10 });
        const alumne2 = new AlumneModel({ nom: "JOAN", email: 'joan', nota: 8 });

        await alumne1.save(); // Propi mongoose
        await alumne2.save();

        const alumnes = await AlumneModel.find({ nom: 'SERGI', nota: { $gte: 9 }}).exec();
        console.log(alumnes[0]);
    } catch (error) {
        console.log('Error connecting to database:', error);
    }
}

main();

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

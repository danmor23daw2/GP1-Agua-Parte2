var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

let operacions = 0;

const alumneSchema = new mongoose.Schema({
    nom: String,
    email: String
});

const Alumne = mongoose.model('Alumne', alumneSchema);

router.get('/', function(req, res, next) {
  res.render('inicioSesion', { });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'GP1 Agua Parte 2' });
});

router.get('/pag1', function(req, res, next) {
  res.render('pag1', { });
});

router.get('/pag2', function(req, res, next) {
  const campo = new Campo('Cancha de Futbol');
  const impacto = new Impacto('el medio ambiente');
  campo.gasto();
  impacto.gasto(); 
  res.render('pag2', { campo, impacto }); 
});

router.get('/pag3', function(req, res, next) {
  res.render('pag3', { title: 'Apoya a la causa'});
});

router.get('/pag4', function(req, res, next) {
  res.render('pag4', { });
});

router.get('/modificar', function(req, res, next) {
  res.render('modificar', { });
});

router.get('/eliminar', function(req, res, next) {
  res.render('eliminar', { title: 'Elimina Tu Nombre' });
});

//Mongoose ------------------------------------------------

router.get('/llistarAlumnes', function(req, res) {
    Alumne.find({})
        .then(docs => {
            console.log(docs);
            res.render('llistarAlumnes', {
                llistarAlumnes: docs,
                operacions: operacions
            });
        })
        .catch(err => {
            console.error(err);
            res.send("problemes amb la base de dades.");
        });
});

router.post('/afegirAlumneBD', function(req, res) {
    var nom = req.body.nom;
    var email = req.body.email;

    console.log("Nom:", nom);
    console.log("Email:", email);

    const nouAlumne = new Alumne({
        nom: nom,
        email: email
    });

    nouAlumne.save()
        .then(() => {
            operacions++;
            res.redirect("/llistarAlumnes");
        })
        .catch(err => {
            console.error("Error al guardar:", err);
            res.send("problemes amb la base de dades.");
        });
});

router.post('/modificarAlumneBD', function(req, res) {
    var nom = req.body.nom;
    var email = req.body.email;

    Alumne.findOneAndUpdate({ email: email }, { nom: nom })
        .then(() => {
            operacions++;
            res.redirect("/llistarAlumnes");
        })
        .catch(err => {
            console.error(err);
            res.send("problemes amb la base de dades.");
        });
});

router.post('/esborrarAlumneBD', function(req, res) {
    var email = req.body.email;

    Alumne.findOneAndDelete({ email: email })
        .then(() => {
            operacions++;
            res.redirect("/llistarAlumnes");
        })
        .catch(err => {
            console.error(err);
            res.send("problemes amb la base de dades.");
        });
});

//Mongoose -------------------------------------------------------

module.exports = router;

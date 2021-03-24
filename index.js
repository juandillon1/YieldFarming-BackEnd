// Declaro variables principales
var express = require('express');
var app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
bodyParser =  require('body-parser'),
methodOverride = require('method-override'),
mongoose = require('mongoose');

// Defino estructura que usara express
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Conecto la BD
mongoose.connection.openUri('mongodb+srv://admin:123321@cluster0.caxmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Base de Datos: Online')
})
.catch((err) => {
    console.log('Ocurrió un error al conectar a BD: ', err);
})
;


// Traigo las rutas a usar
var turnonRoute = require('./routes/turnon');
var proyectosRoute = require('./routes/proyectos');

// Le digo a express que use las rutas que traigo
app.use('/', turnonRoute);
app.use('/proyectos', proyectosRoute);

app.listen(port, function(){
    console.log('Node está corriendo en el puerto: ', port);
})





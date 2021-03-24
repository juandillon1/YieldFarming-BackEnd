const express = require('express');
const app = express();

const Proyecto = require('../models/ProyectoModel');

// Recuperar todos los proyectos
app.get('/', function(req, res){
    Proyecto.find({})
            .limit(6)
            .exec(
                (err, Proyectos) => {
                    if(err){
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Ocurrió un error al recuperar los proyectos',
                            errors: err
                        });
                    }
                    Proyecto.countDocuments({}, (err, conteo) => {
                        return res.status(200).json({
                            ok: true,
                            proyectos: Proyectos,
                            total: conteo
                        })
                    });
                }
            )
});

// Recuperar según el lenguaje
app.get('/tipo', (req, res) => {
    const tipos = req.query.tipos;
    Proyecto.find({tipo: tipos})
    .exec(
        (err, proyectos) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Ocurrió un error al recuperar los proyectos',
                    errors: err
                })
            }
            Proyecto.countDocuments({tipo: tipos}, (err, count) => {
                return res.status(200).json({
                    ok: true,
                    proyectos: proyectos,
                    total: count
                });
            });
        }
    );
});

// Recuperar último proyecto subido
app.get('/ultimo', (req, res) => {
    // El $natural es reservado de Mongo y permite invertir el orden de búsqueda
    Proyecto.findOne().sort({$natural: -1})
    .exec(
        (err, proyecto) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Ocurrió un error al recuperar el último proyecto',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                proyecto: proyecto
            });
        }
    );
});

// Crear Proyectos
app.post('/', (req, res) => {
    let body = req.body;
    let proyecto = new Proyecto({
        nombre: body.nombre,
        token: body.token,
        img: body.img,
        url: body.url,
        descripcion: body.descripcion,
        tipo: body.tipo,
        porcentaje: body.porcentaje,
        contrato: body.contrato,
    });
    proyecto.save((err, proyectoGuardado)=> {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear el proyecto',
                errors: err,
            });
        }
        res.status(201).json({
            ok: true,
            proyecto: proyectoGuardado,
        });
    });
});

// Borrar Proyecto
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    Proyecto.findByIdAndRemove(id, (err, proyectoBorrado) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar proyecto',
                errors: err
            });
        }
        if (!proyectoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un proyecto con esa Id: ' + id,
                errors: { message: 'No existe un proyecto con esa Id: ' + id }
            });
        }
        res.status(200).json({
            ok: true,
            proyecto: proyectoBorrado
        });
    })
});

module.exports = app;
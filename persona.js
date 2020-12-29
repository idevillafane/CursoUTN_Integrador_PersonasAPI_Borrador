var app = require('express').Router();
var persona = require('../persona');


/**
 API de Persona
 *  POST '/persona'
 *  GET '/persona'
 *  GET '/persona/:id'
 *  PUT '/persona/:id'
 *  DELETE '/persona/:id'
 */




/* Agregar una persona:
POST '/persona' recibe: {nombre: string, apellido: string, alias: string, email: string} retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"
*/

app.post('/persona', async (req, res)) => {
    try {
        if (!req.body.nombre || !req.body.apellido || !req.body.email || !req.body.alias) {
            throw new Error("Faltan datos");
        }

        // Con estas lineas se deberia poder chequear si ya esta registrado el email:

        var chequearEmail = 'SELECT * FROM persona WHERE email = ?';
        let respuesta = query(query, [req.body.email]);

        if (respuesta.length > 0) {
            throw new Error("El email ya se encuentra registrado");
        };
    
        query = 'INSERT INTO producto (nombre, apellido, email, alias) VALUES (?, ?, ?, ?)';
        
        respuesta = await qy(query, [req.body.nombre.toUpperCase(), req.body.apellido.toUpperCase(), req.body.email.toUpperCase(), req.body.alias.toUpperCase());

        res.send({'respuesta': respuesta.insertId}); //No se si esta línea se escribe así. Lo copie del TP. No sé tampoco si hace falta poner un identificador, creo que no.
        
    }

    catch(e) {
        console.error(e.message);
        res.status(413).send({"Error inesperado": e.message}); //Revisar dónde se coloca el mensaje "personalizado"
    }
});

/*
Pedir lista de personas:
GET '/persona' retorna status 200 y [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] o bien status 413 y []
*/

app.get ('/persona', async (req, res)) => {
    try {
        var query = 'SELECT * FROM producto';

        var respuesta = query(query);
        res.send({'respuesta': respuesta});
    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"Error inesperado": e.message};)
    }

/* GET '/persona/:id' retorna status 200 y {id: numerico, nombre: string, apellido: string, alias: string, email; string} - status 413 , {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona" */

app.get ('/persona/:id', async (req, res)) => {
    try {
        const query = 'SELECT * FROM persona WHERE id = ?';

        // const respuesta = await qy()...
        const respuesta = await qy(query, [req.params.id]);

        console.log(respuesta);

        res.send({"respuesta": respuesta});
    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"Error": e.message});
    }

};


/* Lo que sigue es lo que hizo la profesora */


var nombre = req.body.nombre;
var instancia = new ArtistaModel({ nombre: nombre });
instancia.save((err, artista) => {
    if (err) {
        next(new Error('No se pudo guardar el artista'));
    }
    res.status(201).send(artista); // Codigo HTTP 201 es creado
});
});


// Listado de personas
app.get('/', function (req, res, next) {
    // Es el mismo codigo del listado de artistas normal (pero sin interfaz)
    ArtistaModel.find({}, (err, listado) => {
        if (err) {
            next(new Error('No se pudieron obtener los artistas'));
            return;
        }
        res.send(listado);
    });
});

// Obtener un artista
app.get('/:id', function (req, res, next) {
    var idArtista = req.params.id;
    ArtistaModel.findById(idArtista, (err, artista) => {
        if (err) {
            next(new Error('No se encontro el artista'));
        }
        res.send(artista);
    });
});

// Actualizar un artista
app.put('/:id', function (req, res, next) {
    var idArtista = req.params.id;
    var nombreNuevo = req.body.nombre;
    ArtistaModel.findByIdAndUpdate(idArtista, { nombre: nombreNuevo }, (err, artista) => {
        if (err) {
            next(new Error('No se pudo actualizar el artista'));
        }
        res.send(artista);
    })
});

// Borrar un artista
app.delete('/:id', function (req, res, next) {
    var idArtistaABorrar = req.params.id;
    ArtistaModel.findByIdAndRemove(idArtistaABorrar, (err, artista) => {
        if (err) {
            next(new Error('No se pudo borrar el artista'));
        }
        res.status(204).send(); // Codigo HTTP 204 Sin contenido (no hay nada que responder, pero la operacion fue exitosa)
    });
});

module.exports = app;

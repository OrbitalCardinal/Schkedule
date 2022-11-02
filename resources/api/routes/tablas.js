const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/tablas', (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM tablas`;
    } else {
        query = `SELECT * FROM tablas WHERE id_usuario = ${params['id_usuario']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        })
    })
});

router.post('/tablas', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO tablas(id_usuario, nombre) VALUES (?, ?)`
    db.serialize(() => {
        const stmt = db.prepare(query);
        stmt.run(data['id_usuario'], data['nombre']);
        stmt.finalize(err => console.log(err));
    });
    res.status(200).json(req.body);
});

router.patch('/tablas', (req, res) => {
    let data = req.body;
    let query = `
    UPDATE tablas
    SET
        nombre = "${data['nombre']}"
    WHERE id = ${data['id']}
    `;
    db.serialize(() => {
        db.exec(query, err => console.log(err));
    });

    res.status(200).json({
        "id_updated": data['id'],
        ...data
    });
});

router.delete('/tablas', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM tablas WHERE id = ${id}`;
    let query2 = `DELETE FROM tareas_tabla WHERE id_tabla = ${id}`
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
        db.exec(query2, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});


module.exports = router;
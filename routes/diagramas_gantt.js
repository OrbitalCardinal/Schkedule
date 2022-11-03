const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/diagramas_gantt', (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM diagramas_gantt`;
    } else {
        query = `SELECT * FROM diagramas_gantt WHERE id_usuario = ${params['id_usuario']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        })
    })
});

router.post('/diagramas_gantt', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO diagramas_gantt(id_usuario, nombre, fecha_inicial, semanas) VALUES (?, ?, ?, ?)`
    db.serialize(() => {
        const stmt = db.prepare(query);
        stmt.run(data['id_usuario'], data['nombre'], data['fecha_inicial'], data['semanas']);
        stmt.finalize(err => console.log(err));
    });
    res.status(200).json(req.body);
});

router.delete('/diagramas_gantt', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM diagramas_gantt WHERE id = ${id}`;
    let query2 = `DELETE FROM tareas_gantt WHERE id_gantt = ${id}`
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
        db.exec(query2, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});


module.exports = router;
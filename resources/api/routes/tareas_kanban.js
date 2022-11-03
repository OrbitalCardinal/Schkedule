const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/tareas_kanban', (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM tareas_kanban`;
    } else {
        query = `SELECT * FROM tareas_kanban WHERE id_tablero = ${params['id_tablero']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        })
    });
});


router.post('/tareas_kanban', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO tareas_kanban(id_tablero, nombre, categoria, descripcion, prioridad, estado) VALUES (?, ?, ?, ?, ?, ?)`;
    db.serialize(() => {
        let stmt = db.prepare(query);
        stmt.run(data['id_tablero'], data['nombre'], data['categoria'], data['descripcion'], data['prioridad'], data['estado']);
        stmt.finalize(err => console.log(err));
    });
    res.status(200).json(req.body);
});

router.patch('/tareas_kanban', (req, res) => {
    let data = req.body;
    let query = `
    UPDATE tareas_kanban
    SET
        nombre = "${data['nombre']}",
        categoria = "${data['categoria']}",
        descripcion = "${data['descripcion']}",
        prioridad = "${data['prioridad']}",
        estado = "${data['estado']}"
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

router.delete('/tareas_kanban', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM tareas_kanban WHERE id = ${id}`;
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});

module.exports = router;
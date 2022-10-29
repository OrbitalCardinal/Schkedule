const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/tableros_kanban', (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM tableros_kanban`;
    } else {
        query = `SELECT * FROM tableros_kanban WHERE id = ${params['id']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        })
    })
});

router.post('/tableros_kanban', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO tableros_kanban(id_usuario, nombre) VALUES (?, ?)`
    db.serialize(() => {
        const stmt = db.prepare(query);
        stmt.run(data['id_usuario'], data['nombre']);
        stmt.finalize(err => console.log(err));
    });
    res.status(200).json(req.body);
});

router.patch('/tableros_kanban', (req, res) => {
    let data = req.body;
    let query = `
    UPDATE tableros_kanban
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

router.delete('/tableros_kanban', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM tableros_kanban WHERE id = ${id}`;
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});


module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/horarios', (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM horarios`;
    } else {
        query = `SELECT * FROM tablas WHERE id_usuario = ${params['id_usuario']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        })
    })
});

router.post('/horarios', (req, res) => {
    let data = req.body;
    let query = `INSERT INTO horarios(id_usuario, nombre) VALUES (?, ?)`
    db.serialize(() => {
        const stmt = db.prepare(query);
        stmt.run(data['id_usuario'], data['nombre']);
        stmt.finalize(err => console.log(err));
    });
    res.status(200).json(req.body);
});


router.delete('/horarios', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM horarios WHERE id = ${id}`;
    let query2 = `DELETE FROM actividades_horario WHERE id_horario = ${id}`
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
        db.exec(query2, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});


module.exports = router;
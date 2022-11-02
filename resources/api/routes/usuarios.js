const express = require("express");
const router = express.Router();
const db = require('../utils/db');

router.get('/usuarios', (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM usuarios`;
    } else {
        query = `SELECT * FROM usuarios WHERE id = ${params['id']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        });
    })
});

router.post('/usuarios', (req, res) => {
    let query = `INSERT INTO usuarios(nombres, apellidos, correo, contrasena) VALUES (?, ?, ?, ?)`
    let data = req.body;
    db.serialize(() => {
        const stmt = db.prepare(query);
        stmt.run(data['nombres'], data['apellidos'], data['correo'], data['contrasena']);
        stmt.finalize((err) => console.log(err));
    });

    res.status(200).json(req.body);
});

router.delete('/usuarios', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM usuarios WHERE id = ${id}`;
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});

router.patch('/usuarios', (req, res) => {
    let id = req.query['id'];
    let data = req.body;
    let query = `
    UPDATE usuarios 
    SET 
        nombres = "${data['nombres']}",
        apellidos = "${data['apellidos']}",
        correo = "${data['correo']}",
        contrasena = "${data['contrasena']}"
    WHERE id = ${id}
    `;
    db.serialize(() => {
        db.exec(query, err => console.log(err));
    });
    res.status(200).json({
        "id_updated": id,
        ...data
    });
});

module.exports = router;
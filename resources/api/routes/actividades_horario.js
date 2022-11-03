const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/actividades_horario", (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM actividades_horario`;
    } else {
        query = `SELECT * FROM actividades_horario WHERE id_horario = ${params['id_horario']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        });
    })
});

router.post("/actividades_horario", (req, res) => {
  let query = `INSERT INTO actividades_horario(id_horario, nombre, hora, dia) VALUES (?, ?, ?, ?)`;
  let data = req.body;
  db.serialize(() => {
    const stmt = db.prepare(query);
    stmt.run(
      data["id_horario"],
      data["nombre"],
      data["hora"],
      data["dia"],
    );
    stmt.finalize((err) => console.log(err));
  });
  res.status(200).json(req.body);
});

router.delete('/actividades_horario', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM actividades_horario WHERE id = ${id}`;
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});

router.patch('/actividades_horario', (req, res) => {
    let id = req.query['id'];
    let data = req.body;
    let query = `
    UPDATE actividades_horario
    SET 
        nombre = "${data['nombre']}"
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

const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/tareas_gantt", (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM tareas_gantt`;
    } else {
        query = `SELECT * FROM tareas_gantt WHERE id_gantt = ${params['id_gantt']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        });
    })
});

router.post("/tareas_gantt", (req, res) => {
  let query = `INSERT INTO tareas_gantt(id_gantt, nombre, fecha_inicial, fecha_final) VALUES (?, ?, ?, ?)`;
  let data = req.body;
  db.serialize(() => {
    const stmt = db.prepare(query);
    stmt.run(
      data["id_gantt"],
      data["nombre"],
      data['fecha_inicial'],
      data['fecha_final']
    );
    stmt.finalize((err) => console.log(err));
  });
  res.status(200).json(req.body);
});

router.delete('/tareas_gantt', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM tareas_gantt WHERE id = ${id}`;
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});

router.patch('/tareas_gantt', (req, res) => {
    let id = req.query['id'];
    let data = req.body;
    let query = `
    UPDATE tareas_gantt
    SET 
        nombre = "${data['nombre']}",
        fecha_inicial = "${data['fecha_inicial']}",
        fecha_final = "${data['fecha_final']}"
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

const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/tareas_tabla", (req, res) => {
    let params = req.query;
    let query = '';
    if(Object.keys(params).length == 0) {
        query = `SELECT * FROM tareas_tabla`;
    } else {
        query = `SELECT * FROM tareas_tabla WHERE id_tabla = ${params['id_tabla']}`
    }
    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        });
    })
});

router.post("/tareas_tabla", (req, res) => {
  let query = `INSERT INTO tareas_tabla(id_tabla, nombre, estado, categoria, fecha_inicial, fecha_final) VALUES (?, ?, ?, ?, ?, ?)`;
  let data = req.body;
  db.serialize(() => {
    const stmt = db.prepare(query);
    stmt.run(
      data["id_tabla"],
      data["nombre"],
      data["estado"],
      data["categoria"],
      data['fecha_inicial'],
      data['fecha_final']
    );
    stmt.finalize((err) => console.log(err));
  });
  res.status(200).json(req.body);
});

router.delete('/tareas_tabla', (req, res) => {
    let id = req.query['id'];
    let query = `DELETE FROM tareas_tabla WHERE id = ${id}`;
    db.serialize(() => {
        db.exec(query, (err) => console.log(err));
    });
    res.status(200).json({
        "id_deleted": id
    });
});

router.patch('/tareas_tabla', (req, res) => {
    let id = req.query['id'];
    let data = req.body;
    let query = `
    UPDATE tareas_tabla
    SET 
        nombre = "${data['nombre']}",
        estado = "${data['estado']}",
        categoria = "${data['categoria']}",
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

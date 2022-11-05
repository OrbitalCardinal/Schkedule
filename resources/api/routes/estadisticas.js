const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/project_count', (req, res) => {
    let id = req.query['id_usuario'];
    let query = `WITH count_tablas as (
        SELECT id_usuario, COUNT(*) as n_tablas FROM tablas
        GROUP BY id_usuario
    ),
    count_tableros as (
        SELECT id_usuario, COUNT(*) as n_tableros FROM tableros_kanban
        GROUP BY id_usuario
    ),
    count_diagramas as (
        SELECT id_usuario, COUNT(*) as n_diagramas FROM diagramas_gantt
        GROUP BY id_usuario
    ),
    count_horarios as (
        SELECT id_usuario, COUNT(*) as n_horarios FROM horarios
        GROUP BY id_usuario
    ),
    counts as  (
        SELECT 
            a.id_usuario,
            IFNULL(n_tablas, 0) as n_tablas,
            IFNULL(n_tableros, 0) as n_tableros,
            IFNULL(n_diagramas, 0) as n_diagramas,
            IFNULL(n_horarios, 0) as n_horarios
        FROM count_tablas AS a
        LEFT JOIN count_tableros AS b ON a.id_usuario = b.id_usuario
        LEFT JOIN count_diagramas AS c ON a.id_usuario = c.id_usuario
        LEFT JOIN count_horarios AS d ON a.id_usuario = d.id_usuario
    ) 
    SELECT *, n_tablas + n_tableros + n_diagramas + n_horarios as total FROM counts
    WHERE id_usuario = ${id}`;

    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        });
    });
});

router.get('/table_count', (req, res) => {
    let id = req.query['id_usuario'];
    let query = `SELECT a.id_usuario as id_usuario, b.estado as estado, COUNT(*) as count FROM tablas AS a
    LEFT JOIN tareas_tabla AS b on a.id = b.id_tabla
    WHERE id_usuario = ${id} AND estado IS NOT NULL
    GROUP BY id_usuario, estado`

    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        })
    })
});

router.get('/kanban_count', (req, res) => {
    let id = req.query['id_usuario'];
    let query = `SELECT a.id_usuario as id_usuario, b.estado as estado, COUNT(*) as count FROM tableros_kanban AS a
    LEFT JOIN tareas_kanban AS b on a.id = b.id_tablero
    WHERE id_usuario = ${id} AND estado IS NOT NULL
    GROUP BY id_usuario, estado`

    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        });
    });
});

router.get('/gantt_count', (req, res) => {
    let id = req.query['id_usuario'];
    let query = `SELECT a.id_usuario as id_usuario, COUNT(*) as count FROM diagramas_gantt AS a
    LEFT JOIN tareas_gantt AS b on a.id = b.id_gantt
    WHERE id_usuario = ${id}
    GROUP BY id_usuario`;

    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        });
    });
});

router.get('/horario_count', (req, res) => {
    let id = req.query['id_usuario'];
    let query = `SELECT a.id_usuario as id_usuario, COUNT(*) as count FROM horarios AS a
    LEFT JOIN actividades_horario AS b on a.id = b.id_horario
    WHERE id_usuario = ${id}
    GROUP BY id_usuario`;

    db.serialize(() => {
        db.all(query, (err, rows) => {
            res.status(200).json(rows);
        });
    });
});

module.exports = router;
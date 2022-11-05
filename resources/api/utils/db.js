const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Check if db exists
const file = path.join(__dirname, '/db');
let bdExists = null;
if (fs.existsSync(file)) {
  console.log("Base de datos EXISTE");
  bdExists = true;
} else {
  console.log("Base de datos NO EXISTE creando directorio");
  fs.mkdirSync(file);
  bdExists = false;
}

// Connect to database
let db = new sqlite3.Database(path.join(file, '/ungistor.db'), (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Conectado a la base de datos Ungistor");
});

if (!bdExists) {
  console.log("=> Creando tablas");
  let query = fs.readFileSync(path.join(__dirname, "../queries/createTables.sql")).toString();
  let queryView = fs.readFileSync(path.join(__dirname, "../queries/countView.sql")).toString();
  console.log(query);
  console.log(queryView);

  db.serialize(() => {
    db.exec(query, (err) => {
      if (err != null) console.log(err.message);
    });

    db.exec(queryView, err => console.log(err))
    // db.exec(`
    // INSERT INTO usuarios(nombres, apellidos, correo, contrasena)
    // VALUES ("Edson Raul", "Cepeda Marquez", "edson@edson.com", "123456")
    // `, (err) => console.log(err));

    // db.all(`
    //     SELECT * FROM usuarios
    // `, (err, rows) => console.log(rows));
  });
}

module.exports = db;

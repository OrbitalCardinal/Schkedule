const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Check if db exists
const file = './api/db/ungistor.db';
let bdExists = null;
if(fs.existsSync(file)) {
    console.log('Base de datos EXISTE');
    bdExists = true;
} else {
    console.log('Base de datos NO EXISTE creando directorio');
    fs.mkdirSync('./api/db');
    bdExists = false;
}

// Connect to database
let db = new sqlite3.Database('./api/db/ungistor.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado a la base de datos Ungistor');
});

if(!bdExists) {
    console.log('=> Creando tablas');
    let query = fs.readFileSync('./api/queries/createTables.sql').toString();
    console.log(query);

    db.serialize(() => {
        db.exec(query, (err) => {
            if(err != null) console.log(err.message);
        });
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
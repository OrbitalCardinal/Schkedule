CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY,
    nombres TEXT,
    apellidos TEXT,
    correo TEXT,
    contrasena TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tablas (
    id INTEGER PRIMARY KEY,
    id_usuario INTEGER,
    nombre TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id)
);

CREATE TABLE tareas_tabla (
    id INTEGER PRIMARY KEY,
    id_tabla INTEGER,
    nombre TEXT,
    estado TEXT,
    categoria TEXT,
    fecha_inicial DATETIME,
    fecha_final DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tabla)
    REFERENCES tablas(id)
);

CREATE TABLE tableros_kanban (
    id INTEGER PRIMARY KEY,
    id_usuario INTEGER,
    nombre TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id)
);

CREATE TABLE tareas_kanban (
    id INTEGER PRIMARY KEY,
    id_tablero INTEGER,
    nombre TEXT, 
    categoria TEXT,
    descripcion TEXT,
    prioridad TEXT,
    estado TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tablero)
    REFERENCES tableros_kanban(id)
);

CREATE TABLE diagramas_gantt (
    id INTEGER PRIMARY KEY,
    id_usuario INTEGER,
    nombre TEXT,
    fecha_inicial DATETIME,
    semanas INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id)
);

CREATE TABLE tareas_gantt (
    id INTEGER PRIMARY KEY,
    id_gantt INTEGER,
    nombre TEXT,
    fecha_inicial DATETIME,
    fecha_final DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_gantt)
    REFERENCES diagramas_gantt(id)
);

CREATE TABLE horarios (
    id INTEGER PRIMARY KEY,
    id_usuario INTEGER,
    nombre TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id)
);

CREATE TABLE actividades_horario (
    id INTEGER PRIMARY KEY,
    id_horario INTEGER,
    nombre TEXT,
    hora INTEGER,
    dia INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_horario)
    REFERENCES horarios (id)
);
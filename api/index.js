const express = require("express");

// Database
const db = require('./utils/db');
const path = require('path');

// Routes imports
const usuariosRoute = require(path.join(__dirname, './routes/usuarios'));

// Init app
const app = express();
// Decode json
app.use(express.json());
// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Routes declaration
app.use(usuariosRoute);

const server = app.listen(3000);

module.exports = {app, server};
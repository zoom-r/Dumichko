const connection = require('../database/connection.js');
const express = require('express');
const path = require('path');
const app = express.Router();

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../front-end/pages/login.html'));
});

app.get('/check-email', (req, res) => {
    req.body.email = req.body.email || '';

});

module.exports = app;
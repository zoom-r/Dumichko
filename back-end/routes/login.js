const express = require('express');
const path = require('path');
const app = express.Router();

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../front-end/pages/login.html'));
});

module.exports = app;
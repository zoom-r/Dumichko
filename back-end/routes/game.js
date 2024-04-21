const express = require('express');
const path = require('path');
const app = express.Router();


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../front-end/pages/game.html'));
});

app.get('/check', (req, res) => {
    
});

app.get('/save', (req, res) => {
    const saveRow = require('../controllers/game');
    const rowId = req.body.rowId;
    const row = req.body.row;
    const id = req.body.id;
    saveRow(rowId, row, id);
});

module.exports = app;
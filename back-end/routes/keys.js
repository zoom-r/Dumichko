require('dotenv').config();
const express = require('express');
const app = express.Router();
const crypto = require('crypto');

app.get('/words', (req, res) => {
    res.send(process.env.WORDS);
});

app.get('/login', (req, res) => {
    res.send(process.env.LOGIN);
});

app.get('/signup', (req, res) => {
    res.send(process.env.SIGNUP);
});

module.exports = app;
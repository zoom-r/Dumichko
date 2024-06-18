const connection = require('../database/conection.js');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const validator = require('validator');
const {checkUser, checkEmail, encryptPassword} = require('../database/login.js');

const app = express.Router();

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../front-end/pages/login.html'));
});

app.post('/check-email', (req, res) => {
    if(validator.isEmail(req.body.email)){
        checkEmail(req.body.email).then(result => {
            if(req.body.type == 'loginEmail')
                res.send(result);
            else
                res.send(!result); 
        });
    }else{
        res.send(false);
    }
    
    
});

module.exports = app;
const express = require('express');
const path = require('path');
const validator = require('validator');
const {checkUser, checkEmail, encryptPassword, saveUser} = require('../database/login.js');
const { error } = require('console');

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

async function syncSaveUser(email, pass){
    await encryptPassword(pass).then(encryptedPassword => {
        console.log(encryptedPassword);
        saveUser(email, encryptedPassword).then(result => {
            return result;
        }).catch(error => {
            console.log(error);
            return false
        });
    });
}

app.post('/signup', (req, res) => {
    console.log(req.body.email, req.body.password);
    res.send(syncSaveUser(req.body.email, req.body.password));
});

module.exports = app;
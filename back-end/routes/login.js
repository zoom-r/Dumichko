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
    try{
        const encryptedPassword = await encryptPassword(pass);
        const result = await saveUser(email, encryptedPassword);
        return result;
    }catch(error){
        console.log(error);
        return false;
    }
}

app.post('/signup', (req, res) => {
    syncSaveUser(req.body.email, req.body.password).then(result => {
        res.send(result);
    });
});

app.post('/login', (req, res) => {
    checkUser(req.body.email, req.body.password).then(result => {
        console.log(result);
        res.send(result);
    });
});

module.exports = app;
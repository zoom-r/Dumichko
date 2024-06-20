require('dotenv').config();
const fetchWords = require('../modules/words.js');
const express = require('express');
const path = require('path');
const app = express.Router();
const fs = require('fs');
const Papa = require('papaparse');
const crypto = require('crypto');
const {saveRow, readRows} = require('../database/saveRow.js');




app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../front-end/pages/game.html'));
});

app.get('/check', (req, res) => {
    
});

async function loadWords(){
    const words = await fetchWords();
    return words;
}

loadWords().then(availableWords => {
    // Store the used words and their timestamps
    let dailyWordInfo = { word: null, date: null };
    let usedWords = [];

    function pickRandomWordAndStore() {
        if (availableWords.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const randomWord = availableWords[randomIndex];

        usedWords.push({ word: randomWord, timestamp: Date.now() });

        // Store the picked word and the current date
        dailyWordInfo.word = randomWord;
        dailyWordInfo.date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

        return randomWord;
    }

    function getDailyWord() {
        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

        // Check if the stored word is from today
        if (dailyWordInfo.date === today) {
            return dailyWordInfo.word; // Return the stored word if it's from today
        } else {
            return pickRandomWordAndStore(); // Pick and store a new word if it's a new day
        }
    }

    // Replace the direct call to pickRandomWord with getDailyWord
    var dailyWord = getDailyWord(); // Immediately pick or retrieve the word when the server starts
    console.log('Word of the day:', dailyWord); // Log the word

    // Schedule the function to run every day to ensure the variable updates
    setInterval(() => {
        dailyWord = getDailyWord();
        console.log('Word of the day:', dailyWord);
    }, 24 * 60 * 60 * 1000); // Run every 24 hours
    // Use getDailyWord() to handle requests that need the daily word
    app.get('/word', (req, res) => {
        const word = getDailyWord();
        const encryptedData = encryptData({ word: word, words: availableWords }, process.env.WORDS);
        res.send(encryptedData);
    });
});

function encryptData(data, secretKey) {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        content: encrypted
    };
}

app.post('/save', (req, res) => {
    console.log('Received row from the client : ', req.body);
    saveRow(req.body.rowId, req.body.row, req.body.id).then(result => {
        res.send(result);
    });
});

app.get('/load/:id', (req, res) => {
    const id = req.params.id;
    const rows = [];
    readRows(id).then(result => {
        if(result){

            const data = result;
            console.log(data);
            for(let i = 0; i < 6; i++){
                let rowId;
                switch(i){
                    case 0:
                        rowId = "row-1";
                        break;
                    case 1:
                        rowId = "row-2";
                        break;
                    case 2:
                        rowId = "row-3";
                        break;
                    case 3:
                        rowId = "row-4";
                        break;
                    case 4:
                        rowId = "row-5";
                        break;
                    case 5:
                        rowId = "row-6";
                        break;
                    default:
                        rowId = "row-1";
                        break;
                }
                let rowId2;
                switch(i){
                    case 0:
                        rowId2 = "first";
                        break;
                    case 1:
                        rowId2 = "second";
                        break;
                    case 2:
                        rowId2 = "third";
                        break;
                    case 3:
                        rowId2 = "fourth";
                        break;
                    case 4:
                        rowId2 = "fifth";
                        break;
                    case 5:
                        rowId2 = "sixth";
                        break;
                    default:
                        rowId2 = "first";
                        break;
                }
                rows.push({ rowId, row: data[0][rowId2] });
            }
            res.send({ rows: rows });
        }else{
            res.send({ rows: [] });
        }
    });
});

module.exports = app;
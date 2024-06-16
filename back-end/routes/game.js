require('dotenv').config();
const fetchWords = require('../modules/words.js');
const express = require('express');
const path = require('path');
const app = express.Router();
const fs = require('fs');
const Papa = require('papaparse');
const crypto = require('crypto');




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
    const secretKey = process.env.SECRET_KEY;
    app.get('/word', (req, res) => {
        const word = getDailyWord();
        const encryptedData = encryptData({ word: word, words: availableWords }, secretKey);
        res.send(encryptedData);
    });

});

app.get('/word/key', (req, res) => {
    res.send(process.env.SECRET_KEY);
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

app.get('/save', (req, res) => {
    const saveRow = require('../controllers/game');
    const rowId = req.body.rowId;
    const row = req.body.row;
    const id = req.body.id;
    saveRow(rowId, row, id);
});

module.exports = app;
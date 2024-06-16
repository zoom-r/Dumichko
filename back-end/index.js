const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static(path.resolve(__dirname, '../front-end')));

// Load routes
const gameRouter = require('./routes/game');
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');

// Use routes
app.use('/game', gameRouter);
app.use('/', homeRouter);
app.use('/login', loginRouter);


app.all('*', (req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, '../front-end/pages/404.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
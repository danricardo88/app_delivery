const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/loginRouter');
const registerRouter = require('../routes/registerRouter');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

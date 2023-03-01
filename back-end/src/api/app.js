const express = require('express');
import loginRouter from '../routes/loginRouter';

const app = express();
app.use(express.json());
app.use('/login', loginRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

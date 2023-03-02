const jwt = require('jsonwebtoken');
const SECRET = 'secret_key';

const confidential = SECRET;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (pass) => {
  const token = jwt.sign({ data: { userId: pass } },
    confidential, jwtConfig);

    return token;
};

module.exports = { createToken };
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

const verifyTokenJWT = (token) => {
  const payload = jwt.verify(token, confidential);
  return payload;
};

module.exports = { createToken, verifyTokenJWT };
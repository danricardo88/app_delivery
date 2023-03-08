const jwt = require('jsonwebtoken');

const SECRET = 'secret_key';

const confidential = SECRET;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (email) => {
  const token = jwt.sign({ email },
    confidential, jwtConfig);

    return token;
};

const verifyTokenJWT = (token) => {
  try {
    if (!token) return { error: 'token not found' };
    const payload = jwt.verify(token, confidential);
    if (!jwtConfig.expiresIn) return { error: 'Expired or invalid token' };
    return payload;
  } catch (err) {
    return { error: err.message };
  }
};


module.exports = { createToken, verifyTokenJWT };
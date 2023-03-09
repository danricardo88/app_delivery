const fs = require('fs');
const jwt = require('jsonwebtoken');

const jwtKey = fs.readFileSync('jwt.evaluation.key');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (email) => {
  const token = jwt.sign({ email },
    jwtKey, jwtConfig);

    return token;
};

const verifyTokenJWT = (token) => {
  try {
    if (!token) return { error: 'token not found' };
    const payload = jwt.verify(token, jwtKey);
    if (!jwtConfig.expiresIn) return { error: 'Expired or invalid token' };
    return payload;
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = { createToken, verifyTokenJWT };
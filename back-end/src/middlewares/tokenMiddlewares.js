const { verifyTokenJWT } = require('../utils/tokenValidation');

const validateTokenMiddle = async (req, res, next) => {
  const { authorization } = req.headers;
  
  try {
    await verifyTokenJWT(authorization);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

module.exports = {
    validateTokenMiddle,
};
const { verifyTokenJWT } = require('../utils/tokenValidation');

const validateTokenMiddle = async (req, res, next) => {
  const { authorization: token } = req.headers;
  
  if (!token) return res.status(404).json({ message: 'Token not found' });

  try {
    const user = await verifyTokenJWT(token);
    req.body.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

module.exports = {
    validateTokenMiddle,
};
const md5 = require('md5');
const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { userEmail, password } = req.body;
  const hash = md5(password);
  const result = await loginService.login(userEmail);
  if (!result || hash !== result.password) {
    return res.status(404).json({ message: 'Invalid fields' });
  }
  return res.status(200).json(result);
};

// const showUser = async (req, res) => {
//   const { userEmail } = req.body;
//   const result = await loginService.login(userEmail);
//   return res.status(200).json(result);
// }

module.exports = {
  login,
};
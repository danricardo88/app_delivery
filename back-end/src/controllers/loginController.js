const md5 = require('md5');
const loginService = require('../services/loginService');
const tokenValidation = require('../utils/tokenValidation');

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const hash = md5(password);

  const result = await loginService.login(email);
  const { name, role, id } = result;
  if (!result || hash !== result.password) {
    return res.status(404).json({ message: 'Invalid fields' });
  }

  const token = await tokenValidation.createToken(email);
  return res.status(200).json({ token, name, role, id });
};

const findAllUsers = async (_req, res) => {
  const users = await loginService.findAllUsers();
  return res.status(200).json(users);
};

module.exports = {
  login,
  findAllUsers,
};
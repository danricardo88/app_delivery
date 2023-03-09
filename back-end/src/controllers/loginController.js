const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.login(email, password);
  if (result.error) return res.status(404).json({ message: result.message });
  return res.status(200).json({ ...result.message });
};

const findAllUsers = async (_req, res) => {
  const users = await loginService.findAllUsers();
  return res.status(200).json(users);
};

module.exports = {
  login,
  findAllUsers,
};
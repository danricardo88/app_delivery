const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.login(email, password);

  if (!result) {
    return res.status(404).json('User not found');
  }
  return res.status(200).json(result);
};

module.exports = {
  login,
};
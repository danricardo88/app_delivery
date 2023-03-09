const md5 = require('md5');
const { User } = require('../database/models');
const tokenValidation = require('../utils/tokenValidation');

const login = async (email, password) => {
  const userLogin = await User.findOne({ where: { email } }); 
  const hash = md5(password);
  if (!userLogin || hash !== userLogin.password) {
    return { error: true, message: 'Invalid fields' };
  }
  const { name, role, id } = userLogin;
  const token = await tokenValidation.createToken(email);
  return { error: false, message: { token, name, role, email, id } };

};

const findAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = { 
  login,
  findAllUsers,
};

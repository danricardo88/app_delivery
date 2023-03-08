const { User } = require('../database/models');

const login = async (email) => {
  const userLogin = await User.findOne({ where: { email } }); 
  return userLogin;
};

const findAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = { 
  login,
  findAllUsers,
};

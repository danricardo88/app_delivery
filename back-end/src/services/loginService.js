const { User } = require('../database/models');

const login = async (email) => {
  const userLogin = await User.findOne({ where: { email } }); 
  return userLogin;
};

module.exports = { 
  login,
};

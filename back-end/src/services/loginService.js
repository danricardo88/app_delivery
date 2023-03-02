const { UserModel } = require('../database/models');

const login = async (email, password) => {
  const userLogin = await UserModel.findOne({ where: { email, password } });

  return userLogin;
};

module.exports = { 
  login,
};

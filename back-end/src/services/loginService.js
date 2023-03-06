const { UserModel } = require('../database/models');

const login = async (email, password) => {
  const userLogin = await UserModel.findOne({ where: { email, password } });
  console.log(userLogin);

  return userLogin;
};

module.exports = { 
  login,
};

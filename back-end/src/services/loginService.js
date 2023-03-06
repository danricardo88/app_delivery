const { User } = require('../database/models');
const md5 = require('md5');

const login = async (email, password) => {
  const userLogin = await User.findOne({ where: { email } })
    return userLogin;
};

module.exports = { 
  login,
};

const md5 = require('md5');
const { Op: { or } } = require('sequelize');
const { User } = require('../database/models');
const { createToken } = require('../utils/tokenValidation');

const register = async ({ name, email, password }) => {
  const role = 'customer';
  const hash = md5(password);
  const { id } = await User.create({ name, email, password: hash, role });

  const token = await createToken(email, role);
  return { id, token, email, role, name, password: hash };
};

const findUser = async (user) => {
  const { email, name } = user;
  return User.findOne({ where: { 
    [or]: [{ email }, { name }],
   } });
};

module.exports = {
  register,
  findUser,
};
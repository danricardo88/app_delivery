const registerService = require('../services/registerService');

const register = async (req, res) => {
  const user = req.body;

  const minLengthPassword = 6;
  const minLengthName = 12;
  const emailRegex = /\S+@\S+\.\S+/;
  const emailCondition = emailRegex.test(user.email);

  const error = user.password.length < minLengthPassword 
  || !emailCondition || user.name.length < minLengthName;
  
  if (error) return res.status(400).json({ message: 'Some fields are invalid' });

  const findUser = await registerService.findUser(user);
  if (findUser) return res.status(409).json({ message: 'User already exist' });
  
  const newUser = await registerService.register(user);
  return res.status(201).json(newUser);
};

module.exports = {
  register,
};
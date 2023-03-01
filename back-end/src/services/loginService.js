import { UserModel } from '../database/models';

const login = async (email, password) => {
  const userLogin = await UserModel.findOne({ where: { email,password } });

  return userLogin
}

export default { login };

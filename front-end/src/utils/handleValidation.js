const minTwelve = 12;
const minSix = 6;
const regex = /\S+@\S+\.\S+/;

const AdminValidator = (email, password, username, role) => {
  const checkRole = role === 'customer' || role === 'seller';
  const checkEmail = regex.test(email);

  if (username) {
    return !(
      checkEmail && password.length >= minSix && username.length >= minTwelve
        && checkRole
    );
  }
  return !(checkEmail && password.length >= minSix);
};

export default AdminValidator;

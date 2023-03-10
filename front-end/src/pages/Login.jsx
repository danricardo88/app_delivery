// import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { post } from '../utils/api';
import { setLocalStorage } from '../utils/storage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const buttonCondition = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const emailCondition = emailRegex.test(email);
    const minLength = 5;
    const passwordCondition = password.length > minLength;
    return !(emailCondition && passwordCondition);
  };
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    let userRegister;

    try {
      const response = await post('login', { email, password });
      userRegister = response;
      const { name, id, email: userEmail, role, token } = userRegister.data;
      setLocalStorage('user', { name, id, email: userEmail, role, token });
    } catch (error) {
      userRegister = error;
    }

    if (userRegister.response) {
      return setErrorMessage(userRegister.response);
    }

    history.push('/customer/products');
  };

  return (
    <div>
      <form>
        <h1>TRYBE DELIVERY</h1>
        <div>
          <label htmlFor="email-input">
            Login
            <input
              type="text"
              data-testid="common_login__input-email"
              id="email-input"
              placeholder="email@trybeer.com.br"
              name="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password-input">
            Password
            <input
              type="password"
              id="password-input"
              data-testid="common_login__input-password"
              placeholder="*******"
              name="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            data-testid="common_login__button-login"
            disabled={ buttonCondition() }
            onClick={ (e) => login(e) }
          >
            LOGIN
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => history.push('register') }
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
      { errorMessage
        ? (
          <span
            data-testid="common_login__element-invalid-email"
          >
            Usuário ou senha inválidos
          </span>
        ) : null}
    </div>
  );
}

export default Login;

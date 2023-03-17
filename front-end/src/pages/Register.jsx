import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { post } from '../utils/api';
import { setLocalStorage } from '../utils/storage';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const minLengthPassword = 6;
  const minLengthName = 12;
  const emailRegex = /\S+@\S+\.\S+/;
  const emailCondition = emailRegex.test(email);

  const isDisabled = password.length < minLengthPassword
  || !emailCondition || name.length < minLengthName;

  const history = useHistory();

  const register = async () => {
    let userRegister;

    try {
      const response = await post('register', { email, password, name });
      userRegister = response;
      const { id } = response.data;
      setLocalStorage('user', { id, name, email });
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
        <h1>Cadastro</h1>
        <div>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              data-testid="common_register__input-name"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email
            <input
              type="text"
              data-testid="common_register__input-email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              data-testid="common_register__input-password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ register }
        >
          Cadastrar
        </button>
      </form>
      {
        errorMessage && (
          <span data-testid="common_register__element-invalid_register">
            Usuário já cadastrado
          </span>
        )
      }
    </div>
  );
}

export default Register;

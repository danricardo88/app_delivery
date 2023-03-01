import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonCondition = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const emailCondition = emailRegex.test(email);
    const minLength = 5;
    const passwordCondition = password.length > minLength;
    return !(emailCondition && passwordCondition);
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
              minLength="6"
              required
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
          >
            LOGIN
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

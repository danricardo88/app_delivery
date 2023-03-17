import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { contextAPI } from '../context/Context';
import UserTableList from '../components/UserTableList';
import AdminValidator from '../utils/handleValidation';
import Header from '../components/Header';

function Admin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [users, setUsers] = useState('');

  const { userData } = useContext(contextAPI);

  const getUsers = async () => {
    const { data } = await axios.get('http://localhost:3001/login');
    const usrLst = data.map((usr) => ({ ...usr }));
    setUsers([...usrLst]);
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!users) return <p>Loading</p>;

  const handleChange = ({ target: { name, value } }) => {
    const loginValues = {
      username: () => setUsername(value),
      email: () => setEmail(value),
      password: () => setPassword(value),
      role: () => setRole(value),
    };
    loginValues[name]();
    AdminValidator(username, email, password, role);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!AdminValidator(email, password, username, role)) {
      const response = await axios.post('http://localhost:3001/admin/manage', userData.token, {
        name: username,
        email,
        password,
        role,
      });

      const { status } = response;
      const data = await response.json();

      const CREATED = 201;
      if (status !== CREATED) {
        setErrMsg(data.message);
      } else {
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('');
      }
    }
  };

  return (
    <div>
      <Header />

      <h2>Cadastrar novo usuário</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">
          <input
            value={ username }
            required
            type="text"
            name="username"
            placeholder="Nome e sobrenome"
            onChange={ handleChange }
            data-testid="admin_manage__input-name"
            id="name"
          />
        </label>

        <label htmlFor="email">
          <input
            value={ email }
            required
            type="email"
            name="email"
            placeholder="email@domínio.com"
            onChange={ handleChange }
            data-testid="admin_manage__input-email"
            id="email"
          />
        </label>

        <label htmlFor="password">
          <input
            value={ password }
            required
            type="password"
            name="password"
            placeholder="******"
            onChange={ handleChange }
            data-testid="admin_manage__input-password"
            id="password"
          />
        </label>

        <label htmlFor="role">
          <select
            value={ role }
            required
            name="role"
            onChange={ handleChange }
            data-testid="admin_manage__select-role"
            id="role"
          >
            <option value="administrator">Administrador</option>
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={ AdminValidator(email, password, username, role) }
          data-testid="admin_manage__button-register"
          onSubmit={ handleSubmit }
        >
          Cadastrar
        </button>
      </form>
      <h2>Lista de usuários</h2>
      <UserTableList users={ users } />
      {
        errMsg && (
          <span data-testid="admin_manage__element-invalid-register" />
        )
      }
    </div>

  );
}

export default Admin;

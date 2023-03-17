import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { contextAPI } from '../context/Context';

export default function UserTableListItem({ index, id, name, email, role }) {
  const { userData } = useContext(contextAPI);

  const handleDeleteUser = async (userId) => {
    await axios.delete(userData.token, userId);
  };

  return (
    <tr>
      <td data-testid={ `admin_manage__element-user-table-item-number-${index}` }>
        {index + 1}
      </td>
      <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
        {name}
      </td>
      <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
        {email}
      </td>
      <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
        {role}
      </td>
      <td>
        <button
          type="button"
          data-testid={ `admin_manage__element-user-table-remove-${index}` }
          onClick={ () => handleDeleteUser(id) }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

UserTableListItem.propTypes = {
  index: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
}.isRequired;

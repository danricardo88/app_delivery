import React from 'react';
import PropTypes from 'prop-types';
import UserTableListItem from './UserTableListItem';

export default function UserTableList({ users }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { users?.map((user, index) => (
            <UserTableListItem key={ user.id } index={ index } { ...user } />
          ))}
        </tbody>
      </table>
    </div>
  );
}

UserTableList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
    }),
  ).isRequired,
};

import React from 'react';
import styles from './Table.module.css';

const Table = ({ items, checked, handleInputChange }) => (
  <table className={styles.table}>
    <thead >
      <tr>
        <th >
          #
        </th>
        <th >
          ID
        </th>
        <th >
          Full Name
        </th>
        <th >
          Role
        </th>
        <th >
          Business Location
        </th>
        <th >
          E-mail
        </th>
        <th >
          Phone
        </th>
        <th >
          Hourly Rate
        </th>
      </tr>
    </thead>
    <tbody>
      {items.map(({
        id,
        fullName,
        role,
        businessLocation,
        email,
        phone,
        hourlyRate
      }) => (
          <tr
            key={id + phone}
          >
            <td><div>
              <input
                type="checkbox"
                name={id}
                id={id}
                checked={checked}
                onChange={handleInputChange} />

            </div></td>
            <td>{id}</td>
            <td>{fullName}</td>
            <td>{role}</td>
            <td>{businessLocation}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{hourlyRate}</td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default Table;
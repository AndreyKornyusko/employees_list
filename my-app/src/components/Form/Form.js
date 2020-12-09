import React, { Component } from 'react';
import styles from './Form.module.css';

export default class Form extends Component {
  render() {
    const {
      handleSubmit,
      handleChange,
      handleCancelClick,
      fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formWrap}>
            <input
              type="text"
              name="fullName"
              value={fullName}
              placeholder="Full name"
              onChange={handleChange} />

            <input
              type="text"
              name="role"
              value={role}
              placeholder="Role"
              onChange={handleChange} />

            <input
              type="text"
              name="businessLocation"
              value={businessLocation}
              placeholder="Business location"
              onChange={handleChange} />

            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange} />

            <input
              type="text"
              name="phone"
              value={phone}
              placeholder="Phone"
              onChange={handleChange} />

            <input
              type="text"
              name="hourlyRate"
              value={hourlyRate}
              placeholder="Hourly rate"
              onChange={handleChange} />

            <input type="submit" value="Add" />

          </div>
          <div className={styles.buttonWrap}>
            <button className={styles.cancelBtn} onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

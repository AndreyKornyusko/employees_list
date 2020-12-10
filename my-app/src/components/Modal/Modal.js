import React, { Component, createRef } from 'react';
import styles from './Modal.module.css';
import Form from '../Form/Form';

export default class Modal extends Component {
  backdropRef = createRef();
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;
    this.props.onClose();
  };

  handleBackdropClick = e => {
    if (e.target !== this.backdropRef.current) return;
    this.props.onClose();
  };

  render() {
    const {
      formTitle,
      handleSubmit,
      handleChange,
      handleCancelClick,
      fullName,
      role, 
      businessLocation,
      email,
      phone,
      hourlyRate,
    } = this.props;
    return (
      <div
        className={styles.modalbackdrop}
        ref={this.backdropRef}
        onClick={this.handleBackdropClick}
      >
        <div className={styles.modalWrap}>
          <h2 className={styles.formTitle}>{formTitle}</h2>
          {/* {children} */}
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCancelClick={handleCancelClick}
            fullName={fullName}
            role={role}
            businessLocation={businessLocation}
            email={email}
            phone={phone}
            hourlyRate={hourlyRate}
          />

        </div>
      </div>
    );
  }
} 

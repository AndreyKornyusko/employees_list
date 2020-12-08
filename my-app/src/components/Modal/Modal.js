import React, { Component, createRef } from 'react';
import styles from './Modal.module.css';

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
    const { children,
      //  modalbackdrop, modalWrap
    } = this.props;
    return (
      <div
        className={styles.modalbackdrop}
        ref={this.backdropRef}
        onClick={this.handleBackdropClick}
      >
        <div className={styles.modalWrap}>{children}</div>
      </div>
    );
  }
} 

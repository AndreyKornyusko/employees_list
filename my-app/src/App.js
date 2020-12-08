import React, { Component } from 'react'
import styles from './App.module.css';
import Table from '../src/components/Table/Table';
import Modal from '../src/components/Modal/Modal';

const items = [
  { id: 101, fullName: "John Wick", role: "hunter", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "2000/h" },
  { id: 102, fullName: "John Wick", role: "hunter", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "2000/h" },
  { id: 103, fullName: "John Wick", role: "hunter", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "2000/h" }]

class App extends Component {
  state = {
    isNewEmployerModalOpen: false,
    isEditEmployerModalOpen: false,
  }

  handleAddBtn = () => {
    this.setState({ isNewEmployerModalOpen: true })
  }
  closeAddBtnModal = () => {
    this.setState({ isNewEmployerModalOpen: false })
  }

  render() {
    const {isNewEmployerModalOpen}=this.state;
    return (
      <div className={styles.App}>
        <div className={styles.tableWrap}>
          <Table items={items} />
          <div className={styles.buttonWrap}>
            <button className={styles.addBtn} onClick={this.handleAddBtn}>Add Employer</button>
            <button className={styles.editBtn}>Edit</button>
            <button className={styles.deleteBtn}>Delete</button>
          </div>
        </div>
        {isNewEmployerModalOpen &&
          <Modal
            onClose={this.closeAddBtnModal}
          >
            <div>TEST</div>
          </Modal>
        }
      </div>
    )
  }
}

export default App;

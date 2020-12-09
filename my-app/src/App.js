import React, { Component } from 'react'
import styles from './App.module.css';
import Table from '../src/components/Table/Table';
import Modal from '../src/components/Modal/Modal';
import Form from '../src/components/Form/Form';

const items = [
  { id: 101, fullName: "John Wick", role: "hunter", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "2000/h" },
  { id: 102, fullName: "John Wick", role: "hunter", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "2000/h" },
  { id: 103, fullName: "John Wick", role: "hunter", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "2000/h" }]

class App extends Component {
  state = {
    items: items,
    isNewEmployerModalOpen: false,
    isEditEmployerModalOpen: false,
    fullName: "",
    role: "",
    businessLocation: "",
    email: "",
    phone: "",
    hourlyRate: ""
  }

  handleAddBtn = () => {
    this.setState({ isNewEmployerModalOpen: true })
    console.log('Клик на Add Employer')
  }

  closeAddBtnModal = () => {
    this.setState({ isNewEmployerModalOpen: false })
  }

  handleCancelClick = () => {
    this.closeAddBtnModal()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate } = this.state;
    const id = Date.now()
    console.log(this.state);
    const updatedItems = this.state.items.push({
      id, fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate
    });
    this.setState({items:updatedItems})
    this.closeAddBtnModal()
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      isNewEmployerModalOpen,
      fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate,
      items

    } = this.state;
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
            <Form
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleCancelClick={this.handleCancelClick}
              fullName={fullName}
              role={role}
              businessLocation={businessLocation}
              email={email}
              phone={phone}
              hourlyRate={hourlyRate}

            />

          </Modal>
        }
      </div>
    )
  }
}

export default App;

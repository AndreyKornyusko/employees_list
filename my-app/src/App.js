import React, { Component } from 'react'
import styles from './App.module.css';
import Table from '../src/components/Table/Table';
import Modal from '../src/components/Modal/Modal';

const items = [
  { id: 101, fullName: "John Wick", role: "hunter", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "2000/h" },
  { id: 102, fullName: "John Wick", role: "killer", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "4000/h" },
  { id: 103, fullName: "John Wick", role: "hunter", businessLocation: "Chicago", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "3000/h" }]

class App extends Component {
  state = {
    items: items,
    checkedItems: [],
    isNewEmployerModalOpen: false,
    isEditEmployerModalOpen: false,
    fullName: "",
    role: "",
    businessLocation: "",
    email: "",
    phone: "",
    hourlyRate: "",
    formTitle: "",
    disabled: false
  }

  handleAddBtn = () => {
    this.setState({
      isNewEmployerModalOpen: true,
      formTitle: "Add new employer"
    })
    console.log('Клик на Add Employer')
  }

  closeAddBtnModal = () => {
    this.setState({ isNewEmployerModalOpen: false })
  }

  handleEditBtn = () => {
    if (this.state.checkedItems.length > 1) {
      this.setState({
        disabled: true
      })
    }
    
    if (this.state.checkedItems.length === 1) {
      this.setState({
        isEditEmployerModalOpen: true,
        formTitle: "Edit employer",
        disabled: false
      })

    }
    this.setState({
      isEditEmployerModalOpen: true,
      formTitle: "Edit employer"
    })
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
    const items = this.state.items;
    items.push({
      id, fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate
    });

    this.setState({ items: items })
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

  handleCheckInputChange = (e) => {
    const target = e.target;
    const checked = target.checked;
    const checkId = target.id;
    // const checkedInputData= {checkId, checked}
    const checkedItems = this.state.checkedItems;
    checkedItems.push(checkId);
    this.setState({
      checkedItems: checkedItems,
      disabled: false
    });
    if (this.state.checkedItems.length > 1) {
      this.setState({
        disabled: true
      });
    }
    // console.log('checkedItems', this.state.checkedItems)
  }

  render() {
    const {
      isNewEmployerModalOpen,
      isEditEmployerModalOpen,
      fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate,
      items,
      formTitle,
      disabled

    } = this.state;

    return (
      <div className={styles.App}>
        <div className={styles.tableWrap}>
          <Table
            items={items}
            handleInputChange={this.handleCheckInputChange}
          />
          <div className={styles.buttonWrap}>
            <button
              className={styles.addBtn}
              onClick={this.handleAddBtn}
            >Add Employer</button>
            <button
              className={styles.editBtn}
              onClick={this.handleEditBtn}
              disabled={disabled}
            >Edit</button>
            <button className={styles.deleteBtn}>Delete</button>
          </div>
        </div>
        {isNewEmployerModalOpen &&
          <Modal
            onClose={this.closeAddBtnModal}
            formTitle={formTitle}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleCancelClick={this.handleCancelClick}
            fullName={fullName}
            role={role}
            businessLocation={businessLocation}
            email={email}
            phone={phone}
            hourlyRate={hourlyRate}
          >
          </Modal>
        }
        {isEditEmployerModalOpen &&
          <Modal
            onClose={this.closeAddBtnModal}
            formTitle={formTitle}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleCancelClick={this.handleCancelClick}
            fullName={fullName}
            role={role}
            businessLocation={businessLocation}
            email={email}
            phone={phone}
            hourlyRate={hourlyRate}
          >
          </Modal>
        }
      </div>
    )
  }
}

export default App;

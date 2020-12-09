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
    itemForEdit: {},
    // itemForEdit: {
    //   id: "",
    //   fullName: "",
    //   role: "",
    //   businessLocation: "",
    //   email: "",
    //   phone: "",
    //   hourlyRate: "",
    // },
    isNewEmployerModalOpen: false,
    isEditEmployerModalOpen: false,
    id: "",
    fullName: "",
    role: "",
    businessLocation: "",
    email: "",
    phone: "",
    hourlyRate: "",
    formTitle: "",
    disabled: true,
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

  closeEditBtnModal = () => {
    this.setState({ isEditEmployerModalOpen: false })
  }

  handleEditBtn = () => {
    if (this.state.checkedItems.length === 1 || this.state.checkedItems.length > 1) {
      this.setState({
        isEditEmployerModalOpen: false,
        disabled: true
      })
    }

    if (this.state.checkedItems.length === 1) {

      const itemId = Number(this.state.checkedItems[0]);
      const checkedItem = items.find(arrItem => (arrItem.id === itemId));
      const itemForEdit = {
        id: checkedItem.id,
        fullName: checkedItem.fullName,
        role: checkedItem.role,
        businessLocation: checkedItem.businessLocation,
        email: checkedItem.email,
        phone: checkedItem.phone,
        hourlyRate: checkedItem.hourlyRate,
      }
      // console.log("itemId", itemId)
      // console.log("checkedItem", checkedItem)

      this.setState({
        isEditEmployerModalOpen: true,
        formTitle: "Edit employer",
        disabled: false,
        // itemForEdit: checkedItem
        id: checkedItem.id,
        fullName: checkedItem.fullName,
        role: checkedItem.role,
        businessLocation: checkedItem.businessLocation,
        email: checkedItem.email,
        phone: checkedItem.phone,
        hourlyRate: checkedItem.hourlyRate,
        itemForEdit: itemForEdit

      })

    }

  }

  handleCancelClick = () => {
    this.closeAddBtnModal()
  }

  handleCancelEditBtnClick = () => {
    this.closeEditBtnModal()
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

  handleEditFormSubmit = (e) => {
    e.preventDefault();
    const editedItem = this.state.itemForEdit;
    const id = Number(this.state.itemForEdit.id);
    console.log(this.state);
    const items = this.state.items;
    const index = items.indexOf(id);
    items.splice(index, 1, editedItem);
    this.setState({ items: items })
    this.closeEditBtnModal()
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
    const newCheckedItems = this.state.checkedItems;

    if (newCheckedItems.includes(checkId)) {

      const index = newCheckedItems.indexOf(checkId);

      console.log("index", index);
      console.log("checkId", checkId);
      newCheckedItems.splice(index, 1);

      console.log('newCheckedItems', newCheckedItems)

      this.setState({
        checkedItems: newCheckedItems,
      });
    }

    if (!newCheckedItems.includes(checkId)) {
      newCheckedItems.push(checkId);
      this.setState({
        checkedItems: newCheckedItems,
        disabled: false
      });
    }

    if (this.state.checkedItems.length > 1) {
      this.setState({
        disabled: true
      });
    }
    console.log('this.state.checkedItems', this.state.checkedItems)

  }

  render() {
    const {
      isNewEmployerModalOpen,
      isEditEmployerModalOpen,
      id,
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

    // const {
    //   fullName,
    //   role,
    //   businessLocation,
    //   email,
    //   phone,
    //   hourlyRate,
    // } = this.state.itemForEdit

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
          >
          </Modal>
        }
        {isEditEmployerModalOpen &&
          <Modal
            onClose={this.closeEditBtnModal}
            formTitle={formTitle}
            handleSubmit={this.handleEditFormSubmit}
            handleChange={this.handleChange}
            handleCancelClick={this.handleCancelEditBtnClick}
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

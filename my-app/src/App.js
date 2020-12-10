import React, { Component } from 'react'
import styles from './App.module.css';
import Table from '../src/components/Table/Table';
import Modal from '../src/components/Modal/Modal';
import * as API from '../src/services/api';

// const items = [
//   { id: 101, fullName: "John Wick", role: "hunter", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "2000/h" },
//   { id: 102, fullName: "John Wick", role: "killer", businessLocation: "New York", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "4000/h" },
//   { id: 103, fullName: "John Wick", role: "hunter", businessLocation: "Chicago", email: "johnwick@gmail.com", phone: "455-44-41", hourlyRate: "3000/h" }
// ]

class App extends Component {
  state = {
    items: [],
    checkedItems: [],
    // itemForEdit: {},
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

  componentDidMount() {
    API.getAllItems().then(items => {
      this.setState({ items });
    });
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
      const checkedItem = this.state.items.find(arrItem => (arrItem.id === itemId));
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
    const newItem = {
      id, fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate
    }

    API.addItem(newItem).then(response => {
      console.log("response", response)
      if (response.status === 201) return response.data;
      return
    })
      .then(newItem =>
        this.setState(state => ({ items: [...state.items, newItem] }))
      );

    this.closeAddBtnModal()
  }

  handleEditFormSubmit = (e) => {
    e.preventDefault();
    console.log("Клик на сабмит модалки редактирования");
    const checkedItems = this.state.checkedItems;
    const id = Number(checkedItems[0]);
    // console.log("id", id)
    const items = this.state.items;
    const {
      fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate,
    } = this.state;

    const editedItem = {
      id,
      fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate
    }

    // console.log("editedItem", editedItem)

    items.forEach((item, i) => {
      // console.log("item.id", item.id);
      // console.log("editedItem.id", editedItem.id);

      if (item.id === editedItem.id) {
        items[i] = editedItem
      }
    })
    // console.log("items", items)
    API.changeItem(editedItem.id, editedItem).then(response => {
      console.log("response", response)
      if (response.status === 200) {
        this.setState({ items: items });
      };
    })
    // console.log("this.state", this.state)
    this.closeEditBtnModal()
  }

  handleDeleteBtn = () => {
    console.log("Клик на Delete");
    if (this.state.checkedItems.length > 0) {
      const items = this.state.items;
      const checkedItems = this.state.checkedItems;
      const newItems = items.filter(item => !checkedItems.includes(item.id));

      checkedItems.forEach(
        item => {
          console.log("delete item", item)
          API.deleteItem(item).then(response => {
            console.log("delete response", response)
            if (response.status === 200) {
              // this.setState(state => ({
              //   items: state.items.filter(arrItem => arrItem.id !== item),
              // }));
            }
          })
        }
      )

      this.setState({
        items: newItems,
      });

    }
    return
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
    const checkId = target.id;
    const newCheckedItems = this.state.checkedItems;

    if (newCheckedItems.includes(Number(checkId))) {
      const index = newCheckedItems.indexOf(Number(checkId));
      newCheckedItems.splice(index, 1);
      this.setState({
        checkedItems: newCheckedItems,
      });

      if (newCheckedItems.length > 1) {
        this.setState({
          disabled: true
        });
      }

      if (newCheckedItems.length === 1) {
        this.setState({
          disabled: false
        });
      }
      return
    }

    if (!newCheckedItems.includes(Number(checkId))) {
      newCheckedItems.push(Number(checkId));
      this.setState({
        checkedItems: newCheckedItems,
        disabled: false
      });
      if (newCheckedItems.length > 1) {
        this.setState({
          disabled: true
        });
      }
    }
    // console.log('this.state.checkedItems', this.state.checkedItems)
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
            <button
              className={styles.deleteBtn}
              onClick={this.handleDeleteBtn}
            >Delete</button>
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

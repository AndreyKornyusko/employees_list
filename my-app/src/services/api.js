import axios from 'axios';

// axios.defaults.baseURL = 'https://json-server-258905.appspot.com/categories';

// axios.defaults.baseURL = 'http://localhost:3002';
// axios.defaults.baseURL = 'https://my-cool-projectapi.herokuapp.com/';

axios.defaults.baseURL = 'https://food-shop-auth-api.herokuapp.com/';

const getAllItems = () =>
  axios.get('/items').then(response => response.data);

const addItem = item =>
  axios.post('/items', item).then(response => response);

const deleteItem = id =>
  axios.delete(`/items/${id}`).then(response => response);

  const changeItem = (id, item) =>
  axios.put(`/items/${id}`,item).then(response => response);


export { getAllItems, addItem, deleteItem, changeItem };
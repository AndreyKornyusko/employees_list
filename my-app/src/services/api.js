import axios from 'axios';

// axios.defaults.baseURL = 'https://json-server-258905.appspot.com/categories';

axios.defaults.baseURL = 'http://localhost:3002';

const getAllItems = () =>
  axios.get('/items').then(response => response.data);

const addItem = item =>
  axios.post('/items', item).then(response => response);

const deleteItem = id =>
  axios.delete(`/items/${id}`).then(response => response);


export { getAllItems, addItem, deleteItem };
import axios from 'axios';

const getCartItems = async (userId) => {
  const { data } = await axios.get(`http://localhost:8081/api/v1/carts/${userId}`);
  return data.data;
};

// const getAllFoodSale = async () => {
//   const { data } = await axios.get('http://localhost:8081/api/v1/products?discount[gt]=0');

//   return data.data;
// };

const insertCartItem = async (item) => {
  const { data } = await axios.post(`http://localhost:8081/api/v1/carts`, item);

  return data.data;
};

const removeCartItem = async (id) => {
  await axios.delete(`http://localhost:8081/api/v1/carts/${id}`);
  return id;
};

const cartAPI = {
  getCartItems,
  insertCartItem,
  removeCartItem,
};

export default cartAPI;

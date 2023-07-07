import axios from 'axios';

const getOrders = async (userId) => {
  const { data } = await axios.get(`http://localhost:8081/api/v1/orders/${userId}`);
  return data.data;
};

const getOrderDetails = async (userId, orderId) => {
  const { data } = await axios.get(`http://localhost:8081/api/v1/orders/${userId}/${orderId}`);
  return data.data;
};

const insertOrder = async (order) => {
  const { data } = await axios.post(`http://localhost:8081/api/v1/orders`, order);

  return data.data;
};

const removeOrder = async (id) => {
  await axios.delete(`http://localhost:8081/api/v1/orders/${id}`);
  return id;
};

const orderAPI = {
  getOrders,
  getOrderDetails,
  insertOrder,
  removeOrder,
};

export default orderAPI;

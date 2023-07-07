import axios from 'axios';

const getUserProfile = async (userId) => {
  const { data } = await axios.get(`http://localhost:8081/api/v1/profile/${userId}`);

  return data.data;
};

const updateUserProfile = async (userId, user) => {
  const { data } = await axios.put(`http://localhost:8081/api/v1/profile/${userId}`, user);
  return data.data;
};

const userAPI = {
  getUserProfile,
  updateUserProfile,
};

export default userAPI;

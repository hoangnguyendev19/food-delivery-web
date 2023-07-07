import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { refreshUser } from '../store/authSlice';

// axios.defaults.withCredentials = true;

// const refreshToken = async () => {
//   try {
//     const res = await axios.post('/api/v1/users/refreshToken');

//     return res.data.accessToken;
//   } catch (error) {
//     console.log('Err: ', error);
//   }
// };

// const checkExpiredToken = async (dispatch, currUser) => {
//   const axiosInstance = axios.create({
//     withCredentials: true,
//   });
//   axiosInstance.interceptors.request.use(
//     async (config) => {
//       const dateNow = new Date();
//       const decoded = jwtDecode(currUser?.accessToken);
//       if (decoded.exp < dateNow.getTime() / 1000) {
//         const newAccessToken = await refreshToken();
//         const newUser = {
//           user: currUser?.user,
//           accessToken: newAccessToken,
//         };
//         dispatch(refreshUser(newUser));
//         config.headers.Authorization = `Bearer ${newAccessToken}`;
//       } else {
//         config.headers.Authorization = `Bearer ${currUser?.accessToken}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

const login = async (user) => {
  const { data } = await axios.post('http://localhost:8081/api/v1/accounts/login', user);
  if (data.data) {
    localStorage.setItem('user', JSON.stringify(data.data));
  }

  return data.data;
};

const signup = async (user) => {
  const { data } = await axios.post('http://localhost:8081/api/v1/accounts/signup', user);
  if (data.data) {
    localStorage.setItem('user', JSON.stringify(data.data));
  }
  return data.data;
};

const logout = async (axiosInstance) => {
  // await axiosInstance.delete('/api/v1/users/logout');
  localStorage.removeItem('user');
};

const updatePassword = async (passwordObj) => {
  await axios.put('http://localhost:8081/api/v1/accounts/password', passwordObj);
};

const authAPI = {
  login,
  signup,
  logout,
  updatePassword,
  // checkExpiredToken,
};

export default authAPI;

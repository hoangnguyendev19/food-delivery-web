import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../api/authAPI';
import userAPI from '../api/userAPI';

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (userId, thunkAPI) => {
  try {
    // const axiosInstance = await authAPI.checkExpiredToken(
    //   thunkAPI.dispatch,
    //   thunkAPI.getState().auth.currUser
    // );
    return await userAPI.getUserProfile(userId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ userId, user }, thunkAPI) => {
    try {
      // const axiosInstance = await authAPI.checkExpiredToken(
      //   thunkAPI.dispatch,
      //   thunkAPI.getState().auth.currUser
      // );
      return await userAPI.updateUserProfile(userId, user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const updatePassword = createAsyncThunk(
//   'userDetail/updatePassword',
//   async (passwordObj, thunkAPI) => {
//     try {
//       const axiosInstance = await authAPI.checkExpiredToken(
//         thunkAPI.dispatch,
//         thunkAPI.getState().auth.currUser
//       );
//       return await userAPI.updatePassword(axiosInstance, passwordObj);
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userProfile: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userProfile = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;

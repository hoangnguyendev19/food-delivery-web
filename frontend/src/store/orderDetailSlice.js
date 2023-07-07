import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderAPI from '../api/orderAPI';

export const getOrderDetails = createAsyncThunk(
  'orderDetail/getOrderDetails',
  async ({ userId, orderId }, thunkAPI) => {
    try {
      return await orderAPI.getOrderDetails(userId, orderId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: {
    order: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetOrderDetail: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.order = [];
      });
  },
});

export const { resetOrderDetail } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;

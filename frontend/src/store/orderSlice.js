import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderAPI from '../api/orderAPI';

export const getOrders = createAsyncThunk('order/getOrders', async (userId, thunkAPI) => {
  try {
    return await orderAPI.getOrders(userId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const insertOrder = createAsyncThunk('order/insertOrder', async (order, thunkAPI) => {
  try {
    return await orderAPI.insertOrder(order);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeOrder = createAsyncThunk('cart/removeOrder', async (id, thunkAPI) => {
  try {
    return await orderAPI.removeOrder(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  order: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.order = [];
      })
      .addCase(insertOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.order.push(action.payload);
      })
      .addCase(insertOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = state.order.filter((order) => order.id !== action.payload);
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;

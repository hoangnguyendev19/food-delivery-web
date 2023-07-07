import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import foodAPI from '../api/foodAPI';

export const getAllFoodSale = createAsyncThunk(
  'foodSale/getAllFoodSale',
  async (option = undefined, thunkAPI) => {
    try {
      return await foodAPI.getAllFoodSale();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const foodSaleSlice = createSlice({
  name: 'foodSale',
  initialState: {
    allFoodSale: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetFoodSale: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFoodSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFoodSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allFoodSale = action.payload;
      })
      .addCase(getAllFoodSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.allFoodSale = null;
      });
  },
});

export const { resetFoodSale } = foodSaleSlice.actions;
export default foodSaleSlice.reducer;

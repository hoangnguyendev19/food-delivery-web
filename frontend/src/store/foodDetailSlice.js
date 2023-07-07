import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import foodAPI from '../api/foodAPI';

export const getFood = createAsyncThunk('foodDetail/getFood', async (foodId, thunkAPI) => {
  try {
    return await foodAPI.getFood(foodId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const foodDetailSlice = createSlice({
  name: 'foodDetail',
  initialState: {
    food: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetFoodDetail: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.food = action.payload;
      })
      .addCase(getFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.food = null;
      });
  },
});

export const { resetFoodDetail } = foodDetailSlice.actions;
export default foodDetailSlice.reducer;

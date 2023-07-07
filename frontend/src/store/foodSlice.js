import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import foodAPI from '../api/foodAPI';

export const getAllFood = createAsyncThunk('food/getAllFood', async (option, thunkAPI) => {
  try {
    return await foodAPI.getAllFood({ ...option });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    allFood: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetFood: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allFood = action.payload;
      })
      .addCase(getAllFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.allFood = null;
      });
  },
});

export const { resetFood } = foodSlice.actions;
export default foodSlice.reducer;

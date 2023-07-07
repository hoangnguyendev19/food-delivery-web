import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartAPI from '../../api/cartAPI';

// const items =
//   localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];

// const totalAmount =
//   localStorage.getItem('totalAmount') !== null
//     ? JSON.parse(localStorage.getItem('totalAmount'))
//     : 0;

// const totalQuantity =
//   localStorage.getItem('totalQuantity') !== null
//     ? JSON.parse(localStorage.getItem('totalQuantity'))
//     : 0;

// const shippingAddress =
//   localStorage.getItem('shippingAddress') !== null
//     ? JSON.parse(localStorage.getItem('shippingAddress'))
//     : {};
// const paymentMethod =
//   localStorage.getItem('paymentMethod') !== null
//     ? JSON.parse(localStorage.getItem('paymentMethod'))
//     : '';

// const setItem = (item, totalAmount, totalQuantity) => {
//   localStorage.setItem('cartItems', JSON.stringify(item));
//   localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
//   localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
// };

export const getCartItems = createAsyncThunk('cart/getCartItems', async (userId, thunkAPI) => {
  try {
    return await cartAPI.getCartItems(userId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const insertCartItem = createAsyncThunk('cart/insertCartItem', async (item, thunkAPI) => {
  try {
    return await cartAPI.insertCartItem(item);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id, thunkAPI) => {
  try {
    return await cartAPI.removeCartItem(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  cart: {
    totalAmount: 0,
    itemList: [],
  },
  method: {
    shipping: '',
    payment: '',
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  // reducers: {
  //   addItem: (state, action) => {
  //     const newItem = action.payload;
  //     const existingItem = state.cart.cartItems.find((item) => item.id === newItem.id);
  //     state.totalQuantity += newItem.quantity;

  //     if (!existingItem) {
  //       state.cart.cartItems.push({
  //         id: newItem.id,
  //         name: newItem.name,
  //         image: newItem.image,
  //         price: newItem.price,
  //         quantity: newItem.quantity,
  //         totalPrice: newItem.price * newItem.quantity,
  //       });
  //     } else {
  //       existingItem.quantity += newItem.quantity;
  //       existingItem.totalPrice =
  //         Number(existingItem.totalPrice) + Number(newItem.price * newItem.quantity);
  //     }

  //     state.totalAmount = state.cart.cartItems.reduce(
  //       (total, item) => total + Number(item.price) * Number(item.quantity),
  //       0
  //     );

  //     setItem(
  //       state.cart.cartItems.map((item) => item),
  //       state.totalAmount,
  //       state.totalQuantity
  //     );
  //   },
  //   removeItem: (state, action) => {
  //     const id = action.payload;
  //     const existingItem = state.cart.cartItems.find((item) => item.id === id);

  //     if (existingItem) {
  //       state.cart.cartItems = state.cart.cartItems.filter((item) => item.id !== id);
  //       state.totalQuantity = state.totalQuantity - existingItem.quantity;
  //     }

  //     state.totalAmount = state.cart.cartItems.reduce(
  //       (total, item) => total + Number(item.price) * Number(item.quantity),
  //       0
  //     );
  //     setItem(
  //       state.cart.cartItems.map((item) => item),
  //       state.totalAmount,
  //       state.totalQuantity
  //     );
  //   },

  //   increaseItem: (state, action) => {
  //     const newItem = action.payload;
  //     const existingItem = state.cart.cartItems.find((item) => item.id === newItem.id);
  //     state.totalQuantity++;

  //     existingItem.quantity++;
  //     existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);

  //     state.totalAmount = state.cart.cartItems.reduce(
  //       (total, item) => total + Number(item.price) * Number(item.quantity),
  //       0
  //     );

  //     setItem(
  //       state.cart.cartItems.map((item) => item),
  //       state.totalAmount,
  //       state.totalQuantity
  //     );
  //   },

  //   decreaseItem: (state, action) => {
  //     const id = action.payload;
  //     const existingItem = state.cart.cartItems.find((item) => item.id === id);
  //     state.totalQuantity--;

  //     if (existingItem.quantity === 1) {
  //       state.cart.cartItems = state.cart.cartItems.filter((item) => item.id !== id);
  //     } else {
  //       existingItem.quantity--;
  //       existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
  //     }

  //     state.totalAmount = state.cart.cartItems.reduce(
  //       (total, item) => total + Number(item.price) * Number(item.quantity),
  //       0
  //     );

  //     setItem(
  //       state.cart.cartItems.map((item) => item),
  //       state.totalAmount,
  //       state.totalQuantity
  //     );
  //   },

  //   resetCart: (state) => {
  //     state = {
  //       cartItems: [],
  //       totalAmount: 0,
  //       totalQuantity: 0,
  //     };

  //     setItem([], 0, 0);
  //   },

  //   saveShippingAddress: (state, action) => {
  //     state.cart.shippingAddress = action.payload;
  //   },

  //   savePaymentMethod: (state, action) => {
  //     state.cart.paymentMethod = action.payload;
  //   },
  // },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    saveShippingMethod: (state, action) => {
      state.method.shipping = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.method.payment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cart = [];
      })
      .addCase(insertCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.cart.push(action.payload);
      })
      .addCase(insertCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let foundItem = state.cart.itemList.filter((item) => item.id === action.payload);
        foundItem = JSON.parse(JSON.stringify(foundItem));
        state.cart.totalAmount -= foundItem[0].totalPrice;
        state.cart.itemList = state.cart.itemList.filter((item) => item.id !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, saveShippingMethod, savePaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;

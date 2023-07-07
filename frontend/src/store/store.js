import { configureStore } from '@reduxjs/toolkit';
import foodListReducer from './foodSlice';
import foodDetailReducer from './foodDetailSlice';
import foodSaleReducer from './foodSaleSlice';
import orderReducer from './orderSlice';
import commentReducer from './commentSlice';
import cartReducer from './shopping-cart/cartSlice';
import cartUiReducer from './shopping-cart/cartUiSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import orderDetailReducer from './orderDetailSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartUi: cartUiReducer,
    comment: commentReducer,
    foodList: foodListReducer,
    foodDetail: foodDetailReducer,
    foodSale: foodSaleReducer,
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer,
  },
});

export default store;

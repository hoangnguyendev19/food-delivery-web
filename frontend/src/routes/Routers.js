import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import AllFoods from '../pages/AllFoods';
import FoodDetails from '../pages/FoodDetails';
import Cart from '../pages/Cart';
// import Checkout from '../pages/Shipping';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import ChangePassword from '../pages/ChangePassword';
import Shipping from '../pages/Shipping';
import Payment from '../pages/Payment';
import PlaceOrder from '../pages/PlaceOrder';
import Order from '../pages/Order';
import OrderDetail from '../pages/OrderDetail';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/food" exact element={<AllFoods />} />
      <Route path="/food/:id" exact element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order" element={<Order />} />
      <Route path="/order/:id" exact element={<OrderDetail />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Routers;

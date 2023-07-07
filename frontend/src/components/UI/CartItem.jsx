import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import '../../styles/cart-item.css';

import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../store/shopping-cart/cartSlice';

const CartItem = ({ item }) => {
  const { id, productName, imgUrl, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(removeCartItem(id));
  };

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={imgUrl} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{productName}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>${totalPrice}</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              {/* <span className="increase__btn" onClick={increasingItem}>
                <i className="ri-add-line"></i>
              </span> */}
              <span className="quantity">{quantity}</span>
              {/* <span className="decrease__btn" onClick={decreasingItem}>
                <i className="ri-subtract-line"></i>
              </span> */}
            </div>
          </div>

          <span className="delete__btn" onClick={deleteItem}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;

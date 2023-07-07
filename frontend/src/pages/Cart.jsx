import React, { useEffect } from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import '../styles/cart-page.css';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { getCartItems, removeCartItem } from '../store/shopping-cart/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { currUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCartItems(currUser.customerId));
  }, [dispatch, currUser]);
  return (
    <Helmet title="Cart">
      <div className="content">
        <CommonSection title="Your Cart" />
        <section>
          <Container>
            <Row>
              <Col lg="12">
                {cart.itemList.length === 0 ? (
                  <h5 className="text-center">Your cart is empty</h5>
                ) : (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center">Image</th>
                        <th className="text-center">Product Name</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Total Price</th>
                        <th className="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.itemList.map((item) => (
                        <Tr item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="mt-4">
                  <h6>
                    Subtotal: $<span className="cart__subtotal">{cart.totalAmount}</span>
                  </h6>
                  <p>Taxes and shipping will calculate at checkout</p>
                  <div className="cart__page-btn">
                    <button className="addToCart__btn me-4">
                      <Link to="/food">Continue Shopping</Link>
                    </button>
                    {cart.itemList.length !== 0 && (
                      <button className="addToCart__btn">
                        <Link to="/shipping">Proceed to checkout</Link>
                      </button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const { id, imgUrl, productName, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(removeCartItem(id));
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={imgUrl} alt="" />
      </td>
      <td className="text-center align-middle">{productName}</td>
      <td className="text-center align-middle">{quantity}</td>
      <td className="text-center align-middle">${totalPrice}</td>
      <td className="text-center cart__item-del align-middle">
        <i className="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;

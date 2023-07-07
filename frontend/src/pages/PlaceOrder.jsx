import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { insertOrder } from '../store/orderSlice';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { method } = useSelector((state) => state.cart);
  const { currUser } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      insertOrder({
        shippingMethod: method.shipping,
        paymentMethod: method.payment,
        customerId: currUser.customerId,
      })
    );
    navigate('/order');
  };

  return (
    <>
      <Helmet title="Place Order">
        <div className="content">
          <CommonSection title="Place Order" />
          <section>
            <Container>
              <h6 className="mb-4">Order Information</h6>
              <form className="checkout__form" onSubmit={(e) => submitHandler(e)}>
                <Row>
                  <Col lg={4} md={2}>
                    <div className="form__group">
                      <label for="name" className="me-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        // value={currUser.customer.name}
                        value="Name"
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={2}>
                    <div className="form__group">
                      <label for="email" className="me-2">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        // value={currUser.customer.email}
                        value="email"
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={2}>
                    <div className="form__group">
                      <label for="phone" className="me-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        // value={currUser.customer.phoneNumber}
                        value="phone number"
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={2}>
                    <div className="form__group">
                      <label for="address" className="me-2">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        // value={currUser.customer.address}
                        value="address"
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={2}>
                    <div className="form__group">
                      <label for="shipping" className="me-2">
                        Shipping Method
                      </label>
                      <input
                        type="text"
                        id="shipping"
                        name="shipping"
                        value={method.shipping}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={2}>
                    <div className="form__group">
                      <label for="payment" className="me-2">
                        Payment Method
                      </label>
                      <input
                        type="text"
                        id="payment"
                        name="payment"
                        value={method.payment}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                <button type="submit" className="addToCart__btn">
                  Order
                </button>
              </form>
            </Container>
          </section>
        </div>
      </Helmet>
    </>
  );
};

export default PlaceOrder;

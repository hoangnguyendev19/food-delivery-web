import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';

import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import { saveShippingMethod } from '../store/shopping-cart/cartSlice';

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState('economy');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingMethod(shippingMethod));
    navigate('/payment');
  };

  return (
    <Helmet title="Shipping">
      <div className="content">
        <CommonSection title="Shipping Method" />
        <section>
          <Container>
            <Row>
              <Col lg="8" md="6">
                <h6 className="mb-4">Select Method</h6>
                <form className="checkout__form" onSubmit={(e) => submitHandler(e)}>
                  <Row>
                    <Col lg="2" md="1">
                      <div className="d-flex align-items-center mb-4">
                        <label for="economy" className="me-2">
                          Economy
                        </label>
                        <input
                          type="radio"
                          id="economy"
                          name="shippingMethod"
                          value="economy"
                          checked
                          onClick={(e) => setShippingMethod(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg="2" md="1">
                      <div className="d-flex align-items-center mb-4">
                        <label for="express" className="me-2">
                          Express
                        </label>
                        <input
                          type="radio"
                          id="express"
                          name="shippingMethod"
                          value="express"
                          onClick={(e) => setShippingMethod(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <button type="submit" className="addToCart__btn">
                    Continue
                  </button>
                </form>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default Shipping;

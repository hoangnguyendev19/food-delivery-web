import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import { getOrders, removeOrder } from '../store/orderSlice';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((state) => state.order);
  const { currUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrders(currUser.customerId));
  }, [dispatch, currUser]);

  const deleteOrder = (id) => {
    dispatch(removeOrder(id));
    navigate('/order');
  };

  return (
    <>
      <Helmet title="Order">
        <div className="content">
          <CommonSection title="Your Order" />
          <section>
            <Container>
              <Row>
                <Col>
                  {order.length === 0 ? (
                    <h5 className="text-center">Your order is empty</h5>
                  ) : (
                    <Table className="table-bordered text-center">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Order Date</th>
                          <th>Total Amount</th>
                          <th>Shipping Method</th>
                          <th>Payment Method</th>
                          <th>Status</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.map((item) => (
                          <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.orderDate}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.shippingMethod}</td>

                            <td>{item.paymentMethod}</td>
                            {item.status === 'processing' ? (
                              <td>Đang chờ xử lý đơn hàng</td>
                            ) : (
                              <td>Đang giao hàng</td>
                            )}
                            <td>
                              <Link
                                to={`/order/${item.id}`}
                                className="text-primary text-decoration-underline"
                              >
                                View
                              </Link>
                            </td>
                            {item.status === 'shipping' ? (
                              <td>
                                <Button className="btn-success">Đã nhận hàng</Button>
                              </td>
                            ) : (
                              <td>
                                <Button className="btn-danger" onClick={() => deleteOrder(item.id)}>
                                  Delete
                                </Button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </Helmet>
    </>
  );
};

export default Order;

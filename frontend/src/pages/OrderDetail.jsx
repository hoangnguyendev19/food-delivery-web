import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Col, Container, Row, Table } from 'reactstrap';
import { getOrderDetails } from '../store/orderDetailSlice';

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDetail);
  const { currUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrderDetails({ userId: currUser.customerId, orderId: id }));
  }, [dispatch, currUser, id]);

  return (
    <>
      <Helmet title="Order Detail">
        <div className="content">
          <CommonSection title="Order Detail" />
          <section>
            <Container>
              <Row>
                <Col>
                  <Table className="table-bordered text-center">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td className="text-center cart__img-box">
                            <img src={item.imgUrl} alt="" />
                          </td>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </Helmet>
    </>
  );
};

export default OrderDetail;

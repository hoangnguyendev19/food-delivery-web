import React, { useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
// import { resetState, updatePassword } from '../store/authSlice';
// import { toast } from 'react-toastify';
import Spinner from '../components/UI/Spinner';
import { updatePassword } from '../store/authSlice';

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currUser, isLoading, isError, message, isSuccess } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Please enter your password!')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Please enter your password at least eight characters includes one letter, one number and one special character!'
      ),
    newPassword: yup
      .string()
      .required('Please enter your password!')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Please enter your password at least eight characters includes one letter, one number and one special character!'
      ),
    confirmedNewPassword: yup
      .string()
      .required('Please retype your new password!')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match!'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmedNewPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const passwordObj = {
        userName: currUser.userName,
        oldPassword: values.password,
        newPassword: values.newPassword,
      };
      dispatch(updatePassword(passwordObj));
      navigate('/home');
    },
  });

  useEffect(() => {
    // if (isError) {
    //   // toast.error(message, {
    //   //   position: 'top-right',
    //   //   autoClose: 2000,
    //   //   hideProgressBar: false,
    //   //   closeOnClick: true,
    //   //   pauseOnHover: true,
    //   //   draggable: true,
    //   //   progress: undefined,
    //   //   theme: 'colored',
    //   // });
    // }

    // if (isSuccess) {
    //   // toast.success('You updated profile successfully!', {
    //   //   position: 'top-right',
    //   //   autoClose: 2000,
    //   //   hideProgressBar: false,
    //   //   closeOnClick: true,
    //   //   pauseOnHover: true,
    //   //   draggable: true,
    //   //   progress: undefined,
    //   //   theme: 'colored',
    //   // });
    //   navigate('/home');
    // }

    return () => {
      // dispatch(resetState());
    };
  }, [isError, message, navigate, isSuccess, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Helmet title="Change Password">
      <div className="content">
        <CommonSection title="Change Password" />

        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-5" onSubmit={formik.handleSubmit}>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your old password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && <p>{formik.errors.password}</p>}
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your new Password"
                      id="newPassword"
                      name="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.newPassword && <p>{formik.errors.newPassword}</p>}
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Retype new password"
                      id="confirmedNewPassword"
                      name="confirmedNewPassword"
                      value={formik.values.confirmedNewPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.confirmedNewPassword && (
                      <p>{formik.errors.confirmedNewPassword}</p>
                    )}
                  </div>
                  <button type="submit" className="addToCart__btn">
                    Update
                  </button>
                </form>
                <Link to="/profile">Go your profile ?</Link>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default ChangePassword;

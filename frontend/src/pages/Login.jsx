import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import '../styles/login.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, signin } from '../store/authSlice';
import Spinner from '../components/UI/Spinner';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currUser, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email!')
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter your email a valid!'),
    password: yup
      .string()
      .required('Please enter your password!')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Please enter your password at least eight characters includes one letter, one number and one special character!'
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const user = {
        userName: values.email,
        password: values.password,
      };
      await dispatch(signin(user));
      resetForm();
    },
  });

  useEffect(() => {
    if (isError) {
      // toast.error(message, {
      //   position: 'top-right',
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'colored',
      // });
    }
    if (isSuccess || currUser) {
      // toast.success('You logged in successfully!', {
      //   position: 'top-right',
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'colored',
      // });
      navigate('/home');
    }

    return () => {
      dispatch(reset());
    };
  }, [currUser, isError, isSuccess, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet title="Login">
        <div className="content">
          <CommonSection title="Login" />

          <section>
            <Container>
              <Row>
                <Col lg="6" md="6" sm="12" className="m-auto text-center">
                  <form className="form mb-5" onSubmit={formik.handleSubmit}>
                    <div className="form__group">
                      <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.email && <p>{formik.errors.email}</p>}
                    </div>
                    <div className="form__group">
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.password && <p>{formik.errors.password}</p>}
                    </div>
                    <button type="submit" className="addToCart__btn">
                      Login
                    </button>
                  </form>
                  <div className="login">
                    <button className="login__with-google">Sign in with Google</button>
                  </div>
                  <Link to="/register">Don't have an account? Create an account</Link>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </Helmet>
    </>
  );
};

export default Login;

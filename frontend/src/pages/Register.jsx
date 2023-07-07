import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, register } from '../store/authSlice';
import Spinner from '../components/UI/Spinner';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currUser, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    // fullName: yup
    //   .string()
    //   .required('Please enter your full name!')
    //   .min(4, 'Please enter your full name at least four characters!')
    //   .max(30, 'Too long!'),
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
    confirmedPassword: yup
      .string()
      .required('Please retype your password!')
      .oneOf([yup.ref('password'), null], 'Passwords must match!'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmedPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const user = {
        email: values.email,
        password: values.password,
      };
      dispatch(register(user));
      resetForm();
    },
  });

  useEffect(() => {
    if (isError) {
      // toast.error(message, {
      //   position: 'top-right',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'colored',
      // });
    }

    if (isSuccess || currUser) {
      // toast.success('🦄 You signed up successfully!', {
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

    dispatch(reset());
  }, [currUser, isError, isSuccess, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet title="Sign Up">
        <div className="content">
          <CommonSection title="Sign Up" />

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
                    <div className="form__group">
                      <input
                        type="password"
                        placeholder="Confirmed Password"
                        id="confirmedPassword"
                        name="confirmedPassword"
                        value={formik.values.confirmedPassword}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.confirmedPassword && <p>{formik.errors.confirmedPassword}</p>}
                    </div>
                    <button type="submit" className="addToCart__btn">
                      Sign Up
                    </button>
                  </form>
                  <Link to="/login">Already have an account? Login</Link>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </Helmet>
    </>
  );
};

export default Register;

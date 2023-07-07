import React, { useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, resetState, updateUserProfile } from '../store/userSlice';
// import { toast } from 'react-toastify';
import Spinner from '../components/UI/Spinner';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { userProfile, isLoading } = useSelector((state) => state.user);
  let { currUser } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name!')
      .min(4, 'Please enter your full name at least four characters!')
      .max(30, 'Too long!'),
    email: yup
      .string()
      .required('Please enter your email!')
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter your email a valid!'),
    phoneNumber: yup
      .string()
      .required('Please enter your email!')
      .min(10, 'Phone number 10 characters!')
      .max(10, 'Phone number 10 characters!'),
  });

  const handleDate = (dateObj) => {
    let newDate = '';
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    if (day > 0 && day < 10) {
      day = `0${day}`;
    }

    if (month > 0 && month < 10) {
      month = `0${month}`;
    }

    newDate = year + '-' + month + '-' + day;
    return newDate;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: userProfile ? userProfile.name : '',
      gender: userProfile ? userProfile.gender : '',
      email: userProfile ? userProfile.email : '',
      photoUrl: userProfile
        ? userProfile.photoUrl
        : 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
      birthday: userProfile ? handleDate(new Date(userProfile.birthday)) : '',
      address: userProfile ? userProfile.address : '',
      phoneNumber: userProfile ? userProfile.phoneNumber : '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const user = {
        name: values.fullName,
        gender: values.gender,
        email: values.email,
        photoUrl: values.photoUrl,
        birthday: values.birthday,
        address: values.address,
        phoneNumber: values.phoneNumber,
      };
      dispatch(updateUserProfile({ userId: currUser.customerId, user }));
      navigate('/home');
    },
  });

  useEffect(() => {
    // if (isError) {
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
    // }

    // if (isSuccess) {
    //   navigate('/home');
    // toast.success('You updated profile successfully!', {
    //   position: 'top-right',
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: 'colored',
    // });
    // }
    dispatch(getUserProfile(currUser.customerId));
    return () => {
      dispatch(resetState());
      // dispatch(reset());
    };
  }, [dispatch, currUser]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Helmet title="Profile">
      <div className="content">
        <CommonSection title="Your Profile" />
        <section>
          <Container>
            <Row>
              <Col lg="4" md="4" sm="12" className="text-center">
                <div className="form__group">
                  <input
                    type="image"
                    src={formik.values.photoUrl}
                    alt="avatar"
                    height="200px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Col>
              <Col lg="8" md="8" sm="12" className="text-center">
                <form className="form mb-5" onSubmit={formik.handleSubmit}>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      id="fullName"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.fullName && <p>{formik.errors.fullName}</p>}
                  </div>
                  {formik.values.gender === '' && (
                    <div className="text-start mb-3">
                      <span className="me-3">
                        <input
                          type="radio"
                          id="gender"
                          name="gender"
                          value="female"
                          checked
                          onClick={(e) => formik.handleChange(e.target.value)}
                        />{' '}
                        <label for="">Female</label>
                      </span>
                      <span>
                        <input
                          type="radio"
                          id="gender"
                          name="gender"
                          value="male"
                          onClick={(e) => formik.handleChange(e.target.value)}
                        />{' '}
                        <label for="">Male</label>
                      </span>
                    </div>
                  )}
                  {formik.values.gender === 'female' && (
                    <div className="text-start mb-3">
                      <span className="me-3">
                        <input
                          type="radio"
                          id="gender"
                          name="gender"
                          value="female"
                          checked
                          onClick={(e) => formik.handleChange(e.target.value)}
                        />{' '}
                        <label for="">Female</label>
                      </span>
                      <span>
                        <input
                          type="radio"
                          id="gender"
                          name="gender"
                          value="male"
                          onClick={(e) => formik.handleChange(e.target.value)}
                        />{' '}
                        <label for="">Male</label>
                      </span>
                    </div>
                  )}
                  {formik.values.gender === 'male' && (
                    <div className="text-start mb-3">
                      <span className="me-3">
                        <input
                          type="radio"
                          id="gender"
                          name="gender"
                          value="female"
                          onClick={(e) => formik.handleChange(e.target.value)}
                        />{' '}
                        <label for="">Female</label>
                      </span>
                      <span>
                        <input
                          type="radio"
                          id="gender"
                          name="gender"
                          value="male"
                          checked
                          onClick={(e) => formik.handleChange(e.target.value)}
                        />{' '}
                        <label for="">Male</label>
                      </span>
                    </div>
                  )}

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
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={formik.values.birthday}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.phoneNumber && <p>{formik.errors.phoneNumber}</p>}
                  </div>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Photo Url"
                      id="photoUrl"
                      name="photoUrl"
                      value={formik.values.photoUrl}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <button type="submit" className="addToCart__btn">
                    Update
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

export default Profile;

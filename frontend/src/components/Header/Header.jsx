import React, { useEffect, useRef, useState } from 'react';

import { Container, Dropdown } from 'react-bootstrap';
import logo from '../../assets/images/res-logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggle } from '../../store/shopping-cart/cartUiSlice';
import '../../styles/header.css';
// import { resetCart } from '../../store/shopping-cart/cartSlice';
import { logout } from '../../store/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { resetState } from '../../store/userSlice';

const nav__links = [
  {
    display: 'Home',
    path: '/home',
  },
  {
    display: 'Food',
    path: '/food?page=1&limit=3',
  },
  {
    display: 'Cart',
    path: '/cart',
  },
  {
    display: 'Contact',
    path: '/contact',
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [qty, setQty] = useState(totalQuantity);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currUser } = useSelector((state) => state.auth);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const handleLogoutClick = async () => {
    await dispatch(logout());
    toast.success('🦄 You logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    navigate('/login');
    setQty(0);
  };

  const toggleCart = () => {
    if (currUser) {
      dispatch(toggle());
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    setQty(totalQuantity);

    return () => {
      // dispatch(resetCart());
      dispatch(resetState());
    };
  }, [totalQuantity, currUser, dispatch]);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="logo" />
              <h5>Hoang's Food</h5>
            </Link>
          </div>

          <div className="navigation" ref={menuRef}>
            <ul className="menu">
              <li>
                <span className="show__close" onClick={toggleMenu}>
                  <i className="ri-close-line"></i>
                </span>
              </li>
              {nav__links.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) => (navClass.isActive ? 'active__menu' : '')}
                    onClick={toggleMenu}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{qty}</span>
            </span>

            <div className="user">
              {currUser ? (
                <Dropdown show={dropdownOpen} onToggle={() => setDropdownOpen(!dropdownOpen)}>
                  <Dropdown.Toggle>
                    <div>
                      {/* Photo */}
                      <img src="/img-ava-1.jpg" alt="avatar" />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/profile">Your profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/cart">Your cart</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/order">Your order</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/change-password">Change password</Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogoutClick}>Sign out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <div className="user__sign-in">
                    <Link to="/login">Sign In</Link>
                  </div>
                  <div className="user__sign-up">
                    <Link to="/register">Sign Up</Link>
                  </div>
                </>
              )}
            </div>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

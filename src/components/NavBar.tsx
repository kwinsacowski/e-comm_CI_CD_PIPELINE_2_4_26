import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";



const NavBar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Total quantity in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
      await signOut(auth);
    };


  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: 'linear-gradient(90deg, #49a1b1, #6bdaff)',
        padding: '0.8rem 2rem',
      }}
    >
      <div className="container-fluid d-flex align-items-center">

        {/* LEFT — Brand */}
        <Link
          to="/"
          className="navbar-brand fw-bold text-white"
          style={{ fontSize: '1.6rem' }}
        >
          Brivana
        </Link>

        {/* CENTER — Links */}
        <div className="mx-auto d-flex gap-4">
          <Link className="nav-link text-white fw-semibold" to="/">
            Home
          </Link>
          <Link className="nav-link text-white fw-semibold" to="/shop">
            Shop By Category
          </Link>
          {user  && (
            <Link className='nav-link text-white fw-semibold' to="/manage-products">
            Manage Products
            </Link>
          )}
          {user && (
            <Link className="nav-link text-white fw-semibold" to="/my-orders">
              My Orders
            </Link>
          )}
        </div>

        {/* RIGHT — Cart with Count */}
        <Link
          to="/cart"
          className="position-relative nav-link text-white d-flex align-items-center"
          style={{
            fontSize: '1.6rem',
            backgroundColor: '#ffa07a',
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
          }}
        >
          <FaShoppingCart />

          {cartCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.7rem' }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="nav-link text-white">Profile</Link>
            <button className="btn btn-light ms-2" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link text-white">Login</Link>
            <Link to="/register" className="nav-link text-white">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

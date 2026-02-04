import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ShopBy from './pages/ShopBy';
import Electronics from './pages/Electronics';
import Jewelry from './pages/Jewlery';
import Mens from './pages/Mens';
import Womens from './pages/Womens';
import Cart from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ManageProducts from './pages/ManageProducts';
import MyOrders from './pages/MyOrders';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/shop" element={<ShopBy />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
};

export default App;

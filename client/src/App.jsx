import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProductList from './pages/seller/ProductList';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart'
import ProductCategory from './pages/ProductCategory'; 

import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Auth from './models/Auth';

import { AppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import AddAddress from './pages/AddAddress';
import SellerLogin from './component/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout'; 
import MyOrders from './pages/MyOrders';

import AddProduct from './pages/seller/AddProduct';
import Orders from './pages/seller/Orders';

const App = () => {

  // ✅ ADD user state (important)
  const { isSeller, showUserLogin, user } = useContext(AppContext);

  const isSellerPath = useLocation().pathname.includes('seller');

  return (
    <div className="text-default min-h-screen">
      
      {!isSellerPath && <Navbar />}

      {showUserLogin && <Auth />}

      <Toaster />

      <div className={!isSellerPath ? "px-6 md:px-16 lg:px-24 xl:px-32" : ""}>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/AddAddress" element={<AddAddress />} />
          <Route path="/seller-login" element={<SellerLogin />} />

          {/* ✅ PROTECTED MY ORDERS */}
          <Route 
            path="/my-orders" 
            element={user ? <MyOrders /> : <Navigate to="/" />} 
          />

          {/* SELLER */}
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>

            <Route index element={isSeller ? <AddProduct /> : <Navigate to="/seller-login" />} />

            <Route path="product-list" element={isSeller ? <ProductList /> : <Navigate to="/seller-login" />} />

            <Route path="orders" element={isSeller ? <Orders /> : <Navigate to="/seller-login" />} />

          </Route>

        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
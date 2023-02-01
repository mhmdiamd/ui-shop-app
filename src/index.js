import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SellingProduct } from './pages/dashboard/seller/product/SellingProduct';
import SellerRegister from './pages/register/SellerRegister';
import CustomerRegister from './pages/register/CustomerRegister';
import { SellerProfile } from './pages/dashboard/seller/profile/Profile';
import './global.css';
import './index.css';
import 'trix/dist/trix.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'trix';
import CustomerLogin from './pages/login/CustomerLogin';
import { MyProduct } from './pages/dashboard/seller/product/MyProduct';
import { UpdateProduct } from './pages/dashboard/seller/product/UpdateProduct/UpdateProduct';
import { Home } from './pages/home/Home';
import { SellerLogin } from './pages/login/SellerLogin';
import { UserAuth } from './middleware/UserAuth';
import { ProductDetail } from './pages/ProductDetail/ProductDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/dashboard">
          <Route path="sellers" element={<SellerProfile />} />
          <Route path="sellers/selling-product" element={<SellingProduct />} />
          <Route path="sellers/my-product" element={<MyProduct />} />
          <Route path="sellers/products/:id" element={<UpdateProduct />} />
        </Route>
        <Route path="/customers">
          <Route path="register" element={<CustomerRegister />} />
          <Route path="login" element={<CustomerLogin />} />
        </Route>
        <Route path="/sellers">
          <Route path="register" element={<SellerRegister />} />
          <Route
            path="login"
            element={
              <UserAuth>
                <SellerLogin />
              </UserAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

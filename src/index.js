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
import { ProductCategory } from './pages/ProductCategory/ProductCategory';
import MyBag from './pages/MyBag/MyBag';
import CheckOut from './pages/Checkout/Checkout';
import { ProductType } from './pages/ProductType/ProductType';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { CustomerProfile } from './pages/dashboard/customer/profile/Profile';
import CustomerShippingAddress from './pages/dashboard/customer/address/CustomerShippingAddress';
import CustomerOrder from './pages/dashboard/customer/order/CustomerOrder';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/my-bag" element={<MyBag />} />
          <Route path="/home/checkout" element={<CheckOut />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/type/:type" element={<ProductType />} />
          <Route path="/products/category/:id" element={<ProductCategory />} />
          <Route path="/dashboard">
            <Route
              path="sellers"
              element={
                <UserAuth>
                  <SellerProfile />
                </UserAuth>
              }
            />
            <Route path="sellers/selling-product" element={<SellingProduct />} />
            <Route path="sellers/my-product" element={<MyProduct />} />
            <Route path="sellers/products/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="/dashboard">
            <Route
              path="customers"
              element={
                <UserAuth>
                  <CustomerProfile />
                </UserAuth>
              }
            />
            <Route path="customers/shipping-address" element={<CustomerShippingAddress />} />
            <Route path="customers/order" element={<CustomerOrder />} />
          </Route>
          <Route path="/customers">
            <Route path="register" element={<CustomerRegister />} />
            <Route path="login" element={<CustomerLogin />} />
          </Route>
          <Route path="/sellers">
            <Route path="register" element={<SellerRegister />} />
            <Route path="login" element={<SellerLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

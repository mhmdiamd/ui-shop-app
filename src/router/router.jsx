import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import MyBag from '../pages/MyBag/MyBag';
import { ProductDetail } from './../pages/ProductDetail/ProductDetail';
import { ProductType } from './../pages/ProductType/ProductType';
import { ProductCategory } from './../pages/ProductCategory/ProductCategory';
import { UserAuth } from '../middleware/UserAuth';
import { SellerProfile } from '../pages/dashboard/seller/profile/Profile';
import { SellingProduct } from './../pages/dashboard/seller/product/SellingProduct';
import { MyProduct } from '../pages/dashboard/seller/product/MyProduct';
import { UpdateProduct } from './../pages/dashboard/seller/product/UpdateProduct/UpdateProduct';
import CustomerRegister from './../pages/register/CustomerRegister';
import CustomerLogin from './../pages/login/CustomerLogin';
import SellerRegister from '../pages/register/SellerRegister';
import { SellerLogin } from './../pages/login/SellerLogin';
import CheckOut from './../pages/Checkout/Checkout';

const MainRouter = () => {
  return (
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
      <Route path="/customers">
        <Route path="register" element={<CustomerRegister />} />
        <Route path="login" element={<CustomerLogin />} />
      </Route>
      <Route path="/sellers">
        <Route path="register" element={<SellerRegister />} />
        <Route path="login" element={<SellerLogin />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;

import React, { useEffect, useState } from 'react';
import './style.css';
import { SidebarMenu } from './SidebarMenu';
import profile from '../../assets/profile/photodefault.jpg';
import { faStore, faBox, faShoppingCart, faPen, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useFindMeQuery } from '../../features/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';

export const Sidebar = ({ user }) => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.auth.user);
  const { data, isLoading } = useFindMeQuery();

  useEffect(() => {
    if (!userAuth?.role && localStorage.getItem('token')) {
      dispatch(setCredentials({ user: data, token: localStorage.getItem('token') }));
    }
  });

  return (
    <div className="col-md-8 col-12 ">
      <div className="row profile-menu">
        <div className="col-12 ">
          <div className="row">
            <div className="col-12 col-md-4">
              <img className="img-fluid d-block rounded-circle photo-profile mx-auto" crossOrigin="anonymous" src={userAuth?.photo == 'photodefault.jpg' ? profile : userAuth?.photo} alt="" />
            </div>
            <div className="col-8 d-none d-md-block">
              <div className="row">
                <div className="col-12 ps-0 d-flex flex-column">
                  <span className="fw-semibold">{userAuth?.name}</span>
                  <span className="color-trinary helper-text overflow-x-hidden">
                    {' '}
                    <FontAwesomeIcon className="me-1" icon={faPen} />
                    Ubah Profile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row sidebar-menu gap-3 mt-5">
        {isLoading ? (
          'Loading....'
        ) : userAuth?.role == 'seller' ? (
          <>
            <SidebarMenu user={userAuth} url="/dashboard/sellers" icon={faStore} name={'Store'} />
            <SidebarMenu user={userAuth} url="/dashboard/sellers/my-product" icon={faBox} name={'Product'} />
            <SidebarMenu user={userAuth} url="/dashboard/sellers/order" icon={faShoppingCart} name={'Order'} />
          </>
        ) : (
          <>
            <SidebarMenu user={userAuth} url="/dashboard/customers" icon={faUser} name={'Profile'} />
            <SidebarMenu user={userAuth} url="/dashboard/customers/shipping-address" icon={faTruck} name={'Shipping Address'} />
            <SidebarMenu user={userAuth} url="/dashboard/customers/order" icon={faShoppingCart} name={'Order'} />
          </>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import './style.css';
import { SidebarMenu } from './SidebarMenu';
import profile from '../../assets/profile/photodefault.jpg';
import { faStore, faBox, faShoppingCart, faPen, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

export const Sidebar = () => {
  const role = localStorage.getItem('role');
  return (
    <div className="col-md-8 col-12">
      <div className="row profile-menu">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-4">
              <img className="img-fluid d-block rounded-circle photo-profile mx-auto" src={profile} alt="" />
            </div>
            <div className="col-8 d-none d-md-block">
              <div className="row">
                <div className="col-12 ps-0 d-flex flex-column">
                  <span className="fw-semibold">Jonas Adam</span>
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
        {role == 'seller' ? (
          <>
            <SidebarMenu url="/dashboard/sellers" icon={faStore} name={'Store'} />
            <SidebarMenu url="/dashboard/sellers/my-product" icon={faBox} name={'Product'} />
            <SidebarMenu url="/dashboard/sellers/order" icon={faShoppingCart} name={'Order'} />
          </>
        ) : (
          <>
            <SidebarMenu url="/dashboard/customers" icon={faUser} name={'Profile'} />
            <SidebarMenu url="/dashboard/customers/shipping-address" icon={faTruck} name={'Shipping Address'} />
            <SidebarMenu url="/dashboard/customers/order" icon={faShoppingCart} name={'Order'} />
          </>
        )}
      </div>
    </div>
  );
};

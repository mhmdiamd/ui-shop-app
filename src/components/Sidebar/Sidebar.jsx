import React from 'react';
import './style.css';
import { SidebarMenu } from './SidebarMenu';
import profile from '../../assets/profile/profile.png';
import { faStore, faBox, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
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
                    <i className="fa-regular fa-pen-to-square me-1"></i>Ubah Profile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row sidebar-menu gap-3 mt-5">
        <SidebarMenu url="" icon={faStore} name={'Store'} />
        <SidebarMenu url="" icon={faBox} name={'Product'} />
        <SidebarMenu url="" icon={faShoppingCart} name={'Order'} />
      </div>
    </div>
  );
};
